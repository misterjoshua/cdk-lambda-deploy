# Deploy a CDK App Via a Lambda Function

Files of interest are:

- `src/**`
- `Dockerfile`
- `.dockerignore`

## To use this app

```shell
# Install dependencies
$ yarn
# Deploy the parent stack
$ yarn deploy
# Then use the lambda to deploy a few stacks
$ yarn cdk-exec cdk-lambda-deploy --input '{"stackName":"HelloStack","greeting":"Hello"}'
$ yarn cdk-exec cdk-lambda-deploy --input '{"stackName":"BonjourStack","greeting":"Bonjour"}'
```
