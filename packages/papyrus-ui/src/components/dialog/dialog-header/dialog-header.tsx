'use client';

import cn from 'classnames';
import { useContext } from 'react';
import type { FC, HTMLAttributes, ReactNode } from 'react';

import { DialogContext } from '../dialog.context';

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  title?: string;
}

export const DialogHeader: FC<DialogHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  const { size } = useContext(DialogContext);

  return (
    <div
      className={cn(
        'flex items-center gap-4 px-4 py-3.5 z-20',
        size !== 'sm' && 'border-b border-neutral-200 bg-white',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
