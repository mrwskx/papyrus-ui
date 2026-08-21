import cn from 'classnames';
import { forwardRef } from 'react';
import type { AllHTMLAttributes, ElementType } from 'react';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingFontVariant = 'primary' | 'secondary';

export interface HeadingProps extends Omit<
  AllHTMLAttributes<HTMLElement>,
  'as' | 'size'
> {
  /**
   * Specifies the HTML element type to render the heading as.
   * Should be one of h1-h6 elements for semantic correctness.
   *
   * @default 'h1'
   */
  as?: ElementType;

  /**
   * The heading level (1-6) to use when no 'as' prop is provided.
   *
   * @default 1
   */
  level?: HeadingLevel;

  /**
   * Sets the font family variant for the heading.
   *
   * @default 'primary'
   */
  fontVariant?: HeadingFontVariant;
}

export const Heading = forwardRef<HTMLElement, HeadingProps>(
  (
    { as, className, level = 1, fontVariant = 'primary', children, ...props },
    ref,
  ) => {
    const Element = as ?? `h${level}`;
    return (
      <Element
        ref={ref}
        className={cn(
          fontVariant === 'primary' && 'font-sans',
          fontVariant === 'secondary' && 'font-serif',
          level === 1 &&
            (fontVariant === 'primary'
              ? 'text-h1-sans xl:text-h1-sans-desktop'
              : 'text-h1-serif xl:text-h1-serif-desktop'),
          level === 2 &&
            (fontVariant === 'primary'
              ? 'text-h2-sans xl:text-h2-sans-desktop'
              : 'text-h2-serif xl:text-h2-serif-desktop'),
          level === 3 &&
            (fontVariant === 'primary' ? 'text-h3-sans' : 'text-h3-serif'),
          level === 4 &&
            (fontVariant === 'primary' ? 'text-h4-sans' : 'text-h4-serif'),
          level === 5 &&
            (fontVariant === 'primary' ? 'text-h5-sans' : 'text-h5-serif'),
          level === 6 &&
            (fontVariant === 'primary' ? 'text-h6-sans' : 'text-h6-serif'),
          className,
        )}
        {...props}
      >
        {children}
      </Element>
    );
  },
);

Heading.displayName = 'Heading';
