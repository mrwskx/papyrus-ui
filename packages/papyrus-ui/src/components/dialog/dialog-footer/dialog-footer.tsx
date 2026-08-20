'use client';

import cn from 'classnames';
import { useContext } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

import { DialogContext } from '../dialog.context';

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export function DialogFooter({
  className,
  children,
  ...props
}: DialogFooterProps) {
  const { size } = useContext(DialogContext);

  return (
    <div
      className={cn(
        'flex items-center gap-4 py-3.5 px-4 z-20',
        size !== 'sm' && 'border-t border-neutral-200 bg-white',
        className?.includes('justify') ? '' : 'justify-between',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
