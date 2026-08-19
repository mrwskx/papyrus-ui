import createConfig from '@papyrus-ui/code-style';
import globals from 'globals';

const config = createConfig({
  project: ['./tsconfig.json', './packages/*/tsconfig.json'],
});

export default [
  // Auto-detected configuration with libraries
  ...config,

  // Vitest globals — the retired code-style config only knew about Jest.
  // Superseded by the @vitest/eslint-plugin layer in the new flat config.
  {
    name: 'papyrus-ui/vitest-globals',
    files: ['**/*.{test,spec}.{ts,tsx}', '**/test-utils.tsx'],
    languageOptions: {
      globals: { ...globals.jest, vi: 'readonly' },
    },
    rules: {
      // Carried over from the retired jest-typescript layer: mocks and test
      // doubles are loosely typed by nature.
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      'import/no-default-export': 'off',
    },
  },

  // Project-specific overrides
  {
    name: 'papyrus-ui/plugin-overrides',
    files: [
      './packages/code-style/src/**/*',
      './packages/papyrus-ui/src/plugin/index.ts',
    ],
    rules: {
      'import/no-default-export': 'off',
    },
  },

  // Global ignores
  {
    name: 'papyrus-ui/ignores',
    ignores: [
      '**/.nx/**',
      '**/storybook-static/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/__reports__/**',
    ],
  },
];
