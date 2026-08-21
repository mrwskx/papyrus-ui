'use client';

import type { ExtendedRefs, FloatingContext } from '@floating-ui/react';
import { createContext } from 'react';
import type { HTMLAttributes } from 'react';

import type { DialogSize } from './dialog.types';

export interface DialogContextType {
  context: FloatingContext;
  descriptionId: string | undefined;
  labelId: string | undefined;
  isOpen: boolean;
  refs: ExtendedRefs<Element>;
  size: DialogSize;
  close: () => void;
  getFloatingProps: (
    userProps?: HTMLAttributes<Element>,
  ) => Record<string, unknown>;
  getReferenceProps: (
    userProps?: HTMLAttributes<Element>,
  ) => Record<string, unknown>;
  setDescriptionId: (descriptionId: string | undefined) => void;
  setLabelId: (titleId: string | undefined) => void;
}

export const DialogContext = createContext<DialogContextType>({
  context: {} as FloatingContext,
  descriptionId: undefined,
  labelId: undefined,
  isOpen: false,
  refs: {} as ExtendedRefs<Element>,
  size: 'md',
  close: () => {
    // Do nothing
  },
  getFloatingProps: () => ({}),
  getReferenceProps: () => ({}),
  setLabelId: () => {
    // Do nothing
  },
  setDescriptionId: () => {
    // Do nothing
  },
});
