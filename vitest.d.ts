// jest-axe ships no types of its own, and @types/jest-axe augments Jest's
// namespace rather than Vitest's.
import 'vitest';

declare module 'vitest' {
  interface Assertion<T = unknown> {
    toHaveNoViolations(): T;
  }
}
