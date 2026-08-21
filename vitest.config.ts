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
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['**/*.stories.*', '**/index.*', '**/*.d.ts'],
    },
  },
});
