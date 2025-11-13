import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { resolve } from 'path';
import { copyFileSync, mkdirSync } from 'fs';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/ui',
  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
    // Plugin to copy globals.css to dist
    {
      name: 'copy-globals-css',
      writeBundle() {
        try {
          mkdirSync(resolve(__dirname, 'dist/styles'), { recursive: true });
          copyFileSync(
            resolve(__dirname, 'src/styles/globals.css'),
            resolve(__dirname, 'dist/globals.css')
          );
        } catch (err) {
          console.warn('Failed to copy globals.css:', err);
        }
      },
    },
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [],
  // },
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: '@lewora/ui',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es' as const],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@lewora/ui': resolve(__dirname, 'src'), // NOTE: should reflect the compilerOptions.paths in tsconfig.lib.json
    },
  },
});
