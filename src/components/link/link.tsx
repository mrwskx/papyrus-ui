import cn from 'classnames';
import { forwardRef } from 'react';
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
} from 'react';

export interface LinkProps
  extends
    Omit<ButtonHTMLAttributes<HTMLElement>, 'type' | 'color'>,
    Omit<AnchorHTMLAttributes<HTMLElement>, 'color'> {
  as?: ElementType;
}

export const Link = forwardRef<HTMLElement, LinkProps>(
  (
    { as: Element = 'a', type, disabled, className, children, ...props },
    ref,
  ) => (
    <Element
      ref={ref}
      className={cn(
        !disabled
          ? 'text-primary-600 transition-colors cursor-pointer hover:text-primary-400'
          : 'text-neutral-950 opacity-disabled',
        className,
      )}
      disabled={disabled}
      type={Element === 'button' && type == null ? 'button' : type}
      {...props}
    >
      {children}
    </Element>
  ),
);

Link.displayName = 'Link';
