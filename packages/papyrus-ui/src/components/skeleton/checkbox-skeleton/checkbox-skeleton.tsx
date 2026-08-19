import cn from 'classnames';
import type { HTMLAttributes } from 'react';

import { Skeleton } from '../skeleton';

export type CheckboxSkeletonProps = HTMLAttributes<HTMLDivElement>;

export function CheckboxSkeleton({
  children,
  ...props
}: CheckboxSkeletonProps) {
  return (
    <div {...props} className="flex items-start gap-x-2 inline-flex">
      <Skeleton className={cn('h-4 rounded w-4', children ? 'my-1' : '')} />
      {children && <div className="flex-1">{children}</div>}
    </div>
  );
}
