import cn from 'classnames';
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { HTMLAttributes, KeyboardEvent } from 'react';

import type { Maybe } from '../../types';
import { getFirstItem, getLastItem } from '../../utils/list-navigation';

import { MenuItem } from './menu-item';
import type { MenuItemProps } from './menu-item';
import { MenuContext } from './menu.context';
import type { MenuContextType } from './menu.context';
import type { MenuSize, MenuVariant } from './menu.types';
import { Submenu } from './submenu';

export interface MenuProps extends HTMLAttributes<HTMLUListElement> {
  collapsed?: boolean;
  size?: MenuSize;
  variant?: MenuVariant;
  onCollapsedChange?: (collapsed: boolean) => void;
}

function MenuComponent({
  collapsed = false,
  size = 'md',
  variant = 'primary',
  children,
  className,
  onCollapsedChange,
  onKeyDown,
  ...props
}: MenuProps) {
  const [activeIndex, setActiveIndex] = useState<Maybe<number>>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const menuCxt: MenuContextType = useMemo(
    () => ({
      activeIndex,
      collapsed,
      indent: 0,
      menuRef,
      size,
      variant,
      setActiveIndex,
      onCollapsedChange,
    }),
    [activeIndex, collapsed, onCollapsedChange, size, variant],
  );

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (e.target instanceof Node && !menuRef.current?.contains(e.target)) {
        setActiveIndex(null);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      const item = getLastItem(menuRef, true);
      item?.focus();
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      e.stopPropagation();
      const item = getFirstItem(menuRef, true);
      item?.focus();
    }

    onKeyDown?.(e);
  };

  return (
    <MenuContext.Provider value={menuCxt}>
      <ul
        {...props}
        ref={menuRef}
        className={cn(
          'flex flex-col gap-1 focus:outline-none focus-visible:ring',
          className,
        )}
        role="menu"
        tabIndex={activeIndex == null ? 0 : -1}
        onKeyDown={handleKeyDown}
      >
        {Children.map(children, (child, i) =>
          isValidElement<MenuItemProps>(child)
            ? cloneElement(child, { index: i })
            : null,
        )}
      </ul>
    </MenuContext.Provider>
  );
}

export const Menu = Object.assign(MenuComponent, {
  Submenu,
  Item: MenuItem,
});
