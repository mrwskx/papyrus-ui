import cn from 'classnames';
import { forwardRef } from 'react';
import type { AllHTMLAttributes } from 'react';

export type CodeSize = 'sm' | 'md';

export interface CodeProps extends Omit<
  AllHTMLAttributes<HTMLElement>,
  'size'
> {
  /**
   * The code content to display.
   */
  children?: string;

  /**
   * Defines the size of the inline code text.
   *
   * @default 'md'
   */
  size?: CodeSize;
}

export const Code = forwardRef<HTMLElement, CodeProps>(
  ({ children, className, size = 'md', ...props }, ref) => (
    <code
      ref={ref}
      className={cn(
        'font-mono bg-neutral-100 text-neutral-950 rounded-md border border-neutral-200 px-1',
        size === 'sm' && 'text-code-sm',
        size === 'md' && 'text-code-md',
        className,
      )}
      {...props}
    >
      {children}
    </code>
  ),
);

Code.displayName = 'Code';
