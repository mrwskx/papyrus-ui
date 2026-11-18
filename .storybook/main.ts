import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';
import { mergeConfig } from 'vite';
import type { UserConfig } from 'vite';

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
    return mergeConfig(viteConfig, { plugins: [tailwindcss()] });
  },
};

export default config;
