import cn from 'classnames';
import type { FC, HTMLAttributes } from 'react';

import { Skeleton } from '../skeleton';

export type RadioSkeletonProps = HTMLAttributes<HTMLDivElement>;

export const RadioSkeleton: FC<RadioSkeletonProps> = ({
  children,
  ...props
}) => (
  <div {...props} className="flex items-start gap-x-2 inline-flex">
    <Skeleton className={cn('h-4 rounded-full w-4', children ? 'my-1' : '')} />
    {children && <div className="flex-1">{children}</div>}
  </div>
);
