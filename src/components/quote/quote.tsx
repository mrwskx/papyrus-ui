import cn from 'classnames';
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

import { Text } from '../text';
import type { TextSize, TextFontVariant } from '../text';

export type QuoteVariant = 'primary' | 'secondary';

const lineVariantClasses = {
  primary: 'bg-primary-500',
  secondary: 'bg-neutral-400',
};

export interface QuoteProps extends Omit<
  HTMLAttributes<HTMLQuoteElement>,
  'color' | 'size'
> {
  /**
   * Sets the variant of the text inside the quote.
   *
   * @default 'primary'
   */
  fontVariant?: TextFontVariant;

  /**
   * Sets the size of the text inside the quote.
   *
   * @default 'md'
   */
  size?: TextSize;

  /**
   * Sets the variant for the quote.
   *
   * @default 'primary'
   */
  variant?: QuoteVariant;
}

export const Quote = forwardRef<HTMLQuoteElement, QuoteProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => (
    <Text
      {...props}
      ref={ref}
      as="blockquote"
      className={cn('relative ps-4', className)}
    >
      {children}
      <span
        className={cn(
          'absolute top-0 bottom-0 left-0 block w-1 rounded-full',
          lineVariantClasses[variant],
        )}
      />
    </Text>
  ),
);

Quote.displayName = 'Quote';
