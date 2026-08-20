/** @type {import('tailwindcss').Config} */
import { resolve } from 'node:path';

// Imported from source, not from the built package, so Tailwind picks up plugin
// changes without a rebuild.
// eslint-disable-next-line import-x/no-relative-packages
import papyrusUIPlugin from '../packages/papyrus-ui/src/plugin';

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
  plugins: [papyrusUIPlugin],
};
