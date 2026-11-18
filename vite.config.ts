import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { preserveDirectives } from 'rollup-plugin-preserve-directives';
import { defineConfig, type Plugin } from 'vite';
import dts from 'vite-plugin-dts';

import packageJson from './package.json';

const peerDeps = Object.keys(packageJson.peerDependencies);
const deps = Object.keys(packageJson.dependencies);

const external = peerDeps.concat(deps).map(dep => new RegExp(`^${dep}(/.*)?$`));

const outputSharedOptions = {
  dir: 'dist',
  assetFileNames: '[name][extname]',
  preserveModules: true,
  preserveModulesRoot: 'src',
};

// `./theme.css` ships as a plain asset: no JS import touches it, so it needs
// its own emit instead of riding along with a lib entry.
function emitThemeCss(): Plugin {
  return {
    name: 'emit-theme-css',
    async generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'theme.css',
        source: await readFile(resolve(__dirname, 'src/theme.css'), 'utf-8'),
      });
    },
  };
}

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external,
      output: {
        ...outputSharedOptions,
        entryFileNames: 'es/[name].js',
        exports: 'named',
        format: 'es',
        generatedCode: {
          constBindings: true,
          preset: 'es2015',
        },
      },
      plugins: [preserveDirectives()],
    },
    sourcemap: true,
  },
  plugins: [
    react(),
    emitThemeCss(),
    dts({
      outDir: 'dist/types',
      tsconfigPath: './tsconfig.build.json',
      rollupTypes: true,
    }),
  ],
});
