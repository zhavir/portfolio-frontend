import { NextjsSite, Stack } from 'sst/constructs';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as cf from 'aws-cdk-lib/aws-cloudfront';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';

function createGateway(
  stack: Stack,
  hostedZone: route53.IHostedZone,
): apigateway.LambdaRestApi {
  const domainName = 'andreaaramini.space';
  const apiGatewayAlias = `api.${domainName}`;
  const certificate = new acm.Certificate(stack, 'ApiGatewayCert', {
    domainName: apiGatewayAlias,
    validation: acm.CertificateValidation.fromDns(hostedZone),
  });
  const portfolioBackendLambdaArn = ssm.StringParameter.valueForStringParameter(
    stack,
    'portfolioBackendLambdaArn',
  );
  const lambdaFunction = lambda.Function.fromFunctionArn(
    stack,
    'PortfolioBackendHandler',
    portfolioBackendLambdaArn,
  );
  const prodLogGroup = new logs.LogGroup(stack, 'ApiGatewayLogs', {
    retention: logs.RetentionDays.ONE_DAY,
  });
  const gateway = new apigateway.LambdaRestApi(stack, 'APIGateway', {
    handler: lambdaFunction,
    integrationOptions: {
      timeout: cdk.Duration.seconds(10),
    },
    domainName: {
      domainName: apiGatewayAlias,
      certificate: certificate,
      endpointType: apigateway.EndpointType.EDGE,
      securityPolicy: apigateway.SecurityPolicy.TLS_1_2,
    },
    // not able to find any clean way to get cdn url, there is a circular dependency from gateway to cdn and viceversa
    defaultCorsPreflightOptions: {
      allowOrigins: [`https://${domainName}`, 'd1xsf9hqyfb7um.cloudfront.net'],
      allowMethods: apigateway.Cors.ALL_METHODS,
      allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
      maxAge: cdk.Duration.days(1),
    },
    deployOptions: {
      accessLogDestination: new apigateway.LogGroupLogDestination(prodLogGroup),
      accessLogFormat: apigateway.AccessLogFormat.jsonWithStandardFields(),
    },
  });
  const eventRule = new cdk.aws_events.Rule(stack, 'LambdaSchedule', {
    schedule: cdk.aws_events.Schedule.rate(cdk.Duration.minutes(5)),
  });
  eventRule.addTarget(
    new cdk.aws_events_targets.ApiGateway(gateway, {
      path: '/api/v1/healthcheck/',
      method: 'GET',
      stage: 'prod',
    }),
  );

  const recordProps = {
    recordName: apiGatewayAlias,
    zone: hostedZone,
    target: route53.RecordTarget.fromAlias(
      new route53Targets.ApiGateway(gateway),
    ),
  };
  new route53.ARecord(stack, 'AlternateARecord', recordProps);
  stack.addOutputs({
    GatewayUrl: gateway.url,
  });
  return gateway;
}

export function Site({ stack }) {
  const domainName = 'andreaaramini.space';
  // Look up hosted zone
  const hostedZone = route53.HostedZone.fromLookup(stack, 'HostedZone', {
    domainName: domainName,
  });

  // Create a certificate with alternate domain names
  const certificate = new acm.DnsValidatedCertificate(stack, 'Certificate', {
    domainName: domainName,
    hostedZone,
    // The certificates need to be created in us-east-1
    region: 'us-east-1',
    subjectAlternativeNames: [`*.${domainName}`],
  });

  const gateway = createGateway(stack, hostedZone);
  // Create site
  const site = new NextjsSite(stack, 'site', {
    customDomain: {
      domainName: domainName,
      isExternalDomain: true,
      cdk: {
        hostedZone,
        certificate,
      },
    },
    environment: {
      NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    },
  });
  // ack for swapping ordering
  try {
    const cloudfront = site['distribution']['distribution'] as cf.Distribution;
    if (cloudfront) {
      cloudfront.addBehavior('/api/v1/*', new origins.RestApiOrigin(gateway), {
        allowedMethods: cf.AllowedMethods.ALLOW_ALL,
        viewerProtocolPolicy: cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachedMethods: cf.CachedMethods.CACHE_GET_HEAD_OPTIONS,
        cachePolicy: new cf.CachePolicy(stack, 'CachePolicy', {
          cachePolicyName: 'ApiBackend',
          maxTtl: cdk.Duration.seconds(0),
          defaultTtl: cdk.Duration.seconds(0),
          minTtl: cdk.Duration.seconds(0),
        }),
      });
      const behaviors = cloudfront['additionalBehaviors'] as any[];
      behaviors.unshift(behaviors.pop());
    }
  } catch {
    /* empty */
  }

  stack.addOutputs({
    SiteUrl: site.url,
  });
}
