'use client';

import { useContext, useRef } from 'react';
import type {
  AnchorHTMLAttributes,
  ElementType,
  FocusEvent,
  KeyboardEvent,
  ReactElement,
} from 'react';

import { getNextItem, getPrevItem } from '../../../utils/list-navigation';
import { MenuButton } from '../../menu-button';
import { MenuContext } from '../menu.context';

export interface MenuItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: ElementType;
  danger?: boolean;
  description?: string;
  disabled?: boolean;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  index?: number;
  selected?: boolean;
}

export function MenuItem({
  disabled,
  description,
  startIcon,
  endIcon,
  index,
  onFocus,
  onKeyDown,
  children,
  ...props
}: MenuItemProps) {
  const {
    activeIndex,
    collapsed,
    indent,
    menuRef,
    setActiveIndex,
    size,
    variant,
  } = useContext(MenuContext);

  const buttonRef = useRef<HTMLAnchorElement>(null);
  const isActive = index === activeIndex;

  const handleFocus = (e: FocusEvent<HTMLAnchorElement>) => {
    setActiveIndex(index);
    onFocus?.(e);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.click();
    }

    if (!menuRef.current) {
      onKeyDown?.(e);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      const item = getPrevItem(menuRef, e.currentTarget, true);
      item?.focus();
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      e.stopPropagation();
      const item = getNextItem(menuRef, e.currentTarget, true);
      item?.focus();
    }

    onKeyDown?.(e);
  };

  return (
    <MenuButton
      {...props}
      ref={buttonRef}
      collapsed={collapsed}
      description={description}
      disabled={disabled}
      endIcon={endIcon}
      indent={indent}
      size={size}
      startIcon={startIcon}
      tabIndex={isActive ? 0 : -1}
      variant={variant}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
    >
      {children}
    </MenuButton>
  );
}
