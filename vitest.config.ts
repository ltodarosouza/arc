import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const root = path.dirname(fileURLToPath(import.meta.url));

/** Pure domain tests intentionally avoid the Cloudflare/Vinext runtime plugins. */
export default defineConfig({
  resolve: { alias: { '@': root } },
  test: { include: ['lib/**/*.test.ts'] },
});
