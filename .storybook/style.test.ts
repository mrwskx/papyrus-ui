import { compile } from '@tailwindcss/node';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const STORYBOOK_DIR = path.resolve(process.cwd(), '.storybook');

describe('Storybook stylesheet on tailwindcss 4', () => {
  it('generates the plugin theme utility and @apply component class', async () => {
    const source = await readFile(
      path.join(STORYBOOK_DIR, 'style.css'),
      'utf8',
    );
    const result = await compile(source, {
      base: STORYBOOK_DIR,
      onDependency: () => {},
    });
    const css = result.build(['text-h1-sans', 'input-base']);

    expect(css).toContain('.text-h1-sans');
    expect(css).toContain('.input-base');
  });
});
