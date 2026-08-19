'use client';

import {
  autoUpdate,
  FloatingNode,
  flip,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListItem,
  useRole,
  useTypeahead,
  useMergeRefs,
} from '@floating-ui/react';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  ButtonHTMLAttributes,
  FC,
  KeyboardEvent,
  ReactElement,
} from 'react';
import { BiChevronRight } from 'react-icons/bi';

import {
  getFirstItem,
  getNextItem,
  getPrevItem,
} from '../../../utils/list-navigation';
import { MenuButton } from '../../menu-button';
import { DropdownMenuContent } from '../dropdown-menu-content';
import { DropdownMenuContext } from '../dropdown-menu.context';
import type { DropdownMenuContextType } from '../dropdown-menu.context';

export interface DropdownSubmenuProps extends ButtonHTMLAttributes<HTMLAnchorElement> {
  icon?: ReactElement;
  initialOpen?: boolean;
  label: string;
}

export const DropdownSubmenu: FC<DropdownSubmenuProps> = ({
  icon,
  initialOpen = false,
  label,
  onKeyDown,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const elementsRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const labelsRef = useRef<string[]>([]);
  const parent = useContext(DropdownMenuContext);
  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const item = useListItem();

  const { floatingStyles, refs, context } = useFloating<HTMLElement>({
    nodeId,
    open: isOpen,
    strategy: 'fixed',
    onOpenChange: setIsOpen,
    placement: 'right-start',
    middleware: [
      offset({
        mainAxis: 9,
        alignmentAxis: -5,
      }),
      flip({ padding: 4 }),
      shift({ padding: 4 }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const buttonRef = useMergeRefs([refs.setReference, item.ref]);

  const click = useClick(context, {
    event: 'mousedown',
    toggle: false,
    ignoreMouse: true,
    keyboardHandlers: true,
  });

  const hover = useHover(context, {
    handleClose: safePolygon({ blockPointerEvents: true }),
  });

  const dismiss = useDismiss(context);

  const role = useRole(context, { role: 'menu' });

  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    onMatch: setActiveIndex,
    activeIndex,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [hover, click, role, dismiss, typeahead],
  );

  const handleMenuItemKeyDown = useCallback(
    (e: KeyboardEvent<HTMLAnchorElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.click();
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopPropagation();
        const item = getPrevItem(refs.floating, e.currentTarget);
        item?.focus();
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        e.stopPropagation();
        const item = getNextItem(refs.floating, e.currentTarget);
        item?.focus();
      }

      if (!refs.reference.current) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
        (refs.reference.current as HTMLAnchorElement).focus();
      }
    },
    [refs.floating, refs.reference],
  );

  const menuCtx = useMemo<DropdownMenuContextType>(
    () => ({
      activeIndex,
      context,
      elementsRef,
      floatingStyles,
      getFloatingProps,
      getReferenceProps,
      isOpen,
      labelsRef,
      refs,
      setActiveIndex,
      getItemProps: (userProps = {}) => ({
        ...getItemProps(userProps),
        onKeyDown: (e: KeyboardEvent<HTMLAnchorElement>) => {
          handleMenuItemKeyDown(e);
          userProps.onKeyDown?.(e);
        },
      }),
    }),
    [
      activeIndex,
      context,
      floatingStyles,
      getFloatingProps,
      getItemProps,
      getReferenceProps,
      handleMenuItemKeyDown,
      isOpen,
      refs,
    ],
  );

  useEffect(() => {
    if (!tree) {
      return;
    }

    function handleSubMenuOpen(event: { nodeId: string; parentId: string }) {
      if (event.nodeId !== nodeId && event.parentId === parentId) {
        setIsOpen(false);
      }
    }

    tree.events.on('menuopen', handleSubMenuOpen);

    return () => {
      tree.events.off('menuopen', handleSubMenuOpen);
    };
  }, [tree, nodeId, parentId]);

  useEffect(() => {
    if (isOpen && tree) {
      tree.events.emit('menuopen', { parentId, nodeId });
    }
  }, [tree, isOpen, nodeId, parentId]);

  const isActive = parent.activeIndex === item.index;

  const handleFocus = () => {
    setActiveIndex(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(true);

      requestAnimationFrame(() => {
        const item = getFirstItem(refs.floating);
        item?.focus();
      });
    }

    onKeyDown?.(e);
  };

  return (
    <FloatingNode id={nodeId}>
      <MenuButton
        ref={buttonRef}
        endIcon={<BiChevronRight />}
        role="menuitem"
        size="sm"
        startIcon={icon}
        tabIndex={isActive ? 0 : -1}
        variant="secondary"
        {...getReferenceProps(
          parent.getItemProps({
            onFocus: handleFocus,
            onKeyDown: handleKeyDown,
          }),
        )}
        {...props}
      >
        {label}
      </MenuButton>

      <DropdownMenuContext.Provider value={menuCtx}>
        <DropdownMenuContent initialFocus={-1} returnFocus={false}>
          {children}
        </DropdownMenuContent>
      </DropdownMenuContext.Provider>
    </FloatingNode>
  );
};
