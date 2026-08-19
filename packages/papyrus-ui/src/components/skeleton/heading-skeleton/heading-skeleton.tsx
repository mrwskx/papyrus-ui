import cn from 'classnames';
import type { FC, HTMLAttributes } from 'react';

import { Heading } from '../../heading';
import type { HeadingProps } from '../../heading';
import { Skeleton } from '../skeleton';

export interface HeadingSkeletonProps
  extends
    Pick<HeadingProps, 'fontVariant' | 'level'>,
    Omit<HTMLAttributes<HTMLDivElement>, 'children'> {}

export const HeadingSkeleton: FC<HeadingSkeletonProps> = ({
  className,
  fontVariant = 'primary',
  level = 1,
  ...props
}) => (
  <Heading
    as='div'
    className={cn('relative flex flex-col justify-center', className)}
    fontVariant={fontVariant}
    level={level}
    {...props}
  >
    <span aria-hidden='true' className='invisible'>
      Aa
    </span>
    <Skeleton className='absolute h-[1em] w-full rounded' />
  </Heading>
);
