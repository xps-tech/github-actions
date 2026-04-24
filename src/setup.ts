// setup.ts

// eslint-disable-next-line unicorn/import-style
import util from 'node:util';
import childProcess from 'node:child_process';

const cwd = new URL('.', import.meta.url).pathname;
const exec = util.promisify(childProcess.exec);

const token = process.env.GITHUB_TOKEN ?? process.env.NODE_AUTH_TOKEN;
if (token) {
  await exec(`npm config set //npm.pkg.github.com/:_authToken "${token}"`, { cwd });
}

await exec('npm ci', { cwd });
await exec('npm run build:dist-mjs', { cwd });
