import { randomUUID } from 'crypto';
import { App } from 'aws-cdk-lib';
import execa from 'execa';
import * as fs from 'fs-extra';
import { ChildStack, ChildStackProps } from '../../child-stack';


export async function handler(childStackProps: ChildStackProps) {
  console.log('deploying', childStackProps);

  // Synthesize a Cloud Assembly somewhere in /tmp
  const assemblyDir = `/tmp/cdk.out.${randomUUID()}`;

  const app = new App({ outdir: assemblyDir });
  new ChildStack(app, 'ChildStack', childStackProps);
  app.synth();

  try {
    // Deploy the assembly
    await execa('cdk', ['deploy', '--app', assemblyDir, '--all', '--require-approval=never'], {
      stdout: process.stdout,
      stderr: process.stderr,
    });
  } finally {
    // Clean up.
    await fs.remove(assemblyDir);
  }
}