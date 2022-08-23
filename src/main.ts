import { App } from 'aws-cdk-lib';
import { ParentStack } from './parent-stack';

const app = new App();

new ParentStack(app, 'cdk-lambda-deploy', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

app.synth();