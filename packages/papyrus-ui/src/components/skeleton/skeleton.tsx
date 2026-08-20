import cn from 'classnames';
import type { HTMLAttributes } from 'react';

export type SkeletonProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div {...props} className={cn('animate-pulse bg-neutral-200', className)} />
  );
}
