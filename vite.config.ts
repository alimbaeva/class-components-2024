import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // base: '',
  root: 'src',
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
    },
  },
  plugins: [react()],
  build: {
    sourcemap: true,
    outDir: '../dist',
    assetsDir: 'assets',
  },
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    mockReset: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
