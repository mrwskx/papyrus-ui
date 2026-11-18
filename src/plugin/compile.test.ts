import { compile } from '@tailwindcss/node';
import path from 'node:path';

// A theme utility (typography size), a theme color with an opacity modifier,
// and a component class built with `@apply` — see #221.
const CANDIDATES = [
  'text-h1-sans',
  'bg-primary-500/50',
  'input-base',
  'ring-focus',
];

const PLUGIN_DIR = path.resolve(process.cwd(), 'src/plugin');

describe('papyrusUIPlugin on tailwindcss 4', () => {
  it('generates the theme utility, opacity-modified color, @apply component class and focus ring', async () => {
    const result = await compile(
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
