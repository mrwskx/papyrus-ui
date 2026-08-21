import cn from 'classnames';
import type { ElementType } from 'react';

export type DividerDirection = 'horizontal' | 'vertical';

export interface DividerProps {
  as?: ElementType;
  direction?: DividerDirection;
  className?: string;
}

const directionClass: Record<DividerDirection, string> = {
  horizontal: 'w-full h-px',
  vertical: 'h-full w-px',
};

export function Divider({
  as: Element = 'div',
  direction = 'horizontal',
  className,
  ...props
}: DividerProps) {
  return (
    <Element
      {...props}
      className={cn(
        className?.includes('bg-') ? '' : 'bg-current',
        directionClass[direction],
        className,
      )}
    />
  );
}
