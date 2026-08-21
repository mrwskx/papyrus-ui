import cn from 'classnames';
import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export interface InputActionProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}

export const InputAction = forwardRef<HTMLDivElement, InputActionProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-center min-w-6 text-lg',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);

InputAction.displayName = 'InputAction';
