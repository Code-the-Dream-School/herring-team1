import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin()],
  base: '',
  server: {
    proxy: {
      '/auth': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/auth/, '/auth'),
      },
      '/volunteers': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/volunteers/, '/volunteers'),
      },
      '/organizations': {
      target: 'http://127.0.0.1:3000/',
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/organizations/, '/organizations'),
      },
      '/requests': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/requests/, "/requests"),
      },
      '/volunteer_applications': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/volunteer_applications/, "/volunteer_applications"),
      },
      '/search': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/search/, '/search'),
      },
    },
  },
  build: {
    outDir: '../back-end/public',
  },
});
