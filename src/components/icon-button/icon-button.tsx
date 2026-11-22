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
  'enabled:cursor-pointer',
  'transition-colors',
  'focus:outline-none',
];

// Variant styles
const variantStyles = {
  primary: [
    'border-transparent',
    'text-on-emphasis',
    'bg-primary',
    'hover:bg-primary-hover',
    'active:bg-primary-press',
    'disabled:bg-disabled disabled:text-disabled',
    'focus-visible:ring focus-visible:ring-focus',
  ],
  secondary: [
    'border-primary-muted',
    'text-primary',
    'bg-transparent',
    'hover:bg-primary-muted',
    'active:bg-primary-muted-press active:text-primary-muted',
    'disabled:opacity-disabled disabled:border-control disabled:bg-transparent disabled:text-muted',
    'focus-visible:ring focus-visible:ring-focus',
  ],
  tertiary: [
    'border-neutral-muted',
    'text-default',
    'bg-control',
    'hover:bg-control-hover',
    'active:bg-control-press',
    'disabled:opacity-disabled disabled:bg-control',
    'focus-visible:ring focus-visible:ring-focus',
  ],
  plain: [
    'border-transparent',
    'text-default',
    'hover:bg-layer-hover',
    'active:hover:bg-layer-press',
    'disabled:opacity-disabled disabled:bg-transparent',
    'focus-visible:ring focus-visible:ring-focus',
  ],
  ghost: [
    'border-transparent',
    'text-on-emphasis',
    'hover:bg-on-emphasis-hover',
    'active:bg-on-emphasis-press',
    'disabled:opacity-disabled disabled:bg-transparent',
    'focus-visible:ring focus-visible:ring-current',
  ],
};

const avatarStyles = 'relative bg-surface border-default';

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
        avatar && 'rounded-pill',
        !avatar && (rounded ? 'rounded-pill' : 'rounded-control'),
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
