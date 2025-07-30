import { defineConfig } from 'tsup';

export default defineConfig({
  splitting: true,
  treeshake: true,
  dts: true,
  clean: true,
  minify: true,
  entry: ['src/index/schema.ts'],
  format: ['cjs', 'esm'],
});
