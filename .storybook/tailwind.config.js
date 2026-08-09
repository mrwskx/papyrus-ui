/** @type {import('tailwindcss').Config} */
import { resolve } from 'path';

import papyrusUI from '../packages/papyrus-ui/src/plugin';

export default {
  content: [
    resolve(__dirname, './**/*.{js,ts,jsx,tsx,mdx}'),
    resolve(__dirname, '../packages/papyrus-ui/src/**/*.{js,ts,jsx,tsx,mdx}'),
    resolve(
      __dirname,
      '../packages/docs-template/src/**/*.{js,ts,jsx,tsx,mdx}',
    ),
  ],
  darkMode: ['class'],
  plugins: [papyrusUI],
};
