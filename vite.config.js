import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative asset paths in the build so dist/ works on any host
  // (root domain, subfolder, file://, etc.).
  base: './',
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
