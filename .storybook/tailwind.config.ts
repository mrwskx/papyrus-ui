/** @type {import('tailwindcss').Config} */
import { resolve } from 'node:path';

// Imported from source, not from dist, so Tailwind picks up plugin changes
// without a rebuild.
import papyrusUIPlugin from '../src/plugin';

export default {
  content: [
    resolve(__dirname, './**/*.{js,ts,jsx,tsx,mdx}'),
    resolve(__dirname, '../src/**/*.{js,ts,jsx,tsx,mdx}'),
  ],
  darkMode: ['class'],
  plugins: [papyrusUIPlugin],
};
