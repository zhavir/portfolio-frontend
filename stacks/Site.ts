import { NextjsSite } from 'sst/constructs';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';

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
      cdk: {
        hostedZone,
        certificate,
      },
    },
    environment: {
      NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    },
  });

  stack.addOutputs({
    SiteUrl: site.url,
  });
}
