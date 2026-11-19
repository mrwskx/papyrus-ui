import fs from 'node:fs';
import path from 'node:path';

import { contrastRatio } from './utils/color-contrast';

const THEME_CSS = fs.readFileSync(
  path.resolve(process.cwd(), 'src/theme.css'),
  'utf-8',
);

// Extracts the declarations between the first top-level `{` at or after
// `selector` and its matching `}`, so a themed block's tokens can be read
// without a full CSS parser.
function extractBlock(css: string, selector: RegExp): string {
  const selectorMatch = selector.exec(css);

  if (!selectorMatch) {
    throw new Error(`Could not find selector matching ${selector}`);
  }

  const openIndex = css.indexOf('{', selectorMatch.index);
  let depth = 0;
  let closeIndex = openIndex;

  for (let i = openIndex; i < css.length; i += 1) {
    if (css[i] === '{') depth += 1;
    if (css[i] === '}') depth -= 1;

    if (depth === 0) {
      closeIndex = i;
      break;
    }
  }

  return css.slice(openIndex + 1, closeIndex);
}

function parseDeclarations(block: string): Map<string, string> {
  const matches = Array.from(block.matchAll(/(--pp-[\w-]+):\s*([^;]+);/g));

  return new Map(matches.map(match => [match[1], match[2].trim()]));
}

const WHITE = '#ffffff';

// Resolves a token to a 6-digit hex color, following one `var(--pp-...)`
// indirection into the base palette. Shared tokens never alias another
// shared token, and only `--pp-bg-backdrop` holds a `color-mix(...)`, which
// no pairing below tests, so neither case needs to be handled here.
function resolve(
  name: string,
  theme: Map<string, string>,
  base: Map<string, string>,
): string {
  const value = theme.get(name);

  if (!value) {
    throw new Error(`Token "${name}" is not declared in this theme block`);
  }

  if (value === 'white') return WHITE;

  const varMatch = /^var\((--pp-[\w-]+)\)$/.exec(value);

  if (varMatch) {
    const baseValue = base.get(varMatch[1]);

    if (!baseValue) {
      throw new Error(`Base token "${varMatch[1]}" is not declared`);
    }

    return baseValue;
  }

  return value;
}

const baseTokens = parseDeclarations(extractBlock(THEME_CSS, /^:root \{/m));
const lightTokens = parseDeclarations(
  extractBlock(THEME_CSS, /^:root,\n\.light \{/m),
);
const darkMediaTokens = parseDeclarations(
  extractBlock(THEME_CSS, /^@media \(prefers-color-scheme: dark\) \{/m),
);
const darkClassTokens = parseDeclarations(
  extractBlock(THEME_CSS, /^\.dark \{/m),
);

const ROLES = ['primary', 'info', 'success', 'warning', 'danger', 'neutral'];

interface Pairing {
  label: string;
  fg: string;
  bg: string;
  minRatio: number;
}

function pairingsFor(theme: Map<string, string>): Pairing[] {
  const resolveToken = (name: string) => resolve(name, theme, baseTokens);

  const pairings: Pairing[] = [
    {
      label: 'text default on canvas',
      fg: resolveToken('--pp-fg-default'),
      bg: resolveToken('--pp-bg-canvas'),
      minRatio: 4.5,
    },
    {
      label: 'text default on surface',
      fg: resolveToken('--pp-fg-default'),
      bg: resolveToken('--pp-bg-surface'),
      minRatio: 4.5,
    },
    {
      label: 'text default on sunken',
      fg: resolveToken('--pp-fg-default'),
      bg: resolveToken('--pp-bg-sunken'),
      minRatio: 4.5,
    },
    {
      label: 'text muted on canvas',
      fg: resolveToken('--pp-fg-muted'),
      bg: resolveToken('--pp-bg-canvas'),
      minRatio: 4.5,
    },
    {
      label: 'text muted on surface',
      fg: resolveToken('--pp-fg-muted'),
      bg: resolveToken('--pp-bg-surface'),
      minRatio: 4.5,
    },
    {
      label: 'text muted on sunken',
      fg: resolveToken('--pp-fg-muted'),
      bg: resolveToken('--pp-bg-sunken'),
      minRatio: 4.5,
    },
    {
      label: 'text subtle on canvas',
      fg: resolveToken('--pp-fg-subtle'),
      bg: resolveToken('--pp-bg-canvas'),
      minRatio: 4.5,
    },
    {
      label: 'text subtle on surface',
      fg: resolveToken('--pp-fg-subtle'),
      bg: resolveToken('--pp-bg-surface'),
      minRatio: 4.5,
    },
    {
      label: 'text subtle on sunken',
      fg: resolveToken('--pp-fg-subtle'),
      bg: resolveToken('--pp-bg-sunken'),
      minRatio: 4.5,
    },
    {
      label: 'inverse text on inverse background',
      fg: resolveToken('--pp-fg-inverse'),
      bg: resolveToken('--pp-bg-inverse'),
      minRatio: 4.5,
    },
    {
      label: 'control border on surface',
      fg: resolveToken('--pp-border-control'),
      bg: resolveToken('--pp-bg-surface'),
      minRatio: 3,
    },
    {
      label: 'focus ring on surface',
      fg: resolveToken('--pp-ring-focus'),
      bg: resolveToken('--pp-bg-surface'),
      minRatio: 3,
    },
    {
      label: 'checked control (primary fill) on surface',
      fg: resolveToken('--pp-bg-primary'),
      bg: resolveToken('--pp-bg-surface'),
      minRatio: 3,
    },
  ];

  return pairings.concat(
    ROLES.flatMap(role => [
      {
        label: `on-emphasis text on ${role} fill`,
        fg: resolveToken('--pp-fg-on-emphasis'),
        bg: resolveToken(`--pp-bg-${role}`),
        minRatio: 4.5,
      },
      {
        label: `on-emphasis text on ${role} hover`,
        fg: resolveToken('--pp-fg-on-emphasis'),
        bg: resolveToken(`--pp-bg-${role}-hover`),
        minRatio: 4.5,
      },
      {
        label: `on-emphasis text on ${role} press`,
        fg: resolveToken('--pp-fg-on-emphasis'),
        bg: resolveToken(`--pp-bg-${role}-press`),
        minRatio: 4.5,
      },
      {
        label: `${role} text on canvas`,
        fg: resolveToken(`--pp-fg-${role}`),
        bg: resolveToken('--pp-bg-canvas'),
        minRatio: 4.5,
      },
      {
        label: `${role} text on surface`,
        fg: resolveToken(`--pp-fg-${role}`),
        bg: resolveToken('--pp-bg-surface'),
        minRatio: 4.5,
      },
      {
        label: `${role} muted text on ${role} muted background`,
        fg: resolveToken(`--pp-fg-${role}-muted`),
        bg: resolveToken(`--pp-bg-${role}-muted`),
        minRatio: 4.5,
      },
    ]),
  );
}

describe('theme.css color tokens', () => {
  describe.each([
    ['light', lightTokens],
    ['dark (media)', darkMediaTokens],
    ['dark (.dark class)', darkClassTokens],
  ])('Given the %s theme block', (themeName, theme) => {
    describe.each(pairingsFor(theme))(
      'When checking $label',
      ({ fg, bg, minRatio }) => {
        it(`Then the contrast ratio should be at least ${minRatio}:1`, () => {
          expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(minRatio);
        });
      },
    );
  });

  describe('Given the dark theme is declared via both the media query and the class', () => {
    describe('When their token values are compared', () => {
      it('Then every token should match between the two blocks', () => {
        expect(Object.fromEntries(darkMediaTokens)).toEqual(
          Object.fromEntries(darkClassTokens),
        );
      });
    });
  });
});
