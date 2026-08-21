import cn from 'classnames';
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

export type MarkerProps = HTMLAttributes<HTMLSpanElement>;

// Base styles that are always applied
export const Marker = forwardRef<HTMLSpanElement, MarkerProps>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'absolute inline-block w-[1em] text-center -ms-[1.5em]',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  ),
);

Marker.displayName = 'Marker';
