import cn from 'classnames';
import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export type InputBoxSize = 'sm' | 'md' | 'lg';

export interface InputBoxProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content or elements to be rendered inside the input box.
   * This is where the actual input element or other components can be placed within the box.
   */
  children?: ReactNode;

  /**
   * If `true`, visually indicates that the input box is disabled by applying a disabled state style.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * If `true`, indicates that the input box is in an invalid state. This is often used in conjunction with validation messages
   * to show visual cues (such as red borders) to indicate that the input is invalid.
   *
   * @default false
   */
  invalid?: boolean;

  /**
   * If `true`, the input box will have a rounded appearance.
   *
   * @default false
   */
  rounded?: boolean;

  /**
   * Defines the size of the input box. This can be used to adjust the height of the input element.
   *
   * @default 'md'
   */
  size?: InputBoxSize;
}

const sizeMap: Record<InputBoxSize, string> = {
  sm: 'min-h-7 px-1.5 py-0.5',
  md: 'min-h-9 px-2 py-1.5',
  lg: 'min-h-11 px-2.5 py-3',
};

// Base styles that are always applied
const baseStyles = [
  'flex items-center',
  'border border-solid',
  'transition-colors',
  'overflow-hidden',
  'focus:outline-none',
];

const interactiveStyles = [
  'border-neutral-400',
  'bg-neutral-50',
  'cursor-text',
  'hover:border-primary-500',
  'focus-within:border-primary-500 focus-within:ring-4',
];

const invalidStyles = [
  'border-danger-500',
  'bg-neutral-50',
  'cursor-text',
  'focus-within:ring-4 focus-within:ring-danger-500/50',
];

const disabledStyles = [
  'bg-neutral-50/50',
  'border-neutral-200',
  'cursor-default',
];

export const InputBox = forwardRef<HTMLDivElement, InputBoxProps>(
  (
    {
      invalid,
      size = 'md',
      className,
      disabled,
      rounded,
      children,
      ...elementProps
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          !disabled && !invalid && interactiveStyles,
          !disabled && invalid && invalidStyles,
          disabled && disabledStyles,
          sizeMap[size],
          rounded ? 'rounded-full' : 'rounded-input',
          className,
        )}
        {...elementProps}
      >
        {children}
      </div>
    );
  },
);

InputBox.displayName = 'InputBox';
