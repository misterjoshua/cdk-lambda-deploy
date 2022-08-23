const { awscdk } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-lambda-deploy',

  deps: [
    'esbuild',
    'esbuild-runner',
    'fs-extra',
    'execa@^4',
  ],

  devDeps: [
    '@types/fs-extra',
    '@wheatstalk/aws-cdk-exec',
  ],

  lambdaAutoDiscover: false,
});

project.synth();