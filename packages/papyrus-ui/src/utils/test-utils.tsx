import {
  act,
  cleanup,
  fireEvent,
  render as renderTest,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  renderHook,
} from '@testing-library/react';
import type { RenderOptions, RenderResult } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { configureAxe } from 'jest-axe';
import type { ReactElement } from 'react';

import '@testing-library/jest-dom/vitest';
import 'jest-axe/extend-expect';

export type RenderFn<T = unknown> = (
  component: ReactElement,
  ...rest: never[]
) => T;

export const render: RenderFn<RenderResult> = (
  component,
  options?: RenderOptions,
) => renderTest(component, options);

export const axe = configureAxe({
  rules: {
    // disabled landmark rules when testing isolated components.
    region: { enabled: false },
  },
});

// Mock window.HTMLElement.prototype.scrollIntoView to prevent test errors
window.HTMLElement.prototype.scrollIntoView = vi.fn();

export {
  act,
  cleanup,
  fireEvent,
  renderHook,
  screen,
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
};
