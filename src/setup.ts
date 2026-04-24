// setup.ts

// eslint-disable-next-line unicorn/import-style
import util from 'node:util';
import childProcess from 'node:child_process';

const cwd = new URL('.', import.meta.url).pathname;
const exec = util.promisify(childProcess.exec);

// Prefer NODE_AUTH_TOKEN (may be set to a PAT with broader package scope,
// e.g. via DEPENDABOT_NPM_TOKEN in Dependabot-triggered workflows).
// Fall back to GITHUB_TOKEN for regular PR/push workflows.
const token = process.env['NODE_AUTH_TOKEN'] ?? process.env['GITHUB_TOKEN'];
if (token) {
  await exec(`npm config set //npm.pkg.github.com/:_authToken "${token}"`, { cwd });
}

await exec('npm ci', { cwd });
await exec('npm run build:dist-mjs', { cwd });
