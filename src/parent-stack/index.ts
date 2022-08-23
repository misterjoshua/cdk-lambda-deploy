import { aws_iam, aws_lambda, CfnOutput, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PROJECT_ROOT } from '../project';

export class ParentStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const deploy = new aws_lambda.DockerImageFunction(this, 'Deploy', {
      code: aws_lambda.DockerImageCode.fromImageAsset(PROJECT_ROOT),
      timeout: Duration.minutes(15),
      memorySize: 4096,
      initialPolicy: [
        // Scope this down to whatever you need.
        new aws_iam.PolicyStatement({
          effect: aws_iam.Effect.ALLOW,
          actions: ['*'],
          resources: ['*'],
        }),
      ],
    });

    new CfnOutput(this, 'DeployName', {
      value: deploy.functionName,
    });
  }
}