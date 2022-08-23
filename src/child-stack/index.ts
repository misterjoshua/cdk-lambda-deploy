import { aws_lambda_nodejs, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ENV_GREETING } from './api';

export interface ChildStackProps extends StackProps {
  readonly greeting: string;
}

export class ChildStack extends Stack {
  constructor(scope: Construct, id: string, props: ChildStackProps) {
    super(scope, id, props);

    new aws_lambda_nodejs.NodejsFunction(this, 'Greeter', {
      entry: 'src/child-stack/lambda/greeter.ts',
      environment: {
        [ENV_GREETING]: props.greeting,
      },
    });
  }
}