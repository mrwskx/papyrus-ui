import cn from 'classnames';
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

import { Text } from '../text';
import type { TextSize, TextFontVariant } from '../text';

export interface UListProps extends HTMLAttributes<HTMLUListElement> {
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

export const UList = forwardRef<HTMLUListElement, UListProps>(
  ({ className, children, ...props }, ref) => (
    <Text
      ref={ref}
      as="ul"
      className={cn(
        'list',
        !className?.includes('list-') && 'list-disc',
        className,
      )}
      {...props}
    >
      {children}
    </Text>
  ),
);

UList.displayName = 'UList';
