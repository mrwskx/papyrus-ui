import cn from 'classnames';

import { Skeleton } from '../skeleton';

export interface AvatarSkeletonProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export function AvatarSkeleton({
  size = 'md',
  className,
}: AvatarSkeletonProps) {
  const sizeClasses: Record<string, string> = {
    xs: 'w-5 h-5',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20',
  };

  return (
    <Skeleton
      className={cn(
        'relative inline-block rounded-full',
        sizeClasses[size],
        className,
      )}
    />
  );
}

AvatarSkeleton.displayName = 'AvatarSkeleton';
