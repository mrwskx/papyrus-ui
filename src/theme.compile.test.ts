import { compile } from '@tailwindcss/node';
import path from 'node:path';

// A theme utility (typography size), a theme color with an opacity modifier,
// a component class built with `@apply`, and the focus ring — see #221.
const CANDIDATES = [
  'text-h1-sans',
  'bg-primary-500/50',
  'input-base',
  'ring-focus',
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

// Shared color tokens (#226): each is registered for exactly one kind of
// utility, base tokens generate none, the old scale utilities still work,
// and overrides keep working through opacity modifiers and plain values.
describe('shared color tokens on tailwindcss 4', () => {
  it('generates a utility only for the kind of color a shared token is registered for', async () => {
    const result = await compile(
      '@import "tailwindcss";\n@import "./theme.css";',
      { base: SRC_DIR, onDependency: () => {} },
    );
    const css = result.build(['bg-canvas', 'text-muted', 'border-control']);

    expect(css).toContain('.bg-canvas');
    expect(css).toContain('.text-muted');
    expect(css).toContain('.border-control');
  });

  it('does not generate a utility for a kind of color a shared token is not registered for', async () => {
    const result = await compile(
      '@import "tailwindcss";\n@import "./theme.css";',
      { base: SRC_DIR, onDependency: () => {} },
    );
    const css = result.build(['bg-muted', 'text-canvas', 'bg-default']);

    expect(css).not.toContain('.bg-muted');
    expect(css).not.toContain('.text-canvas');
    expect(css).not.toContain('.bg-default');
  });

  it('generates no utility for a base token', async () => {
    const result = await compile(
      '@import "tailwindcss";\n@import "./theme.css";',
      { base: SRC_DIR, onDependency: () => {} },
    );
    const css = result.build(['bg-cobalt-600', 'text-steel-500']);

    expect(css).not.toContain('.bg-cobalt-600');
    expect(css).not.toContain('.text-steel-500');
  });

  it('still generates the old scale utilities', async () => {
    const result = await compile(
      '@import "tailwindcss";\n@import "./theme.css";',
      { base: SRC_DIR, onDependency: () => {} },
    );
    const css = result.build([
      'bg-primary-600',
      'text-neutral-500',
      'border-danger-400',
    ]);

    expect(css).toContain('.bg-primary-600');
    expect(css).toContain('.text-neutral-500');
    expect(css).toContain('.border-danger-400');
  });

  it('applies an opacity modifier to a shared token', async () => {
    const result = await compile(
      '@import "tailwindcss";\n@import "./theme.css";',
      { base: SRC_DIR, onDependency: () => {} },
    );
    const css = result.build(['bg-primary/50']);

    expect(css).toContain(
      'color-mix(in oklab, var(--background-color-primary) 50%, transparent)',
    );
  });

  it('resolves a shared token through a plain var() so overriding it with a hex color takes effect', async () => {
    const result = await compile(
      '@import "tailwindcss";\n@import "./theme.css";',
      { base: SRC_DIR, onDependency: () => {} },
    );
    const css = result.build(['text-primary']);

    expect(css).toContain('color: var(--text-color-primary);');
  });

  it('points the focus ring at the shared focus ring token', async () => {
    const result = await compile(
      '@import "tailwindcss";\n@import "./theme.css";',
      { base: SRC_DIR, onDependency: () => {} },
    );
    const css = result.build(['ring-focus']);

    expect(css).toContain('--tw-ring-color: var(--ring-color-focus);');
  });
});
