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
      },
    },
  },
  build: {
    outDir: '../back-end/public', 
  },
});
