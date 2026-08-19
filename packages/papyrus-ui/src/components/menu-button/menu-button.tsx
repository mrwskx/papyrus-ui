'use client';

import cn from 'classnames';
import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ElementType, ReactNode } from 'react';

import { Icon } from '../icon';

export type MenuButtonDirection = 'vertical' | 'horizontal';

export type MenuButtonSize = 'sm' | 'md' | 'lg';

export type MenuButtonVariant = 'primary' | 'secondary' | 'ghost';

const INDENT_BASE = 1.625;

export interface MenuButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: ElementType;
  active?: boolean;
  collapsed?: boolean;
  danger?: boolean;
  description?: string;
  direction?: MenuButtonDirection;
  disabled?: boolean;
  indent?: number;
  selected?: boolean;
  size?: MenuButtonSize;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant?: MenuButtonVariant;
}

const rootDirectionClasses = {
  vertical: '',
  horizontal: 'flex-1',
};

const rootDirectionPrimaryClasses = {
  vertical: 'px-2',
  horizontal: 'py-2',
};

const linkDefaultClasses =
  'relative flex justify-center items-center gap-2 rounded-md text-start transition-colors cursor-pointer focus:outline-none focus-visible:ring';

const linkSizeClasses = {
  sm: 'px-2.5 py-0.5',
  md: 'px-3 py-1.5',
  lg: 'px-3.5 py-3',
};

const linkDefaultVariantClasses = {
  primary: {
    base: 'text-neutral-950 hover:bg-neutral-500/10 active:bg-neutral-400/20',
    active: 'text-neutral-950 bg-neutral-500/10 active:bg-neutral-400/20',
  },
  secondary: {
    base: 'text-neutral-950 hover:bg-neutral-500/10 active:bg-neutral-400/20',
    active: 'text-neutral-950 bg-neutral-500/10 active:bg-neutral-400/20',
  },
  ghost: {
    base: 'text-white hover:bg-white/30 active:bg-white/40',
    active: 'text-white bg-white/30 active:bg-white/40',
  },
};

const linkDefaultSelectedVariantClasses = {
  primary: {
    base: 'text-neutral-950 bg-neutral-400/20 hover:bg-neutral-500/10 active:bg-neutral-400/20',
    active: 'ext-neutral-950 bg-neutral-500/10 active:bg-neutral-400/20',
  },
  secondary: {
    base: 'text-primary-600 bg-primary-400/20 hover:bg-primary-500/10 active:bg-primary-400/20',
    active: 'text-primary-600 bg-primary-500/10 active:bg-neutral-400/20',
  },
  ghost: {
    base: 'text-white bg-primary-600 hover:bg-primary-500',
    active: 'text-white bg-primary-500',
  },
};

const linkDefaultDangerVariantClasses = {
  primary: {
    base: 'text-danger-600 hover:bg-neutral-500/10 active:bg-neutral-400/20',
    active: 'text-danger-600 bg-neutral-500/10 active:bg-neutral-400/20',
  },
  secondary: {
    base: 'text-danger-600 hover:bg-neutral-500/10 active:bg-neutral-400/20',
    active: 'text-danger-600 bg-neutral-500/10 active:bg-neutral-400/20',
  },
  ghost: {
    base: 'text-danger-500 hover:bg-white/30 active:bg-white/40',
    active: 'text-danger-500 bg-white/30 active:bg-white/40',
  },
};

const linkDefaultDangerSelectedVariantClasses = {
  primary: {
    base: 'text-danger-600 bg-neutral-400/20 hover:bg-neutral-500/10 active:bg-neutral-400/20',
    active: 'text-danger-600 bg-neutral-500/10 active:bg-neutral-400/20',
  },
  secondary: {
    base: 'text-danger-600 bg-primary-400/20 hover:bg-primary-500/10 active:bg-primary-400/20',
    active: 'text-danger-600 bg-primary-500/10 active:bg-primary-400/20',
  },
  ghost: {
    base: 'text-danger-500 bg-primary-600 hover:bg-primary-500',
    active: 'text-danger-500 bg-primary-500',
  },
};

const linkCollapsedClasses =
  'relative flex flex-col justify-center items-center gap-0.5 min-w-0 h-12 rounded-md text-center transition-colors p-1 cursor-pointer';

const linkCollapsedVariantClasses = {
  primary: {
    base: 'text-neutral-500 hover:bg-neutral-500/10 active:bg-neutral-400/20',
    active: 'text-neutral-500 bg-neutral-500/10 active:bg-neutral-400/20',
  },
  secondary: {
    base: 'text-neutral-500 hover:bg-neutral-500/10 active:bg-neutral-400/20',
    active: 'text-neutral-500 bg-neutral-500/10 active:bg-neutral-400/20',
  },
  ghost: {
    base: 'text-white hover:bg-white/30 active:bg-white/40',
    active: 'text-white bg-white/30 active:bg-white/40',
  },
};

const linkCollapsedSelectedVariantClasses = {
  primary: {
    base: 'text-neutral-500 bg-neutral-400/20 hover:bg-neutral-500/10 active:bg-neutral-400/20',
    active: 'text-neutral-500 bg-neutral-500/10 active:bg-neutral-400/20',
  },
  secondary: {
    base: 'text-primary-600 bg-primary-400/20 hover:bg-primary-500/10 active:bg-primary-400/20',
    active: 'text-primary-600 bg-primary-500/10 active:bg-primary-400/20',
  },
  ghost: {
    base: 'text-white bg-primary-600 hover:bg-primary-500',
    active: 'text-white bg-primary-500',
  },
};

const linkCollapsedDangerVariantClasses = {
  primary: {
    base: 'text-danger-600 hover:bg-neutral-500/10 active:bg-neutral-400/20',
    active: 'text-danger-600 bg-neutral-500/10 active:bg-neutral-400/20',
  },
  secondary: {
    base: 'text-danger-600 hover:bg-neutral-500/10 active:bg-neutral-400/20',
    active: 'text-danger-600 bg-neutral-500/10 active:bg-neutral-400/20',
  },
  ghost: {
    base: 'text-danger-500 hover:bg-white/30 active:bg-white/40',
    active: 'text-danger-500 bg-white/30 active:bg-white/40',
  },
};

const linkCollapsedDangerSelectedVariantClasses = {
  primary: {
    base: 'text-danger-600 bg-neutral-400/20 hover:bg-neutral-500/10 active:bg-neutral-400/20',
    active: 'text-danger-600 bg-neutral-500/10 active:bg-neutral-400/20',
  },
  secondary: {
    base: 'text-danger-600 bg-primary-400/20 hover:bg-primary-500/10 active:bg-primary-400/20',
    active: 'text-danger-600 bg-primary-500/10 active:bg-primary-400/20',
  },
  ghost: {
    base: 'text-danger-500 bg-primary-600 hover:bg-primary-500',
    active: 'text-danger-500 bg-primary-500',
  },
};

const iconDefaultClasses = 'text-lg';

const iconDefaultVariantClasses = {
  primary: 'text-neutral-500',
  secondary: 'text-neutral-500',
  ghost: 'text-white',
};

const iconDefaultSelectedVariantClasses = {
  primary: 'text-neutral-950',
  secondary: 'text-primary-600',
  ghost: 'text-white',
};

const iconDefaultDangerVariantClasses = {
  primary: 'text-danger-600',
  secondary: 'text-danger-600',
  ghost: 'text-danger-500',
};

const iconDefaultDangerSelectedVariantClasses = {
  primary: 'text-danger-600',
  secondary: 'text-danger-600',
  ghost: 'text-danger-500',
};

const iconCollapsedClasses = 'text-xl my-0.5';

const iconCollapsedVariantClasses = {
  primary: 'text-neutral-950',
  secondary: 'text-neutral-950',
  ghost: 'text-white',
};

const iconCollapsedSelectedVariantClasses = {
  primary: 'text-neutral-950',
  secondary: 'text-primary-600',
  ghost: 'text-white',
};

const iconCollapsedDangerVariantClasses = {
  primary: 'text-danger-600',
  secondary: 'text-danger-600',
  ghost: 'text-danger-500',
};

const iconCollapsedDangerSelectedVariantClasses = {
  primary: 'text-danger-600',
  secondary: 'text-primary-600',
  ghost: 'text-danger-500',
};

const labelContainerClasses = 'min-w-0 max-w-full inline-flex flex-col gap-0.5';

const labelDefaultClasses = 'font-sans block text-body-md-primary truncate';

const labelDefaultSelectedClasses =
  'font-sans block text-body-md-primary-bold truncate';

const labelCollapsedClasses = 'font-sans text-caption text-center truncate';

const labelContainerDirectionClasses = {
  vertical: 'flex-1',
  horizontal: '',
};

const descriptionBaseClasses =
  'block font-sans text-caption text-neutral-500 truncate';

const descriptionVariantClasses = {
  primary: 'text-neutral-500',
  secondary: 'text-neutral-500',
  ghost: 'text-white/80',
};

const underlineDirectionClasses = {
  vertical: 'top-1 bottom-1 -left-2 w-1',
  horizontal: '-bottom-2 left-1 right-1 h-1',
};

export const MenuButton = forwardRef<HTMLAnchorElement, MenuButtonProps>(
  (
    {
      as: Element = 'a',
      active,
      className,
      collapsed,
      danger,
      direction = 'vertical',
      disabled,
      indent = 0,
      role = 'menuitem',
      selected,
      size = 'md',
      description,
      startIcon,
      endIcon,
      variant = 'primary',
      children,
      ...props
    },
    ref,
  ) => (
    <li
      className={cn(
        rootDirectionClasses[direction],
        variant === 'primary' && rootDirectionPrimaryClasses[direction],
        className,
      )}
      role='none'
    >
      <Element
        ref={ref}
        aria-disabled={disabled}
        aria-selected={selected}
        className={cn(
          !collapsed && [
            linkDefaultClasses,
            linkSizeClasses[size],
            danger && [
              !selected &&
                !active &&
                linkDefaultDangerVariantClasses[variant].base,
              !selected &&
                active &&
                linkDefaultDangerVariantClasses[variant].active,
              selected &&
                !active &&
                linkDefaultDangerSelectedVariantClasses[variant].base,
              selected &&
                active &&
                linkDefaultDangerSelectedVariantClasses[variant].active,
            ],
            !danger && [
              !selected && !active && linkDefaultVariantClasses[variant].base,
              !selected && active && linkDefaultVariantClasses[variant].active,
              selected &&
                !active &&
                linkDefaultSelectedVariantClasses[variant].base,
              selected &&
                active &&
                linkDefaultSelectedVariantClasses[variant].active,
            ],
          ],
          collapsed && [
            linkCollapsedClasses,
            !danger && [
              !selected && !active && linkCollapsedVariantClasses[variant].base,
              !selected &&
                active &&
                linkCollapsedVariantClasses[variant].active,
              selected &&
                !active &&
                linkCollapsedSelectedVariantClasses[variant].base,
              selected &&
                active &&
                linkCollapsedSelectedVariantClasses[variant].active,
            ],
            danger && [
              !selected &&
                !active &&
                linkCollapsedDangerVariantClasses[variant].base,
              !selected &&
                active &&
                linkCollapsedDangerVariantClasses[variant].active,
              selected &&
                !active &&
                linkCollapsedDangerSelectedVariantClasses[variant].base,
              selected &&
                active &&
                linkCollapsedDangerSelectedVariantClasses[variant].active,
            ],
          ],
          disabled && 'pointer-events-none opacity-disabled',
        )}
        role={role}
        {...props}
      >
        {direction === 'vertical' && !collapsed && indent > 0 && (
          <span
            className='block'
            style={{ width: `${indent * INDENT_BASE}rem` }}
          />
        )}

        {startIcon && (
          <Icon
            className={cn(
              !collapsed && [
                iconDefaultClasses,
                !danger && [
                  !selected && iconDefaultVariantClasses[variant],
                  selected && iconDefaultSelectedVariantClasses[variant],
                ],
                danger && [
                  !selected && iconDefaultDangerVariantClasses[variant],
                  selected && iconDefaultDangerSelectedVariantClasses[variant],
                ],
              ],
              collapsed && [
                iconCollapsedClasses,
                !danger && [
                  !selected && iconCollapsedVariantClasses[variant],
                  selected && iconCollapsedSelectedVariantClasses[variant],
                ],
                danger && [
                  !selected && iconCollapsedDangerVariantClasses[variant],
                  selected &&
                    iconCollapsedDangerSelectedVariantClasses[variant],
                ],
              ],
            )}
          >
            {startIcon}
          </Icon>
        )}

        <span
          className={cn(
            labelContainerClasses,
            labelContainerDirectionClasses[direction],
          )}
        >
          <span
            className={cn(
              !collapsed && [
                !selected && labelDefaultClasses,
                selected && labelDefaultSelectedClasses,
              ],
              collapsed && labelCollapsedClasses,
            )}
          >
            {children}
          </span>

          {!collapsed && description && (
            <span
              className={cn(
                descriptionBaseClasses,
                descriptionVariantClasses[variant],
              )}
            >
              {description}
            </span>
          )}
        </span>

        {!collapsed && endIcon && <Icon className='text-lg'>{endIcon}</Icon>}

        {variant === 'primary' && !disabled && (
          <span
            className={cn(
              'absolute block rounded-full opacity-0 transition',
              underlineDirectionClasses[direction],
              !danger && 'bg-primary-500',
              danger && 'bg-danger-500',
              selected && 'opacity-100',
            )}
          />
        )}
      </Element>
    </li>
  ),
);

MenuButton.displayName = 'MenuButton';
