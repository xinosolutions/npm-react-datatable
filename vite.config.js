import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: 'demo',
  plugins: [react()],
  resolve: {
    alias: {
      '@xinosolutions/react-datatable': path.resolve(__dirname, 'src/index.js'),
    },
  },
  server: {
    fs: {
      allow: [__dirname],
    },
  },
});
