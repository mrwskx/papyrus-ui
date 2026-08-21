import cn from 'classnames';
import type { HTMLAttributes } from 'react';

import { Text } from '../../text';
import type { TextProps } from '../../text';
import { Skeleton } from '../skeleton';

export interface TextSkeletonProps
  extends
    Pick<TextProps, 'fontVariant' | 'size'>,
    Omit<HTMLAttributes<HTMLDivElement>, 'children'> {}

export function TextSkeleton({
  className,
  fontVariant = 'primary',
  size = 'md',
  ...props
}: TextSkeletonProps) {
  return (
    <Text
      as="div"
      className={cn('relative flex flex-col justify-center', className)}
      fontVariant={fontVariant}
      size={size}
      {...props}
    >
      <span aria-hidden="true" className="invisible">
        Aa
      </span>
      <Skeleton className="absolute h-[1em] w-full rounded" />
    </Text>
  );
}
