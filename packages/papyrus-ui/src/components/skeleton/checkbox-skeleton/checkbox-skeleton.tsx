import cn from 'classnames';
import type { FC, HTMLAttributes } from 'react';

import { Skeleton } from '../skeleton';

export type CheckboxSkeletonProps = HTMLAttributes<HTMLDivElement>;

export const CheckboxSkeleton: FC<CheckboxSkeletonProps> = ({
  children,
  ...props
}) => (
  <div {...props} className="flex items-start gap-x-2 inline-flex">
    <Skeleton className={cn('h-4 rounded w-4', children ? 'my-1' : '')} />
    {children && <div className="flex-1">{children}</div>}
  </div>
);
