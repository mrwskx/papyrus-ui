import { forwardRef } from 'react';

import { MenuButton } from '../menu-button';
import type { MenuButtonProps } from '../menu-button';

export type OptionProps = Omit<
  MenuButtonProps,
  'as' | 'collapsed' | 'direction' | 'href' | 'size' | 'variant'
>;

export const Option = forwardRef<HTMLAnchorElement, OptionProps>(
  ({ children, ...props }, ref) => (
    <MenuButton ref={ref} role="option" variant="secondary" {...props}>
      {children}
    </MenuButton>
  ),
);

Option.displayName = 'Option';
