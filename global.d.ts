declare module '*.mdx' {
  const doc: string;
  export default doc;
}

// @types/jest-axe would drag in @types/jest, whose global expect overrides
// Vitest's and breaks every jest-dom matcher. Declare the surface used here.
declare module 'jest-axe' {
  export function configureAxe(
    options?: Record<string, unknown>,
  ): (
    html: Element | string,
    options?: Record<string, unknown>,
  ) => Promise<unknown>;
}

declare module 'jest-axe/extend-expect';
