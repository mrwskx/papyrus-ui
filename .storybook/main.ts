import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/react-vite';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { mergeConfig } from 'vite';
import type { UserConfig } from 'vite';

const configDir = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  addons: [
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
  ],
  core: {
    disableTelemetry: true,
  },

  framework: {
    name: getAbsolutePath('@storybook/react-vite') as '@storybook/react-vite',
    options: {
      strictMode: true,
    },
  },
  staticDirs: ['./public'],
  stories: ['../src/**/*.mdx', '../src/**/*.stories.tsx'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  viteFinal(viteConfig: UserConfig) {
    return mergeConfig(viteConfig, {
      css: {
        postcss: {
          plugins: [
            tailwindcss(resolve(configDir, './tailwind.config.ts')),
            autoprefixer(),
          ],
        },
      },
    });
  },
};

export default config;
