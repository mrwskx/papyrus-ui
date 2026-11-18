import { compile as compileV4 } from '@tailwindcss/node';
import path from 'node:path';
import postcss from 'postcss';
import tailwindcss3 from 'tailwindcss3';

import papyrusUIPlugin from '.';

// A theme utility (typography size), a theme color with an opacity modifier,
// and a component class built with `@apply` — see #221. `ring-focus` replaces
// `ringColor.DEFAULT`, which Tailwind 4 ignores (ADR-0004).
const CANDIDATES = [
  'text-h1-sans',
  'bg-primary-500/50',
  'input-base',
  'ring-focus',
];

const PLUGIN_DIR = path.resolve(process.cwd(), 'src/plugin');

describe('papyrusUIPlugin on tailwindcss 3', () => {
  it('generates the theme utility, opacity-modified color, @apply component class and focus ring', async () => {
    const result = await postcss([
      tailwindcss3({
        corePlugins: { preflight: false },
        content: [{ raw: CANDIDATES.join(' '), extension: 'html' }],
        // @ts-expect-error -- typed against Tailwind 4's PluginAPI; v3's type lacks `prefix`, which the plugin never calls
        plugins: [papyrusUIPlugin],
      }),
    ]).process('@tailwind base;\n@tailwind components;\n@tailwind utilities;', {
      from: undefined,
    });

    expect(result.css).toContain('.text-h1-sans');
    expect(result.css).toContain('.bg-primary-500\\/50');
    expect(result.css).toContain('.input-base');
    expect(result.css).toContain('.ring-focus');
  });
});

describe('papyrusUIPlugin on tailwindcss 4', () => {
  it('generates the theme utility, opacity-modified color, @apply component class and focus ring', async () => {
    const result = await compileV4(
      '@import "tailwindcss";\n@plugin "./index.ts";',
      { base: PLUGIN_DIR, onDependency: () => {} },
    );
    const css = result.build(CANDIDATES);

    expect(css).toContain('.text-h1-sans');
    expect(css).toContain('.bg-primary-500\\/50');
    expect(css).toContain('.input-base');
    expect(css).toContain('.ring-focus');
  });
});
