import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    clearMocks: true,
    environment: 'jsdom',
    globals: true,
    // Was jest.setTimeout(30000) in test-utils.
    testTimeout: 30000,
    coverage: {
      provider: 'v8',
      include: ['packages/*/src/**'],
      exclude: ['**/*.stories.*', '**/index.*', '**/*.d.ts'],
    },
  },
});
