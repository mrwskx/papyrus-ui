import vitest from '@vitest/eslint-plugin';
import globals from 'globals';
import { configs as airbnb, plugins } from 'eslint-config-airbnb-extended';
import prettier from 'eslint-config-prettier/flat';
import storybook from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';

/**
 * ESLint 10 removed `context.getSourceCode()` and `context.getFilename()`.
 * eslint-plugin-react@7.37.5 still calls both — `forward-ref-uses-ref` and
 * `jsx-filename-extension` do so at `create()` time, so they throw on every
 * file. 7.37.5 is the latest release and its peer range stops at ^9.7; there is
 * no ESLint 10-compatible version, and airbnb's react layer depends on it.
 *
 * Rather than patching the package on disk, hand each rule a context that still
 * answers to the old names. Applied across all 103 rules, not just the two
 * known offenders, so a rule that regresses later cannot resurface the crash.
 * The plugin's other 101 rules already route through its own compat shim
 * (lib/util/eslint.js) and are unaffected either way.
 *
 * Delete this once eslint-plugin-react supports ESLint 10.
 */
const LEGACY_CONTEXT = {
  getSourceCode: context => () => context.sourceCode,
  getFilename: context => () => context.filename,
};

const withLegacyContext = rule => ({
  ...rule,
  create: context =>
    rule.create(
      new Proxy(context, {
        get: (target, property, receiver) =>
          Object.hasOwn(LEGACY_CONTEXT, property)
            ? LEGACY_CONTEXT[property](target)
            : Reflect.get(target, property, receiver),
      }),
    ),
});

const withLegacyContextRules = plugin => ({
  ...plugin,
  rules: Object.fromEntries(
    Object.entries(plugin.rules).map(([name, rule]) => [
      name,
      withLegacyContext(rule),
    ]),
  ),
});

// A plugin may only be registered once — flat config compares the registered
// objects by reference (flat-config-schema.js) and throws on a mismatch. So the
// wrapped plugin replaces the upstream registration rather than layering over
// it, and airbnb's own `plugins.react` is deliberately not spread below.
const reactPlugin = {
  ...plugins.react,
  plugins: { react: withLegacyContextRules(plugins.react.plugins.react) },
};

// The extension set every airbnb plugin registration is scoped to. Any block
// referencing their rules must be scoped identically, or ESLint resolves the
// rule against files where the plugin was never registered.
const CODE = ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'];

// Files Node actually executes. The published kit is browser code, so the
// airbnb node layer is scoped to these rather than applied repo-wide —
// otherwise n/no-unsupported-features/node-builtins judges DOM APIs (Blob,
// File, URL.createObjectURL) against Node's release history and flags 16 of
// them in the library source.
const NODE_FILES = [
  '**/*.config.{js,cjs,mjs,ts,cts,mts}',
  '**/.*rc.{js,cjs,mjs,ts}',
  '.storybook/**/*.{js,cjs,mjs,ts,tsx}',
  'scripts/**/*.{js,cjs,mjs,ts}',
];

// Everything that ships to consumers is production code; the rest may freely
// import devDependencies.
const DEV_FILES = [
  ...NODE_FILES,
  '**/*.{test,spec}.{ts,tsx}',
  '**/*.stories.{ts,tsx}',
  '**/test-utils.tsx',
  '**/*.d.ts',
];

export default [
  {
    name: 'papyrus-ui/ignores',
    ignores: [
      '**/.nx/**',
      '**/storybook-static/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/__reports__/**',
      '.husky/_/**',
    ],
  },

  // airbnb ships rule groups and plugin registration separately; the plugins
  // have to be spread in before any config that references their rules.
  plugins.stylistic,
  plugins.importX,
  plugins.node,
  plugins.typescriptEslint,
  reactPlugin,
  plugins.reactHooks,
  plugins.reactA11y,

  // `base.typescript` is a delta layer, not a standalone base — taking it alone
  // would drop 201 active airbnb rules (eqeqeq, curly, no-eval,
  // no-param-reassign, …), a net loosening against the retired config.
  ...airbnb.base.recommended,
  ...airbnb.base.typescript,
  ...airbnb.node.recommended.map(config => ({ ...config, files: NODE_FILES })),
  ...airbnb.react.recommended,
  ...airbnb.react.typescript,

  {
    // Type-aware linting. `import.meta.dirname` lands in Node 24.0 and is
    // backported to 22.16 only — hence the engines range in package.json,
    // which excludes the 23.x line that never received it.
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Layered last so it wins where airbnb is weaker — airbnb leaves
  // no-floating-promises, no-unsafe-assignment and
  // restrict-template-expressions off.
  ...tseslint.configs.strictTypeChecked.map(config => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),
  ...tseslint.configs.stylisticTypeChecked.map(config => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),

  {
    name: 'papyrus-ui/overrides',
    files: CODE,
    settings: {
      // Pinned rather than airbnb's 'detect': eslint-plugin-react's detection
      // helper reads context.getFilename() outside of any rule, so the compat
      // proxy above never sees it.
      react: { version: '18' },
    },
    rules: {
      // This kit exports named symbols; airbnb's full base requires the
      // opposite, so the preference is inverted rather than merely relaxed.
      'import-x/prefer-default-export': 'off',
      'import-x/no-default-export': 'error',

      // React 18 automatic JSX runtime — no React import needed in scope.
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // Props are typed by TypeScript, not by prop-types.
      'react/prop-types': 'off',
      'react/forbid-prop-types': 'off',
      'react/require-default-props': 'off',

      'react/jsx-sort-props': [
        'error',
        { callbacksLast: true, reservedFirst: true },
      ],

      // airbnb lists `Link` as an anchor wrapper, aimed at the Next/react-router
      // component of that name. This kit's Link is polymorphic — <Link as="button">
      // renders a button — so demanding an href on it is meaningless.
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          specialLink: ['to'],
          aspects: ['noHref', 'invalidHref', 'preferButton'],
        },
      ],

      // TODO: these four sites sync a prop into state inside an effect —
      // dialog.tsx:170, popover.tsx:137, submenu.tsx:94 and
      // use-dropzone-upload.ts:303. Reworking controlled/uncontrolled state
      // handling changes runtime behaviour, so it belongs in its own PR rather
      // than in the lint-config migration.
      'react-hooks/set-state-in-effect': 'off',

      // `void expr;` is how @typescript-eslint/no-floating-promises — enabled by
      // strictTypeChecked below — wants a deliberately unawaited promise marked.
      // airbnb bans the operator outright, which would leave no way to satisfy it.
      'no-void': ['error', { allowAsStatement: true }],

      // airbnb names Typography and Text as heading components. This kit's Text
      // is general-purpose prose; Heading is the component that renders h1-h6.
      'jsx-a11y/heading-has-content': ['error', { components: ['Heading'] }],

      // airbnb demands htmlFor *and* nesting. Wrapping the input in its label is
      // valid implicit association, and it is what Checkbox and Radio do.
      'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],

      // Pair with the automatic runtime: named imports only.
      'no-restricted-imports': [
        'error',
        { paths: [{ name: 'react', importNames: ['default'] }] },
      ],
    },
  },

  {
    // Type-aware rules only load where the parser was given type information,
    // so these cannot live in the CODE-scoped block above — it includes .js.
    name: 'papyrus-ui/typescript-overrides',
    files: ['**/*.{ts,tsx}'],
    rules: {
      // `??` on a boolean is almost always a mistake: `a || b` on two booleans
      // is a disjunction, not a fallback, and rewriting it changes the logic.
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        { ignorePrimitives: { boolean: true } },
      ],

      // Interpolating a number is unambiguous — these are CSS units, heading
      // levels and counts, not the stringified-object case the rule guards.
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true },
      ],
    },
  },

  {
    name: 'papyrus-ui/node-files',
    files: NODE_FILES,
    languageOptions: { globals: globals.node },
    rules: {
      // airbnb bans for..of because regenerator-runtime is heavyweight when
      // transpiling to ES5. Nothing here is transpiled — these files run on
      // Node against an ESNext target — so the cost it guards against does not
      // exist. The rule's other bans (for..in, labels, with) are kept.
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ForInStatement',
          message:
            'for..in iterates the prototype chain; use Object.keys/values/entries.',
        },
        {
          selector: 'LabeledStatement',
          message: 'Labels are a form of GOTO and hurt readability.',
        },
        {
          selector: 'WithStatement',
          message: '`with` is disallowed in strict mode.',
        },
      ],
    },
  },

  {
    // These are CLI entry points run by tsx, not library code.
    name: 'papyrus-ui/scripts',
    files: ['scripts/**/*.ts'],
    rules: {
      // stdout and stderr are how a CLI reports; that is the whole output.
      'no-console': 'off',
    },
  },

  {
    name: 'papyrus-ui/dev-files',
    files: DEV_FILES,
    rules: {
      'import-x/no-extraneous-dependencies': [
        'error',
        { devDependencies: true },
      ],
    },
  },

  {
    name: 'papyrus-ui/default-export-exemptions',
    files: [
      '**/*.stories.{ts,tsx,js,jsx}',
      '**/*.d.ts',
      '**/*.config.{js,cjs,mjs,ts,cts,mts}',
      '**/.*rc.{js,cjs,mjs,ts}',
      '.storybook/**/*.{ts,tsx,js,jsx}',
      'packages/papyrus-ui/src/plugin/index.ts',
    ],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },

  ...storybook.configs['flat/recommended'],
  {
    // eslint-plugin-storybook 10 is ESLint 10-safe (its remaining legacy calls
    // are guarded) and declares no `storybook` peer, so it runs against this
    // repo's Storybook 8. One rule encodes a 9/10-only convention: importing
    // types from @storybook/react is correct on 8. Re-enable with the upgrade.
    name: 'papyrus-ui/storybook-8',
    files: ['**/*.stories.{ts,tsx}', '.storybook/**/*.{ts,tsx}'],
    rules: { 'storybook/no-renderer-packages': 'off' },
  },

  {
    name: 'papyrus-ui/vitest',
    files: ['**/*.{test,spec}.{ts,tsx}'],
    ...vitest.configs.recommended,
  },

  {
    name: 'papyrus-ui/demos-and-docs',
    files: ['**/*.stories.{ts,tsx}', '.storybook/**/*.{ts,tsx}'],
    rules: {
      // Stories are demos: alert() stands in for real side effects, and inline
      // handlers keep each example readable in the Storybook source panel.
      'no-alert': 'off',
      'react/jsx-no-bind': 'off',

      // Demos and the MDX component mapping render <Heading {...props} />, so
      // the content arrives through a spread the rule cannot follow. The rule
      // stays on for library source, where an empty heading is a real defect.
      'jsx-a11y/heading-has-content': 'off',
    },
  },

  {
    name: 'papyrus-ui/loosely-typed-fixtures',
    files: [
      '**/*.{test,spec}.{ts,tsx}',
      '**/*.stories.{ts,tsx}',
      '**/test-utils.tsx',
    ],
    rules: {
      // Mocks, fixtures and story args are loosely typed by nature.
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },

  prettier,
];
