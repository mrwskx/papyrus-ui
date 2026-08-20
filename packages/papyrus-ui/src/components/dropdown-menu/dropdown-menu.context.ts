'use client';

import type { ExtendedRefs, FloatingContext } from '@floating-ui/react';
import { createContext } from 'react';
import type {
  CSSProperties,
  Dispatch,
  HTMLProps,
  MutableRefObject,
  SetStateAction,
} from 'react';

export interface DropdownMenuContextType {
  activeIndex: number | null;
  context: FloatingContext<HTMLElement>;
  elementsRef: MutableRefObject<(HTMLElement | null)[]>;
  floatingStyles: CSSProperties;
  getFloatingProps: (
    userProps?: HTMLProps<HTMLElement>,
  ) => Record<string, unknown>;
  getItemProps: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>;
  getReferenceProps: (
    userProps?: HTMLProps<HTMLElement>,
  ) => Record<string, unknown>;
  isOpen: boolean;
  labelsRef: MutableRefObject<string[]>;
  refs: ExtendedRefs<HTMLElement>;
  setActiveIndex: Dispatch<SetStateAction<number | null>>;
}

export const DropdownMenuContext = createContext<DropdownMenuContextType>({
  activeIndex: null,
  context: {} as FloatingContext<HTMLElement>,
  elementsRef: {} as MutableRefObject<HTMLElement[]>,
  floatingStyles: {},
  getFloatingProps: () => ({}),
  getItemProps: () => ({}),
  getReferenceProps: () => ({}),
  isOpen: false,
  labelsRef: {} as MutableRefObject<string[]>,
  refs: {} as ExtendedRefs<HTMLElement>,
  setActiveIndex: () => {
    // Do nothing
  },
});
