import { compile as compileV4 } from '@tailwindcss/node';
import path from 'node:path';
import postcss from 'postcss';
import tailwindcss3 from 'tailwindcss3';

import papyrusUIPlugin from '.';

// A theme utility (typography size), a theme color with an opacity modifier,
// and a component class built with `@apply` — see #221.
const CANDIDATES = ['text-h1-sans', 'bg-primary-500/50', 'input-base'];

const PLUGIN_DIR = path.resolve(process.cwd(), 'src/plugin');

describe('papyrusUIPlugin on tailwindcss 3', () => {
  it('generates the theme utility, opacity-modified color and @apply component class', async () => {
    const result = await postcss([
      tailwindcss3({
        corePlugins: { preflight: false },
        content: [{ raw: CANDIDATES.join(' '), extension: 'html' }],
        plugins: [papyrusUIPlugin],
      }),
    ]).process('@tailwind base;\n@tailwind components;\n@tailwind utilities;', {
      from: undefined,
    });

    expect(result.css).toContain('.text-h1-sans');
    expect(result.css).toContain('.bg-primary-500\\/50');
    expect(result.css).toContain('.input-base');
  });
});

describe('papyrusUIPlugin on tailwindcss 4', () => {
  it('generates the theme utility, opacity-modified color and @apply component class', async () => {
    const result = await compileV4(
      '@import "tailwindcss";\n@plugin "./index.ts";',
      { base: PLUGIN_DIR, onDependency: () => {} },
    );
    const css = result.build(CANDIDATES);

    expect(css).toContain('.text-h1-sans');
    expect(css).toContain('.bg-primary-500\\/50');
    expect(css).toContain('.input-base');
  });
});
