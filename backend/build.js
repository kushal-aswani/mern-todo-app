// esbuild.config.js
import { build } from 'esbuild';

build({
  entryPoints: ['server.js'],
  bundle: true,
  platform: 'node',
  format: 'esm',             // keep ESM since you use import
  outfile: 'dist/app.js',
  minify: true,              // ⚡ compress output
  treeShaking: true,         // ⚡ remove unused imports
  sourcemap: false,          // disable for prod (enable if debugging)
  external: [
    'express',
    'mongoose',
    'cors',
    'dotenv',
    'path',
    'fs',
    'os',
  ],
}).catch(() => process.exit(1));
