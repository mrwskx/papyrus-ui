import cn from 'classnames';
import { useMemo } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { TransitionGroup } from 'react-transition-group';

import { SnackbarItem } from './snackbar-item';
import { SnackbarContext } from './snackbar.context';
import type { SnackbarPlacement } from './snackbar.types';

export interface SnackbarProps extends HTMLAttributes<HTMLDivElement> {
  placement?: SnackbarPlacement;
  className?: string;
  children?: ReactNode;
}

const rootPlacementClasses = {
  top: 'snackbar-top',
  'top-start': 'snackbar-top-start',
  'top-end': 'snackbar-top-end',
  bottom: 'snackbar-bottom',
  'bottom-start': 'snackbar-bottom-start',
  'bottom-end': 'snackbar-bottom-end',
};

export function SnackbarComponent({
  children,
  className,
  placement = 'top-end',
  ...props
}: SnackbarProps) {
  const contextValue = useMemo(
    () => ({
      placement,
    }),
    [placement],
  );

  return (
    <SnackbarContext.Provider value={contextValue}>
      <TransitionGroup
        {...props}
        className={cn('snackbar', rootPlacementClasses[placement], className)}
      >
        {children}
      </TransitionGroup>
    </SnackbarContext.Provider>
  );
}

export const Snackbar = Object.assign(SnackbarComponent, {
  Item: SnackbarItem,
});
