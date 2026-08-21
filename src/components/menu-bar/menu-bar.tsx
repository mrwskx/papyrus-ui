'use client';

import {
  autoUpdate,
  FloatingList,
  FloatingTree,
  useFloating,
  useInteractions,
  useRole,
  useTypeahead,
} from '@floating-ui/react';
import cn from 'classnames';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { HTMLAttributes, KeyboardEvent } from 'react';

import {
  getFirstItem,
  getLastItem,
  getNextItem,
  getPrevItem,
} from '../../utils/list-navigation';

import { MenuBarItem } from './menu-bar-item';
import { MenuBarSubmenu } from './menu-bar-submenu';
import { MenuBarContext } from './menu-bar.context';
import type { MenuBarContextType } from './menu-bar.context';
import type { MenuBarSize, MenuBarVariant } from './menu-bar.types';

export interface MenuBarProps extends HTMLAttributes<HTMLUListElement> {
  block?: boolean;
  collapsed?: boolean;
  size?: MenuBarSize;
  variant?: MenuBarVariant;
}

function MenuBarComponent({
  block = false,
  collapsed = false,
  size = 'md',
  variant = 'primary',
  children,
  ...props
}: MenuBarProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const labelsRef = useRef<string[]>([]);

  const { refs, context, floatingStyles } = useFloating<HTMLElement>({
    open: true,
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
  });

  const role = useRole(context, { role: 'menu' });

  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    onMatch: setActiveIndex,
    activeIndex,
  });

  const { getFloatingProps, getItemProps } = useInteractions([role, typeahead]);

  const handleMenuItemKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.click();
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();
        const item = getPrevItem(refs.floating, e.currentTarget);
        item?.focus();

        if (item?.getAttribute('aria-haspopup') === 'menu') {
          item.click();
        }
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();
        const item = getNextItem(refs.floating, e.currentTarget);
        item?.focus();

        if (item?.getAttribute('aria-haspopup') === 'menu') {
          item.click();
        }
      }
    },
    [refs.floating],
  );

  const menuCtx = useMemo<MenuBarContextType>(
    () => ({
      activeIndex,
      collapsed,
      context,
      elementsRef,
      floatingStyles,
      getFloatingProps,
      isOpen: true,
      isNested: false,
      labelsRef,
      refs,
      setActiveIndex,
      size,
      variant,
      getItemProps: (userProps = {}) => ({
        ...getItemProps(userProps),
        onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => {
          handleMenuItemKeyDown(e);
          userProps.onKeyDown?.(e);
        },
      }),
    }),
    [
      activeIndex,
      collapsed,
      context,
      floatingStyles,
      getFloatingProps,
      getItemProps,
      handleMenuItemKeyDown,
      refs,
      size,
      variant,
    ],
  );

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        e.target instanceof Node &&
        !refs.floating.current?.contains(e.target)
      ) {
        setActiveIndex(null);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/refs -- the ref object identity is the dependency; .current is never read here
  }, [refs.floating]);

  const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      e.stopPropagation();

      const item = getLastItem(refs.floating);

      item?.focus();

      if (item?.getAttribute('aria-haspopup') === 'menu') {
        item.click();
      }
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      e.stopPropagation();

      const item = getFirstItem(refs.floating);

      item?.focus();

      if (item?.getAttribute('aria-haspopup') === 'menu') {
        item.click();
      }
    }
  };

  return (
    <MenuBarContext.Provider value={menuCtx}>
      <FloatingTree>
        <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
          <ul
            // eslint-disable-next-line react-hooks/refs, @typescript-eslint/unbound-method -- refs.setFloating is a standalone setter callback, not a ref value or a `this`-bound method
            ref={refs.setFloating}
            className={cn(
              'inline-flex gap-1 focus:outline-none focus-visible:ring',
              block && 'w-full',
              props.className,
            )}
            {...getFloatingProps({
              role: 'menubar',
              tabIndex: activeIndex == null ? 0 : -1,
              onKeyDown: handleKeyDown,
            })}
            {...props}
          >
            {children}
          </ul>
        </FloatingList>
      </FloatingTree>
    </MenuBarContext.Provider>
  );
}

export const MenuBar = Object.assign(MenuBarComponent, {
  Submenu: MenuBarSubmenu,
  Item: MenuBarItem,
});
