import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import react from '@vitejs/plugin-react';
import { env } from 'process';
import packageJSON from './package.json';

const BACKEND_URL = packageJSON.proxy;

const endpoints = ['/sequence', '/factory', '/handlers', '/internal-api'];

export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), checker({ typescript: true })],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs'],
    },
    server: {
      hmr: true,
      open: true,
      proxy: Object.assign(
        {},
        ...endpoints.map((endpoint) => ({
          [endpoint]: {
            target: env.BACKEND_HOST || BACKEND_URL,
            changeOrigin: true,
          },
        }))
      ),
    },
    build: {
      outDir: './build',
    },
    publicDir: './public',
    outDir: './build',
  };
});
