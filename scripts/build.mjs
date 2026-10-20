import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const output = resolve(root, 'dist');

if (relative(root, output) !== 'dist') {
  throw new Error('Refusing to clear an unexpected build directory.');
}

await rm(output, { recursive: true, force: true });
await mkdir(output);

for (const entry of ['index.html', 'styles.css', 'src', 'assets', 'design']) {
  await cp(resolve(root, entry), resolve(output, entry), { recursive: true });
}

console.log('Static site built in dist/');
