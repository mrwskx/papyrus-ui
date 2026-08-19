import cn from 'classnames';

import type { ButtonProps } from '../../button';
import { Skeleton } from '../skeleton';

export interface ButtonSkeletonProps extends Pick<
  ButtonProps,
  'block' | 'rounded' | 'size'
> {
  className?: string;
}

export const ButtonSkeleton = ({
  block,
  rounded,
  size = 'md',
  className,
}: ButtonSkeletonProps) => {
  const sizeClasses: Record<string, string> = {
    sm: 'min-w-24 h-7',
    md: 'min-w-28 h-9',
    lg: 'min-w-36 h-12',
  };

  return (
    <Skeleton
      className={cn(
        'inline-block',
        sizeClasses[size],
        rounded ? 'rounded-full' : 'rounded-md',
        block && 'w-full',
        className,
      )}
    />
  );
};

ButtonSkeleton.displayName = 'ButtonSkeleton';
