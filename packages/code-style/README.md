# @papyrus-ui/code-style

Shareable ESLint configurations for JavaScript and TypeScript projects using ESLint 9+ flat config format.

Built with TypeScript and Vite for maximum compatibility with modern JavaScript environments.

## Installation

```bash
npm install --save-dev @papyrus-ui/code-style
```

## Usage

### 🚀 Auto-Detected Configuration (Recommended)

The simplest way to use `@papyrus-ui/code-style` - it automatically detects your project setup by reading `package.json`:

```javascript
// eslint.config.js
import createConfig from '@papyrus-ui/code-style';

export default [
  // Auto-detects React, Storybook, Jest, and TypeScript from package.json
  ...createConfig(),

  // Your custom project rules
  {
    name: 'my-custom-rules',
    files: ['**/*.custom.js'],
    rules: {
      'no-console': 'warn',
    },
  },
];
```

The function automatically:

- ✅ Detects **React** from `react` or `@types/react` dependencies
- ✅ Detects **Storybook** from `@storybook/*` or `storybook` dependencies
- ✅ Detects **Jest** from `jest` or `@types/jest` dependencies
- ✅ Detects **TypeScript** from `typescript` dependency
- ✅ Finds project root by traversing up for `package.json`
- ✅ Uses `./tsconfig.json` as the default project file

### ⚙️ Manual Configuration

For precise control over which libraries to include:

```javascript
// eslint.config.js
import createConfig from '@papyrus-ui/code-style';

export default [
  ...createConfig({
    libs: ['react', 'storybook', 'jest'], // Specify libraries explicitly
    typescript: true, // Force TypeScript config
    typescriptOptions: {
      tsconfigRootDir: __dirname, // Custom root directory
      project: ['./tsconfig.json'], // Custom tsconfig file(s)
    },
  }),
];
```

### Configuration Options

```typescript
interface ConfigOptions {
  libs?: ('react' | 'storybook' | 'jest')[]; // Include specific library configurations
  typescript?: boolean; // Include TypeScript configurations
  typescriptOptions?: {
    tsconfigRootDir?: string; // TypeScript project root
    project?: string | string[]; // tsconfig.json file(s)
  };
}
```

### Usage Examples

```javascript
// JavaScript only
export default [...createConfig({ libs: [], typescript: false })];

// React project only
export default [...createConfig({ libs: ['react'] })];

// Storybook project
export default [...createConfig({ libs: ['storybook'] })];

// Jest testing setup
export default [...createConfig({ libs: ['jest'] })];

// React + Storybook + Jest (auto-detected from package.json)
export default [...createConfig()];
```

### Library-Specific Configurations

#### React Configuration

- **Files**: `**/*.jsx`, `**/*.tsx`
- **Features**: React recommended rules, JSX accessibility, React Hooks
- **Overrides**:
  - JSX files: Default exports allowed
  - TSX files: Prop-types disabled

#### Storybook Configuration

- **Files**: `**/*.stories.{js,jsx,ts,tsx}`
- **Features**: Allows default exports for story files

#### Jest Configuration

- **Files**: `**/*.test.{js,jsx,ts,tsx}`, `**/*.spec.{js,jsx,ts,tsx}`
- **Features**: Jest globals, relaxed TypeScript rules for tests
- **Rules**: `@typescript-eslint/no-unsafe-call` disabled

## Configuration Details

### Auto-Detection Logic

The `createConfig` function automatically detects your project's configuration:

1. **Project Root**: Traverses up from the current directory until it finds a `package.json` file
2. **Dependencies**: Reads `package.json` to detect:
   - **React**: `react` or `@types/react` in dependencies
   - **Storybook**: `@storybook/*` packages or `storybook` in dependencies
   - **Jest**: `jest` or `@types/jest` in dependencies
   - **TypeScript**: `typescript` in dependencies

### Generated Configurations

- **Base (1 config)**: ESLint recommended + Import rules + Prettier formatting
- **React (3 configs)**: Main React rules + JSX overrides + TSX overrides
- **Storybook (1 config)**: Story file rules allowing default exports
- **Jest (1 config)**: Test file rules with Jest globals and relaxed TypeScript rules
- **TypeScript (2 configs)**: Main TypeScript rules + .d.ts file overrides

### TypeScript Project Configuration

When TypeScript is detected/enabled, the function automatically configures:

```javascript
// Applied to the main TypeScript config
languageOptions: {
  parserOptions: {
    tsconfigRootDir: detectedOrProvided,    // Auto-detected or custom
    project: ['./tsconfig.json'],           // Default or custom
  },
}
```

## Prettier Integration

The configurations include Prettier integration. Set up your prettier config:

```javascript
// .prettierrc.js (ES modules)
import prettierConfig from '@papyrus-ui/code-style/prettier';
export default prettierConfig;

// .prettierrc.cjs (CommonJS)
const prettierConfig = require('@papyrus-ui/code-style/prettier');
module.exports = prettierConfig;
```

## Features

- 🎯 **Smart Auto-Detection**: Reads your package.json to configure automatically
- 📚 **Multi-Library Support**: React, Storybook, Jest configurations included
- 🔍 **Project Root Detection**: Automatically finds your project root
- ✅ **ES Module First**: Modern import/export syntax
- ✅ **TypeScript Built**: Full type safety and IntelliSense
- ✅ **Dual Exports**: Works with both ES modules and CommonJS
- ✅ **Vite Powered**: Fast builds and development
- ✅ **Zero Config**: Just call the function and go
- ✅ **Flexible Options**: Override any auto-detected setting
- ✅ **Source Maps**: Full debugging support

## Requirements

- ESLint ^9.0.0
- TypeScript ^5.0.0 (for TypeScript projects)
- Node.js 18+

## Migration from Previous Versions

### From react: boolean API

```javascript
// Old way
createConfig({ react: true, typescript: true });

// New way
createConfig({ libs: ['react'], typescript: true });
```

### From Array-Based API

```javascript
// Old way
import { configs } from '@papyrus-ui/code-style';
export default [...configs.base, ...configs.react, ...configs.typescript];

// New way (with auto-detection)
import createConfig from '@papyrus-ui/code-style';
export default [...createConfig()];
```

## License

MIT
