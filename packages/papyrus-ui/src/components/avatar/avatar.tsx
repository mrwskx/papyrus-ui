import cn from 'classnames';
import { cloneElement, forwardRef, isValidElement } from 'react';
import type { HTMLAttributes, ImgHTMLAttributes, ReactElement } from 'react';

import { Icon } from '../icon';
import { Text } from '../text';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * image element to be rendered within the avatar.
   */
  children?: ReactElement | null;

  /**
   * Additional class name(s) to apply to the avatar component.
   */
  className?: string;

  /**
   * icon to be rendered within the avatar.
   */
  icon?: ReactElement;

  /**
   * Placeholder text to display in case the avatar content is not available.
   */
  placeholder?: string;

  /**
   * Size of the avatar.
   */
  size?: AvatarSize;
}

function formatText(str = ''): string {
  return str
    .split(' ')
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('');
}

const sizeMap: Record<AvatarSize, string> = {
  xs: 'w-5 h-5',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
  '2xl': 'w-20 h-20',
};

const textSizeMap: Record<AvatarSize, string> = {
  xs: 'text-xs',
  sm: 'text-xs',
  md: 'text-base',
  lg: 'text-2xl',
  xl: 'text-3xl',
  '2xl': 'text-4xl',
};

const iconSizeMap: Record<AvatarSize, string> = {
  xs: 'text-sm',
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-3xl',
  xl: 'text-4xl',
  '2xl': 'text-5xl',
};

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ icon, placeholder, size = 'md', className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'relative inline-flex items-center justify-center rounded-full overflow-hidden',
        sizeMap[size],
        className?.includes('bg-') ? '' : 'bg-primary-500',
        className,
      )}
      {...props}
    >
      {!children && !icon && (
        <Text
          as="span"
          bold
          className={cn('absolute leading-none text-white', textSizeMap[size])}
        >
          {formatText(placeholder)}
        </Text>
      )}

      {!children && icon && (
        <Icon className={cn('absolute text-white', iconSizeMap[size])}>
          {icon}
        </Icon>
      )}

      {children &&
        isValidElement<ImgHTMLAttributes<HTMLImageElement>>(children) &&
        cloneElement(children, {
          className: cn(
            'absolute w-full h-full object-cover',
            children.props.className,
          ),
        })}
    </span>
  ),
);

Avatar.displayName = 'Avatar';
