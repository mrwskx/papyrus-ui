import cn from 'classnames';
import type { HTMLAttributes } from 'react';

import { Skeleton } from '../skeleton';

export type RangeSkeletonProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
>;

export function RangeSkeleton({ className, ...props }: RangeSkeletonProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center relative py-2',
        className,
      )}
      {...props}
    >
      <Skeleton className="h-1 w-full rounded-full" />
      <Skeleton className="absolute h-3 w-3 rounded-full" />
    </div>
  );
}
