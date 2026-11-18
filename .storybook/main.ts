import { dirname, join } from 'node:path';

import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';
import { mergeConfig } from 'vite';
import type { UserConfig } from 'vite';

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@storybook/addon-storysource'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-mdx-gfm'),
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
