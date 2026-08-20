import cn from 'classnames';
import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

import { Text } from '../text';

export interface InputMessageProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * If `true`, render message text as an error message, otherwise renders it as a hint.
   *
   * @default false
   */
  invalid?: boolean;
  /**
   * Message to display under an input, such as validation errors or hints.
   */
  children?: ReactNode;
}

export const InputMessage = forwardRef<HTMLDivElement, InputMessageProps>(
  ({ className, invalid, children, ...props }, ref) => (
    <Text
      ref={ref}
      as="div"
      className={cn(
        invalid ? 'text-danger-600' : 'text-neutral-500',
        className,
      )}
      role={invalid ? 'alert' : 'status'}
      size="sm"
      {...props}
    >
      {children}
    </Text>
  ),
);

InputMessage.displayName = 'InputMessage';
