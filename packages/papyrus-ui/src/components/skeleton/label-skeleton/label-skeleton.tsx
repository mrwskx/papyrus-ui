import cn from 'classnames';
import type { FC, HTMLAttributes } from 'react';

import { Label } from '../../label';
import { Skeleton } from '../skeleton';

export type LabelSkeletonProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
>;

export const LabelSkeleton: FC<LabelSkeletonProps> = ({
  className,
  ...props
}) => (
  <Label
    as="div"
    className={cn('relative flex flex-col justify-center', className)}
    {...props}
  >
    <span aria-hidden="true" className="invisible">
      Aa
    </span>
    <Skeleton className="absolute h-[1em] w-full rounded" />
  </Label>
);
