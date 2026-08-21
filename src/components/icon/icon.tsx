import cn from 'classnames';
import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export interface IconProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'children'
> {
  /**
   * The icon content to be rendered.
   */
  children: ReactNode;
}

export const Icon = forwardRef<HTMLElement, IconProps>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn('inline-block leading-none align-[-0.125em]', className)}
      {...props}
    >
      {children}
    </span>
  ),
);

Icon.displayName = 'Icon';
