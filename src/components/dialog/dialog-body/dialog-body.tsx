'use client';

import cn from 'classnames';
import { useContext } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

import { DialogContext } from '../dialog.context';

export interface DialogBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function DialogBody({ className, children, ...props }: DialogBodyProps) {
  const { size } = useContext(DialogContext);

  return (
    <div
      className={cn(
        'flex-1 overflow-y-auto',
        size === 'sm' && 'px-4',
        size === 'md' && 'py-3 px-4',
        size === 'lg' && 'py-3 px-4',
        size === 'xl' && 'py-3 px-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
