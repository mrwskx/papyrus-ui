'use client';

import { useFloatingTree, useListItem } from '@floating-ui/react';
import { useContext } from 'react';
import type {
  AnchorHTMLAttributes,
  ElementType,
  FC,
  FocusEvent,
  MouseEvent,
  ReactElement,
} from 'react';

import { MenuButton } from '../../menu-button';
import { DropdownMenuContext } from '../dropdown-menu.context';

export interface DropdownMenuItemProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'children'
> {
  as?: ElementType;
  danger?: boolean;
  description?: string;
  disabled?: boolean;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  selected?: boolean;
  children: string;
}

export const DropdownMenuItem: FC<DropdownMenuItemProps> = ({
  disabled,
  description,
  startIcon,
  endIcon,
  onClick,
  onFocus,
  children,
  ...props
}) => {
  const { activeIndex, getItemProps, setActiveIndex } =
    useContext(DropdownMenuContext);

  const item = useListItem({ label: disabled ? null : children });
  const tree = useFloatingTree();
  const isActive = item.index === activeIndex;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    tree?.events.emit('click');
    onClick?.(e);
  };

  const handleFocus = (e: FocusEvent<HTMLAnchorElement>) => {
    setActiveIndex(item.index);
    onFocus?.(e);
  };

  return (
    <MenuButton
      ref={item.ref}
      description={description}
      endIcon={endIcon}
      size="sm"
      startIcon={startIcon}
      tabIndex={isActive ? 0 : -1}
      variant="secondary"
      {...getItemProps({
        disabled,
        onClick: handleClick,
        onFocus: handleFocus,
      })}
      {...props}
    >
      {children}
    </MenuButton>
  );
};
