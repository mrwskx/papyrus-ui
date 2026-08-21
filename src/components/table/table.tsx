import cn from 'classnames';
import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export type TableSize = 'md' | 'sm';

export type TableFontVariant = 'primary' | 'secondary';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  bordered?: boolean;
  fontVariant?: TableFontVariant;
  size?: TableSize;
  striped?: boolean;
  children?: ReactNode;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      bordered,
      className,
      fontVariant = 'primary',
      size = 'md',
      striped,
      children,
      ...props
    },
    ref,
  ) => (
    <table
      {...props}
      ref={ref}
      className={cn(
        'table',
        `table-${size}-${fontVariant}`,
        bordered && 'table-bordered',
        striped && 'table-striped',
        className,
      )}
    >
      {children}
    </table>
  ),
);

Table.displayName = 'Table';
