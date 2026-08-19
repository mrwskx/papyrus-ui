import cn from 'classnames';
import type { FC, HTMLAttributes } from 'react';

import { Caption } from '../../caption';
import { Skeleton } from '../skeleton';

export type CaptionSkeletonProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
>;

export const CaptionSkeleton: FC<CaptionSkeletonProps> = ({
  className,
  ...props
}) => (
  <Caption
    as="div"
    className={cn('relative flex flex-col justify-center', className)}
    {...props}
  >
    <span aria-hidden="true" className="invisible">
      Aa
    </span>
    <Skeleton className="absolute h-[1em] w-full rounded" />
  </Caption>
);
