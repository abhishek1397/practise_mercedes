import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
