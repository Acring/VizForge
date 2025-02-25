import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'mcp/server.ts',
    // 'mcp/screenshotService.ts',
    'scripts/component-screenshot.ts',
    'src/app/globals.css',
    // 'src/components/*.{tsx,ts}'
  ],
  format: ['esm'],
  dts: false,
  clean: true,
  sourcemap: true,
  outDir: 'dist',
  target: 'node18',
  shims: true,
}); 