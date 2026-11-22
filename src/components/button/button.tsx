import cn from 'classnames';
import { forwardRef } from 'react';
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  ReactNode,
} from 'react';

import { Icon } from '../icon';
import { Loader } from '../loader';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'plain'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'ghost';

export interface ButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLElement>, 'type'>,
    AnchorHTMLAttributes<HTMLElement> {
  /**
   * Specifies the element type to be used for rendering the button.
   */
  as?: ElementType;

  /**
   * If `true`, the button will take the full width of its container.
   */
  block?: boolean;
  /**
   * The content of the button.
   */
  children?: ReactNode;

  /**
   * If `true`, the button will be disabled.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * If `true`, the button will show a loading indicator.
   *
   * @default false
   */
  loading?: boolean;

  /**
   * If `true`, the button will have a rounded appearance.
   *
   * @default false
   */
  rounded?: boolean;

  /**
   * The size of the button.
   *
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * The icon to be displayed at the start of the button.
   */
  startIcon?: ReactNode;

  /**
   * The icon to be displayed at the end of the button.
   */
  endIcon?: ReactNode;

  /**
   * The visual variant of the button.
   */
  variant?: ButtonVariant;
}

const sizeMap: Record<ButtonSize, string> = {
  sm: 'min-w-20 h-7 px-2',
  md: 'min-w-24 h-9 px-3',
  lg: 'min-w-32 h-12 px-4',
};

// Base styles that are always applied
const baseStyles = [
  'inline-flex items-center justify-center',
  'border border-solid',
  'enabled:cursor-pointer',
  'transition-colors',
  'gap-1.5',
  'focus:outline-none',
];

// Variant styles
const variantStyles = {
  primary: [
    'border-transparent',
    'text-on-emphasis',
    'bg-primary',
    'shadow-control',
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
  info: [
    'border-transparent',
    'text-on-emphasis',
    'bg-info',
    'shadow-control',
    'hover:bg-info-hover',
    'active:bg-info-press',
    'disabled:bg-disabled disabled:text-disabled',
    'focus-visible:ring focus-visible:ring-focus',
  ],
  success: [
    'border-transparent',
    'text-on-emphasis',
    'bg-success',
    'shadow-control',
    'hover:bg-success-hover',
    'active:bg-success-press',
    'disabled:bg-disabled disabled:text-disabled',
    'focus-visible:ring focus-visible:ring-focus',
  ],
  warning: [
    'border-transparent',
    'text-on-emphasis',
    'bg-warning',
    'shadow-control',
    'hover:bg-warning-hover',
    'active:bg-warning-press',
    'disabled:bg-disabled disabled:text-disabled',
    'focus-visible:ring focus-visible:ring-focus',
  ],
  danger: [
    'border-transparent',
    'text-on-emphasis',
    'bg-danger',
    'shadow-control',
    'hover:bg-danger-hover',
    'active:bg-danger-press',
    'disabled:bg-disabled disabled:text-disabled',
    'focus-visible:ring focus-visible:ring-focus',
  ],
  ghost: [
    'border-on-emphasis',
    'text-on-emphasis',
    'hover:bg-on-emphasis-hover',
    'active:bg-on-emphasis-press',
    'disabled:opacity-disabled disabled:bg-transparent',
    'focus-visible:ring focus-visible:ring-current',
  ],
};

// Label styles
const labelStyles = ['font-sans', 'inline-block', 'text-button', 'truncate'];

export const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      as: Element = 'button',
      block = false,
      rounded = false,
      size = 'md',
      startIcon,
      endIcon,
      type,
      variant = 'primary',
      loading = false,
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <Element
      ref={ref}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeMap[size],
        block && 'w-full',
        rounded ? 'rounded-pill' : 'rounded-control',
        className,
      )}
      type={Element === 'button' && type == null ? 'button' : type}
      {...props}
    >
      {loading && <Loader className="text-md" />}

      {!loading && startIcon && <Icon className="text-md">{startIcon}</Icon>}

      {!loading && <span className={cn(labelStyles)}>{children}</span>}

      {!loading && endIcon && <Icon className="text-md">{endIcon}</Icon>}
    </Element>
  ),
);

Button.displayName = 'Button';
