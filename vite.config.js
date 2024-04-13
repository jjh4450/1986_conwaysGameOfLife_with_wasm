import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  server: {
    port: 8080,
    hot: true
  },

  build: {
    outDir: '../dist'
  },

  // resolve: {
  //   alias: {
  //     '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
  //   }
  // },

  plugins: [
    wasm(),
    topLevelAwait()
  ],

  optimizeDeps: {
    exclude: [
      '@syntect/wasm'
    ]
  }
});