import cn from 'classnames';
import { Children, cloneElement, isValidElement } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

import type { TextSkeletonProps } from '../text-skeleton';

export interface ListSkeletonProps
  extends
    Pick<TextSkeletonProps, 'fontVariant' | 'size'>,
    HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function ListSkeleton({
  className,
  fontVariant,
  size,
  children,
  ...props
}: ListSkeletonProps) {
  return (
    <div {...props} className={cn('ps-[1.5em] spacing-y-[0.5em]', className)}>
      {Children.map(children, child =>
        isValidElement<TextSkeletonProps>(child)
          ? cloneElement(child, { fontVariant, size })
          : child,
      )}
    </div>
  );
}
