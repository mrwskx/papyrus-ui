import cn from 'classnames';
import { forwardRef } from 'react';
import type { AllHTMLAttributes, ElementType } from 'react';

export type TextSize = 'md' | 'sm';
export type TextFontVariant = 'primary' | 'secondary';

export interface TextProps extends Omit<
  AllHTMLAttributes<HTMLElement>,
  'as' | 'color' | 'size'
> {
  /**
   * Specifies the HTML element type to render the text as.
   * Can be any valid HTML element (e.g., 'p', 'span', 'div', etc.).
   *
   * @default 'p'
   */
  as?: ElementType;

  /**
   * Applies bold styling to the text.
   *
   * @default false
   */
  bold?: boolean;

  /**
   * Sets the font family variant for the text.
   *
   * @default 'primary'
   */
  fontVariant?: TextFontVariant;

  /**
   * Defines the size of the text.
   *
   * @default 'md'
   */
  size?: TextSize;
}

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Element = 'p',
      bold = false,
      className,
      size = 'md',
      fontVariant = 'primary',
      children,
      ...props
    },
    ref,
  ) => (
    <Element
      ref={ref}
      className={cn(
        fontVariant === 'primary' && 'font-sans',
        fontVariant === 'secondary' && 'font-serif',
        size === 'md' &&
          fontVariant === 'primary' &&
          !bold &&
          'text-body-md-primary',
        size === 'md' &&
          fontVariant === 'primary' &&
          bold &&
          'text-body-md-primary-bold',
        size === 'md' &&
          fontVariant === 'secondary' &&
          !bold &&
          'text-body-md-secondary',
        size === 'md' &&
          fontVariant === 'secondary' &&
          bold &&
          'text-body-md-secondary-bold',
        size === 'sm' &&
          fontVariant === 'primary' &&
          !bold &&
          'text-body-sm-primary',
        size === 'sm' &&
          fontVariant === 'primary' &&
          bold &&
          'text-body-sm-primary-bold',
        size === 'sm' &&
          fontVariant === 'secondary' &&
          !bold &&
          'text-body-sm-secondary',
        size === 'sm' &&
          fontVariant === 'secondary' &&
          bold &&
          'text-body-sm-secondary-bold',
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  ),
);

Text.displayName = 'Text';
