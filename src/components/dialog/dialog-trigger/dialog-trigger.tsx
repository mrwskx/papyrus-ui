import { cloneElement, isValidElement, useContext } from 'react';
import type { HTMLProps, ReactElement } from 'react';

import { DialogContext } from '../dialog.context';

export interface DialogTriggerProps {
  children: ReactElement;
}

export function DialogTrigger({ children }: DialogTriggerProps) {
  const { getReferenceProps, refs } = useContext(DialogContext);

  if (isValidElement<HTMLProps<HTMLButtonElement>>(children)) {
    return cloneElement(children, {
      ref: node => {
        refs.setReference(node);
      },
      ...getReferenceProps(),
    });
  }

  return null;
}
