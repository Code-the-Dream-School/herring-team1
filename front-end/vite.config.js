import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/auth/, "/auth"),
      },
      '/organizations': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/organizations/, "/organizations"),
      },
      '/volunteers': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/volunteers/, "/volunteers"),
      },
      '/requests': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/requests/, "/requests"),
      },
    },
  },
  build: {
    outDir: '../back-end/public',
  }
});
