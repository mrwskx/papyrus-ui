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

import type { MenuBarSize, MenuBarVariant } from './menu-bar.types';

export interface MenuBarContextType {
  activeIndex: number | null;
  collapsed: boolean;
  context: FloatingContext<HTMLElement>;
  elementsRef: MutableRefObject<(HTMLElement | null)[]>;
  floatingStyles: CSSProperties;
  getFloatingProps: (
    userProps?: HTMLProps<HTMLElement>,
  ) => Record<string, unknown>;
  getItemProps: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>;
  isOpen: boolean;
  isNested: boolean;
  labelsRef: MutableRefObject<string[]>;
  refs: ExtendedRefs<HTMLElement>;
  setActiveIndex: Dispatch<SetStateAction<number | null>>;
  size: MenuBarSize;
  variant: MenuBarVariant;
}

export const MenuBarContext = createContext<MenuBarContextType>({
  activeIndex: null,
  collapsed: false,
  context: {} as FloatingContext<HTMLElement>,
  elementsRef: {} as MutableRefObject<HTMLElement[]>,
  floatingStyles: {},
  getFloatingProps: () => ({}),
  getItemProps: () => ({}),
  isOpen: false,
  isNested: false,
  labelsRef: {} as MutableRefObject<string[]>,
  refs: {} as ExtendedRefs<HTMLElement>,
  setActiveIndex: () => {
    // Do nothing
  },
  size: 'md',
  variant: 'secondary',
});
