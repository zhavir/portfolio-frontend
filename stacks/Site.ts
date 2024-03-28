import { NextjsSite } from 'sst/constructs';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';

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

  // Create site
  const site = new NextjsSite(stack, 'site', {
    customDomain: {
      domainName: domainName,
      isExternalDomain: true,
      alternateNames: [`*.${domainName}`],
      cdk: {
        hostedZone,
        certificate,
      },
    },
  });

  // Create A and AAAA records for the alternate domain names
  // Note: CloudFront distribution is not created when running `sst dev`.
  if (site.cdk?.distribution) {
    const recordProps = {
      recordName: `*.${domainName}`,
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.CloudFrontTarget(site.cdk.distribution),
      ),
    };
    new route53.ARecord(stack, 'AlternateARecord', recordProps);
    new route53.AaaaRecord(stack, 'AlternateAAAARecord', recordProps);
  }

  stack.addOutputs({
    SiteUrl: site.url,
  });
}
