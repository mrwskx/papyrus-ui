import cn from 'classnames';
import type { FC, HTMLAttributes } from 'react';

import type { IconButtonProps } from '../../icon-button';
import { Skeleton } from '../skeleton';

export interface IconButtonSkeletonProps
  extends
    Pick<IconButtonProps, 'rounded' | 'size'>,
    Omit<HTMLAttributes<HTMLDivElement>, 'children'> {}

export const IconButtonSkeleton: FC<IconButtonSkeletonProps> = ({
  className,
  rounded,
  size = 'md',
  ...props
}) => {
  const sizeClasses: Record<string, string> = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  return (
    <Skeleton
      className={cn(
        sizeClasses[size],
        rounded ? 'rounded-full' : 'rounded-md',
        className,
      )}
      {...props}
    />
  );
};

IconButtonSkeleton.displayName = 'IconButtonSkeleton';
