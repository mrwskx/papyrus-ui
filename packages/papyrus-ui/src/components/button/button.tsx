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
  'transition-color',
  'gap-1.5',
  'focus:outline-none',
];

// Variant styles
const variantStyles = {
  primary: [
    'border-transparent',
    'text-white',
    'bg-primary-600',
    'shadow-sm',
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
  info: [
    'border-transparent',
    'text-white',
    'bg-info-600',
    'shadow-sm',
    'hover:bg-info-500',
    'active:bg-info-700',
    'disabled:bg-neutral-300',
    'focus-visible:ring',
  ],
  success: [
    'border-transparent',
    'text-white',
    'bg-success-600',
    'shadow-sm',
    'hover:bg-success-500',
    'active:bg-success-700',
    'disabled:bg-neutral-300',
    'focus-visible:ring',
  ],
  warning: [
    'border-transparent',
    'text-white',
    'bg-warning-600',
    'shadow-sm',
    'hover:bg-warning-500',
    'active:bg-warning-700',
    'disabled:bg-neutral-300',
    'focus-visible:ring',
  ],
  danger: [
    'border-transparent',
    'text-white',
    'bg-danger-600',
    'shadow-sm',
    'hover:bg-danger-500',
    'active:bg-danger-700',
    'disabled:bg-neutral-300',
    'focus-visible:ring',
  ],
  ghost: [
    'border-white/80',
    'text-white',
    'hover:bg-white/30',
    'active:bg-white/40',
    'disabled:opacity-disabled disabled:bg-transparent',
    'focus-visible:ring focus-visible:ring-primary-400/80',
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
        rounded ? 'rounded-full' : 'rounded-input',
        className,
      )}
      type={Element === 'button' && type == null ? 'button' : type}
      {...props}
    >
      {loading && <Loader className='text-md' />}

      {!loading && startIcon && <Icon className='text-md'>{startIcon}</Icon>}

      {!loading && <span className={cn(labelStyles)}>{children}</span>}

      {!loading && endIcon && <Icon className='text-md'>{endIcon}</Icon>}
    </Element>
  ),
);

Button.displayName = 'Button';
