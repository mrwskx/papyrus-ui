import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { preserveDirectives } from 'rollup-plugin-preserve-directives';
import { defineConfig } from 'vite';
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

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'plugin/index': resolve(__dirname, 'src/plugin/index.ts'),
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
    dts({
      outDir: 'dist/types',
      tsconfigPath: './tsconfig.build.json',
      rollupTypes: true,
    }),
  ],
});
