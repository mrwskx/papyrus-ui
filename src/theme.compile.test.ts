import { compile } from '@tailwindcss/node';
import path from 'node:path';

// A theme utility (typography size), a theme color with an opacity modifier,
// a component class built with `@apply`, and the focus ring — see #221.
// A shared radius role, a shared shadow role and the inset shadow role — see #227.
const CANDIDATES = [
  'text-h1-sans',
  'bg-primary-500/50',
  'input-base',
  'ring-focus',
  'rounded-control',
  'shadow-popover',
  'inset-shadow-slider-track',
];

const SRC_DIR = path.resolve(process.cwd(), 'src');

describe('theme.css on tailwindcss 4', () => {
  it('generates the theme utility, opacity-modified color, @apply component class and focus ring', async () => {
    const result = await compile(
      '@import "tailwindcss";\n@import "./theme.css";',
      {
        base: SRC_DIR,
        onDependency: () => {},
      },
    );
    const css = result.build(CANDIDATES);

    expect(css).toContain('.text-h1-sans');
    expect(css).toContain('.bg-primary-500\\/50');
    expect(css).toContain('.input-base');
    expect(css).toContain('.ring-focus');
    expect(css).toContain('.rounded-control');
    expect(css).toContain('.shadow-popover');
    expect(css).toContain('.inset-shadow-slider-track');
  });

  it('declares shadow roles with darker, tighter values in dark mode', async () => {
    const result = await compile(
      '@import "tailwindcss";\n@import "./theme.css";',
      {
        base: SRC_DIR,
        onDependency: () => {},
      },
    );
    const css = result.build(['shadow-popover']);

    expect(css).toContain(':root, .light {');
    expect(css).toContain('.dark {');
    expect(css).toContain('@media (prefers-color-scheme: dark)');
  });

  it('applies dark: under the system dark setting and inside .dark, but not inside .light', async () => {
    const result = await compile(
      '@import "tailwindcss";\n@import "./theme.css";',
      {
        base: SRC_DIR,
        onDependency: () => {},
      },
    );
    const css = result.build(['dark:underline']);

    expect(css).toContain('@media (prefers-color-scheme: dark)');
    expect(css).toContain('.dark\\:underline:not(.light, .light *)');
    expect(css).toContain('.dark\\:underline:is(.dark, .dark *)');
  });
});
