import cn from 'classnames';
import { cloneElement, forwardRef, isValidElement } from 'react';
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  ReactElement,
} from 'react';

import type { AvatarProps } from '../avatar';
import { Icon } from '../icon/icon';

export type IconButtonSize = 'sm' | 'md' | 'lg';

export type IconButtonVariant =
  'primary' | 'secondary' | 'tertiary' | 'plain' | 'ghost';

export interface IconButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLElement>, 'type'>,
    AnchorHTMLAttributes<HTMLElement> {
  /**
   * Specifies the element type to be used for rendering the icon-button.
   */
  as?: ElementType;

  /**
   * Specifies the avatar element to be rendered within the icon-button.
   */
  avatar?: ReactElement;

  /**
   * If true, the icon-button will be disabled.
   */
  disabled?: boolean;

  /**
   * If true, the icon-button will have a circle shape.
   */
  rounded?: boolean;

  /**
   * The size of the icon-button.
   */
  size?: IconButtonSize;

  /**
   * The visual variant of the icon-button.
   */
  variant?: IconButtonVariant;

  /**
   * The content to be rendered inside the icon-button.
   */
  children?: ReactElement;
}

const sizeMap: Record<IconButtonSize, string> = {
  sm: 'w-7 h-7',
  md: 'w-9 h-9',
  lg: 'w-12 h-12',
};

const iconSizeMap: Record<IconButtonSize, string> = {
  sm: 'text-md',
  md: 'text-xl',
  lg: 'text-2xl',
};

// Base styles that are always applied
const baseStyles = [
  'inline-flex items-center justify-center',
  'border border-solid',
  'transition-colors',
  'focus:outline-none',
];

// Variant styles
const variantStyles = {
  primary: [
    'border-transparent',
    'text-white',
    'bg-primary-600',
    'hover:bg-primary-500',
    'active:bg-primary-700',
    'disabled:bg-neutral-300',
    'focus-visible:ring',
  ],
  secondary: [
    'border-primary-400',
    'text-primary-600',
    'bg-transparent',
    'hover:bg-primary-600/10',
    'active:bg-primary-600/20',
    'disabled:opacity-disabled disabled:border-neutral-400 disabled:bg-transparent disabled:text-neutral-600',
    'focus-visible:ring',
  ],
  tertiary: [
    'border-neutral-300',
    'text-neutral-950',
    'bg-neutral-500/10',
    'hover:bg-neutral-500/20',
    'active:bg-neutral-500/30',
    'disabled:opacity-disabled disabled:bg-neutral-500/10',
    'focus-visible:ring',
  ],
  plain: [
    'border-transparent',
    'text-neutral-950',
    'hover:bg-neutral-500/10',
    'active:hover:bg-neutral-500/20',
    'disabled:opacity-disabled disabled:bg-transparent',
    'focus-visible:ring',
  ],
  ghost: [
    'border-transparent',
    'text-white',
    'hover:bg-white/30',
    'active:bg-white/40',
    'disabled:opacity-disabled disabled:bg-transparent',
    'focus-visible:ring focus-visible:ring-primary-400/80',
  ],
};

const avatarStyles = 'relative bg-white';

const avatarChildrenStyles = 'hover:opacity-60 transition-opacity';

const avatarChildenDisabledStyles = 'opacity-disabled';

export const IconButton = forwardRef<HTMLElement, IconButtonProps>(
  (
    {
      as: Element = 'button',
      avatar,
      rounded,
      size = 'md',
      type,
      variant = 'primary',
      className,
      disabled,
      children,
      ...elemProps
    },
    ref,
  ) => (
    <Element
      {...elemProps}
      ref={ref}
      className={cn(
        baseStyles,
        sizeMap[size],
        !avatar && variantStyles[variant],
        avatar && avatarStyles,
        avatar || rounded ? 'rounded-full' : 'rounded-input',
        className,
      )}
      disabled={disabled}
      type={Element === 'button' && type == null ? 'button' : type}
    >
      {avatar &&
        isValidElement<AvatarProps>(avatar) &&
        cloneElement(avatar, {
          className: cn(
            disabled ? avatarChildenDisabledStyles : avatarChildrenStyles,
            avatar.props.className,
          ),
          style: {
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          },
        })}

      {!avatar && <Icon className={cn(iconSizeMap[size])}>{children}</Icon>}
    </Element>
  ),
);

IconButton.displayName = 'IconButton';
