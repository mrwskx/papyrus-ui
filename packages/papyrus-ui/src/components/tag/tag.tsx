'use client';

import cn from 'classnames';
import { forwardRef } from 'react';
import type {
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
} from 'react';
import { BiX } from 'react-icons/bi';

import { Icon } from '../icon';

export type TagSize = 'sm' | 'md' | 'lg';

export type TagVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'ghost';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  disabled?: boolean;
  icon?: ReactNode;
  rounded?: boolean;
  size?: TagSize;
  variant?: TagVariant;
  onClick?: MouseEventHandler;
  onRemove?: () => void;
  children?: ReactNode;
}

// Base styles that are always applied
const baseStyles = [
  'inline-flex items-center justify-center',
  'max-w-full',
  'border',
  'gap-1.5',
];

// Size styles
const sizeStyles = {
  sm: 'min-w-6 h-4 px-1.5',
  md: 'min-w-9 h-6 px-2',
  lg: 'min-w-14 h-9 px-3',
};

// Variant styles
const variantStyles = {
  primary: ['border-transparent', 'text-white', 'bg-primary-600'],
  secondary: ['border-primary-400', 'text-primary-800', 'bg-primary-500/10'],
  tertiary: ['border-neutral-300', 'text-neutral-950', 'bg-neutral-500/10'],
  info: ['border-info-400', 'text-info-800', 'bg-info-500/10'],
  success: ['border-success-400', 'text-success-800', 'bg-success-500/10'],
  warning: ['border-warning-400', 'text-warning-800', 'bg-warning-500/10'],
  danger: ['border-danger-400', 'text-danger-800', 'bg-danger-500/10'],
  ghost: ['border-white/60', 'text-white', 'bg-white/20'],
};

const interactiveStyles = [
  'cursor-pointer',
  'transition-colors',
  'focus:outline-none',
];

const interactiveVariantStyles = {
  primary: [
    'hover:bg-primary-500',
    'active:bg-primary-700',
    'focus-visible:ring',
  ],
  secondary: [
    'hover:bg-primary-500/20',
    'active:bg-primary-500/30',
    'focus-visible:ring',
  ],
  tertiary: [
    'hover:bg-neutral-500/20',
    'active:bg-neutral-500/30',
    'focus-visible:ring',
  ],
  info: ['hover:bg-info-500/20', 'active:bg-info-500/30', 'focus-visible:ring'],
  success: [
    'hover:bg-success-500/20',
    'active:bg-success-500/30',
    'focus-visible:ring',
  ],
  warning: [
    'hover:bg-warning-500/20',
    'active:bg-warning-500/30',
    'focus-visible:ring',
  ],
  danger: [
    'hover:bg-danger-500/20',
    'active:bg-danger-500/30',
    'focus-visible:ring',
  ],
  ghost: [
    'hover:bg-white/30',
    'active:bg-white/40',
    'focus-visible:ring focus-visible:ring-primary-400/80',
  ],
};

// Label styles
const labelStyles = ['inline-block', 'font-sans', 'truncate'];

const labelSizeStyles = {
  sm: 'text-caption',
  md: 'text-caption',
  lg: 'text-body-sm-primary',
};

export const Tag = forwardRef<HTMLDivElement, TagProps>(
  (
    {
      className,
      disabled,
      icon,
      rounded,
      role,
      size = 'md',
      tabIndex,
      variant = 'primary',
      onClick,
      onKeyDown,
      onRemove,
      children,
      ...props
    },
    ref,
  ) => {
    const isInteractive = Boolean(onClick ?? onRemove);

    const handleClick = (e: MouseEvent) => !disabled && onClick?.(e);

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if ((!disabled && e.code === 'Space') || e.code === 'Enter') {
        e.currentTarget.click();
      }

      if (!disabled && onRemove && e.code === 'Delete') {
        onRemove();
      }

      onKeyDown?.(e);
    };

    return (
      // role and tabIndex below are set whenever the tag is interactive; the
      // rule cannot see through the conditional expressions that assign them.
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <span
        ref={ref}
        aria-disabled={disabled}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          disabled && 'opacity-disabled',
          rounded ? 'rounded-full' : 'rounded-tag',
          !disabled && onClick
            ? [interactiveStyles, interactiveVariantStyles[variant]]
            : ['cursor-text'],
          className,
        )}
        role={isInteractive && !role ? 'button' : role}
        tabIndex={
          onClick && !disabled && typeof tabIndex === 'undefined' ? 0 : tabIndex
        }
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {icon && <Icon className="text-sm">{icon}</Icon>}

        <span className={cn(labelStyles, labelSizeStyles[size])}>
          {children}
        </span>

        {!disabled && onRemove && (
          <Icon
            className="text-sm hover:opacity-60 cursor-pointer"
            data-testid="clear-icon"
            onMouseDown={e => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <BiX />
          </Icon>
        )}
      </span>
    );
  },
);

Tag.displayName = 'Tag';
