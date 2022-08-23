import { ENV_GREETING } from '../api';


export async function handler(name: string) {
  return `${greeting}, ${name}`;
}

const greeting = process.env[ENV_GREETING] ?? 'Default';