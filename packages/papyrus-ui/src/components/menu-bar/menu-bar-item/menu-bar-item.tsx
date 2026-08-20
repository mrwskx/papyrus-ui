'use client';

import { useFloatingTree, useListItem } from '@floating-ui/react';
import { useContext } from 'react';
import type {
  AnchorHTMLAttributes,
  ElementType,
  FocusEvent,
  MouseEvent,
  ReactElement,
} from 'react';

import { MenuButton } from '../../menu-button';
import { MenuBarContext } from '../menu-bar.context';

export interface MenuBarItemProps extends Omit<
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

export function MenuBarItem({
  disabled,
  description,
  startIcon,
  endIcon,
  onClick,
  onFocus,
  children,
  ...props
}: MenuBarItemProps) {
  const {
    activeIndex,
    collapsed,
    getItemProps,
    isNested,
    setActiveIndex,
    size,
    variant,
  } = useContext(MenuBarContext);

  const item = useListItem({ label: disabled ? null : children });
  const tree = useFloatingTree();
  // eslint-disable-next-line react-hooks/refs -- useListItem returns index as a plain number, not a ref
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
      // eslint-disable-next-line react-hooks/refs -- useListItem returns ref as a callback ref; forwarding it is its purpose
      ref={item.ref}
      collapsed={collapsed}
      description={description}
      direction={isNested ? 'vertical' : 'horizontal'}
      endIcon={endIcon}
      size={isNested ? 'sm' : size}
      startIcon={startIcon}
      tabIndex={isActive ? 0 : -1}
      variant={variant}
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
}
