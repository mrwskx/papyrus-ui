/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @vitest-environment node
 */

// Mock the config loader functions before importing the main module
const mockConfigLoaderBase = vi.fn(() => ({
  default: [
    { name: 'papyrus-ui/base', rules: {} },
    { name: 'papyrus-ui/base-1', rules: {} },
  ],
}));

const mockConfigLoaderReact = vi.fn(() => ({
  default: [{ name: 'papyrus-ui/react', rules: {} }],
}));

const mockConfigLoaderTypeScript = vi.fn(() => ({
  default: [
    {
      name: 'papyrus-ui/typescript',
      settings: {
        'import/resolver': {
          node: {
            project: './tsconfig.json',
          },
          typescript: {
            alwaysTryTypes: true,
            project: './tsconfig.json',
          },
        },
      },
      rules: {},
    },
  ],
}));

const mockConfigLoaderJest = vi.fn(() => ({
  default: [{ name: 'papyrus-ui/jest', rules: {} }],
}));

const mockConfigLoaderJestTypescript = vi.fn(() => ({
  default: [{ name: 'papyrus-ui/jest-typescript', rules: {} }],
}));

const mockConfigLoaderStorybook = vi.fn(() => ({
  default: [{ name: 'papyrus-ui/storybook', rules: {} }],
}));

const mockConfigLoaderNextJS = vi.fn(() => ({
  default: [{ name: 'papyrus-ui/next', rules: {} }],
}));

// Mock the createRequire function and its return value
const mockRequire = vi.fn((path: string) => {
  switch (path) {
    case './configs/base':
      return mockConfigLoaderBase();
    case './configs/react':
      return mockConfigLoaderReact();
    case './configs/typescript':
      return mockConfigLoaderTypeScript();
    case './configs/jest':
      return mockConfigLoaderJest();
    case './configs/jest-typescript':
      return mockConfigLoaderJestTypescript();
    case './configs/storybook':
      return mockConfigLoaderStorybook();
    case './configs/nextjs':
      return mockConfigLoaderNextJS();
    default:
      throw new Error(`Unknown config: ${path}`);
  }
});

vi.mock('module', () => ({
  createRequire: vi.fn(() => mockRequire),
}));

// Mock fs functions
const mockReadFileSync = vi.fn();
const mockExistsSync = vi.fn();

vi.mock('fs', () => ({
  readFileSync: mockReadFileSync,
  existsSync: mockExistsSync,
}));

// Mock path functions
const mockResolve = vi.fn();
const mockDirname = vi.fn();

vi.mock('path', () => ({
  resolve: mockResolve,
  dirname: mockDirname,
}));

// Now import the module under test
let createConfig: any;

beforeAll(async () => {
  const module = await import('./index');
  createConfig = module.default;
});

describe('createConfig', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mocks
    vi.spyOn(process, 'cwd').mockReturnValue('/test/project');
    mockResolve.mockImplementation((...paths: any[]) => paths.join('/'));
    mockDirname.mockImplementation((path: any) => {
      const parts = path.split('/');
      parts.pop();
      return parts.join('/') || '/';
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('when no package.json is found', () => {
    beforeEach(() => {
      mockExistsSync.mockReturnValue(false);
    });

    it('should return base configuration only', () => {
      const config = createConfig();

      expect(config).toBeDefined();
      expect(Array.isArray(config)).toBe(true);
      expect(config.length).toBeGreaterThan(0);

      // Should contain base config
      const configNames = config.map((c: any) => c.name);
      expect(configNames).toContain('papyrus-ui/base');
    });
  });

  describe('when package.json exists with React dependency', () => {
    beforeEach(() => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          dependencies: {
            react: '^18.0.0',
          },
          devDependencies: {
            typescript: '^5.0.0',
          },
        }),
      );
    });

    it('should include React and TypeScript configurations', () => {
      const config = createConfig();

      const configNames = config.map((c: any) => c.name);
      expect(configNames).toContain('papyrus-ui/base');
      expect(configNames).toContain('papyrus-ui/react');
      expect(configNames).toContain('papyrus-ui/typescript');
    });
  });

  describe('when package.json exists with Jest dependency', () => {
    beforeEach(() => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          devDependencies: {
            jest: '^27.0.0',
            typescript: '^5.0.0',
          },
        }),
      );
    });

    it('should include Jest configuration after TypeScript', () => {
      const config = createConfig();

      const configNames = config.map((c: any) => c.name);
      expect(configNames).toContain('papyrus-ui/base');
      expect(configNames).toContain('papyrus-ui/typescript');
      expect(configNames).toContain('papyrus-ui/jest');
      expect(configNames).toContain('papyrus-ui/jest-typescript');

      // Jest should come after TypeScript, and jest-typescript should come last
      const jestIndex = configNames.findIndex(
        (name: string) =>
          name?.startsWith('papyrus-ui/jest') && !name.includes('typescript'),
      );
      const jestTypescriptIndex = configNames.findIndex((name: string) =>
        name?.startsWith('papyrus-ui/jest-typescript'),
      );
      const typescriptIndex = configNames.findIndex((name: string) =>
        name?.startsWith('papyrus-ui/typescript'),
      );

      expect(jestIndex).toBeGreaterThan(typescriptIndex);
      expect(jestTypescriptIndex).toBeGreaterThan(jestIndex);
    });

    it('should not include jest-typescript when typescript is disabled', () => {
      const config = createConfig({ typescript: false });

      const configNames = config.map((c: any) => c.name);
      expect(configNames).toContain('papyrus-ui/jest');
      expect(configNames).not.toContain('papyrus-ui/jest-typescript');
      expect(configNames).not.toContain('papyrus-ui/typescript');
    });
  });

  describe('when package.json exists with Storybook dependency', () => {
    beforeEach(() => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          devDependencies: {
            '@storybook/react': '^8.0.0',
          },
        }),
      );
    });

    it('should include Storybook configuration', () => {
      const config = createConfig();

      const configNames = config.map((c: any) => c.name);
      expect(configNames).toContain('papyrus-ui/base');
      expect(configNames).toContain('papyrus-ui/storybook');
    });
  });

  describe('when package.json exists with Next.js dependency', () => {
    beforeEach(() => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          dependencies: {
            next: '^14.0.0',
          },
        }),
      );
    });

    it('should include Next.js configuration', () => {
      const config = createConfig();

      const configNames = config.map((c: any) => c.name);
      expect(configNames).toContain('papyrus-ui/base');
      expect(configNames).toContain('papyrus-ui/next');
    });
  });

  describe('with explicit options', () => {
    beforeEach(() => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          dependencies: {
            react: '^18.0.0',
          },
        }),
      );
    });

    it('should respect explicit libs option', () => {
      const config = createConfig({
        libs: ['jest'],
        typescript: false,
      });

      const configNames = config.map((c: any) => c.name);
      expect(configNames).toContain('papyrus-ui/base');
      expect(configNames).toContain('papyrus-ui/jest');
      expect(configNames).not.toContain('papyrus-ui/react');
      expect(configNames).not.toContain('papyrus-ui/typescript');
    });

    it('should respect explicit typescript option', () => {
      const config = createConfig({
        typescript: true,
        project: './custom-tsconfig.json',
      });

      const configNames = config.map((c: any) => c.name);
      expect(configNames).toContain('papyrus-ui/typescript');

      // Find TypeScript config and check if it has the custom options
      const tsConfig = config.find(
        (c: any) => c.name === 'papyrus-ui/typescript',
      );
      expect(tsConfig).toBeDefined();
      expect(tsConfig?.settings?.['import/resolver']?.node?.project).toBe(
        './custom-tsconfig.json',
      );
      expect(tsConfig?.settings?.['import/resolver']?.typescript?.project).toBe(
        './custom-tsconfig.json',
      );
    });
  });

  describe('configuration structure', () => {
    beforeEach(() => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          dependencies: {
            react: '^18.0.0',
          },
          devDependencies: {
            typescript: '^5.0.0',
            jest: '^27.0.0',
          },
        }),
      );
    });

    it('should return valid ESLint flat config format', () => {
      const config = createConfig();

      expect(Array.isArray(config)).toBe(true);

      config.forEach((configItem: any) => {
        expect(typeof configItem).toBe('object');
        expect(configItem).not.toBeNull();

        if (configItem.name) {
          expect(typeof configItem.name).toBe('string');
        }

        if (configItem.files) {
          expect(Array.isArray(configItem.files)).toBe(true);
        }

        if (configItem.rules) {
          expect(typeof configItem.rules).toBe('object');
        }

        if (configItem.plugins) {
          expect(typeof configItem.plugins).toBe('object');
        }
      });
    });

    it('should have proper config names', () => {
      const config = createConfig();

      const configNames = config.map((c: any) => c.name).filter(Boolean);

      // All config names should start with 'papyrus-ui/'
      configNames.forEach((name: string) => {
        expect(name).toMatch(/^papyrus-ui\//);
      });
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockImplementation(() => {
        throw new Error('File read error');
      });
    });

    it('should handle package.json read errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const config = createConfig();

      expect(config).toBeDefined();
      expect(Array.isArray(config)).toBe(true);

      consoleSpy.mockRestore();
    });
  });

  describe('auto-detection logic', () => {
    it('should detect React from dependencies', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          dependencies: { react: '^18.0.0' },
        }),
      );

      const config = createConfig();
      const configNames = config.map((c: any) => c.name);
      expect(configNames).toContain('papyrus-ui/react');
    });

    it('should detect TypeScript from devDependencies', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          devDependencies: { typescript: '^5.0.0' },
        }),
      );

      const config = createConfig();
      const configNames = config.map((c: any) => c.name);
      expect(configNames).toContain('papyrus-ui/typescript');
    });

    it('should detect Jest from devDependencies', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          devDependencies: { jest: '^27.0.0' },
        }),
      );

      const config = createConfig();
      const configNames = config.map((c: any) => c.name);
      expect(configNames).toContain('papyrus-ui/jest');
    });

    it('should detect Storybook from @storybook packages', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          devDependencies: { '@storybook/react': '^8.0.0' },
        }),
      );

      const config = createConfig();
      const configNames = config.map((c: any) => c.name);
      expect(configNames).toContain('papyrus-ui/storybook');
    });

    it('should detect Storybook from storybook package', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          devDependencies: { storybook: '^8.0.0' },
        }),
      );

      const config = createConfig();
      const configNames = config.map((c: any) => c.name);
      expect(configNames).toContain('papyrus-ui/storybook');
    });

    it('should detect Next.js from next dependency', () => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          dependencies: { next: '^14.0.0' },
        }),
      );

      const config = createConfig();
      const configNames = config.map((c: any) => c.name);
      expect(configNames).toContain('papyrus-ui/next');
    });
  });

  describe('configuration loading order', () => {
    beforeEach(() => {
      mockExistsSync.mockReturnValue(true);
      mockReadFileSync.mockReturnValue(
        JSON.stringify({
          dependencies: {
            react: '^18.0.0',
            next: '^14.0.0',
          },
          devDependencies: {
            typescript: '^5.0.0',
            jest: '^27.0.0',
            '@storybook/react': '^8.0.0',
          },
        }),
      );
    });

    it('should load configs in the correct order', () => {
      const config = createConfig();
      const configNames = config.map((c: any) => c.name);

      // Expected order: base, react, storybook, next, typescript, jest, jest-typescript
      const expectedOrder = [
        'papyrus-ui/base',
        'papyrus-ui/react',
        'papyrus-ui/storybook',
        'papyrus-ui/next',
        'papyrus-ui/typescript',
        'papyrus-ui/jest',
        'papyrus-ui/jest-typescript',
      ];

      // Check that all expected configs are present
      expectedOrder.forEach(name => {
        expect(configNames).toContain(name);
      });

      // Check relative ordering
      let lastIndex = -1;
      expectedOrder.forEach(expectedName => {
        const currentIndex = configNames.findIndex(
          (name: string) => name === expectedName,
        );
        expect(currentIndex).toBeGreaterThan(lastIndex);
        lastIndex = currentIndex;
      });
    });
  });
});
