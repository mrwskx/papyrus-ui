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
  FloatingFocusManager,
  FloatingList,
  size as sizeFn,
  FloatingPortal,
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
  FocusEvent,
  KeyboardEvent,
  ReactElement,
} from 'react';
import { BiChevronDown, BiChevronRight } from 'react-icons/bi';
import { Transition } from 'react-transition-group';

import {
  getFirstItem,
  getLastItem,
  getNextItem,
  getPrevItem,
} from '../../../utils/list-navigation';
import { Listbox } from '../../listbox';
import { MenuButton } from '../../menu-button';
import { MenuBarContext } from '../menu-bar.context';
import type { MenuBarContextType } from '../menu-bar.context';

export interface SubMenuProps extends ButtonHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
  icon?: ReactElement;
  initialOpen?: boolean;
  label: string;
}

const ENTER_TIMEOUT = 200;

const TRANSITION_TIMEOUT = {
  appear: 0,
  enter: ENTER_TIMEOUT,
  exit: ENTER_TIMEOUT,
};

export const MenuBarSubmenu: FC<SubMenuProps> = ({
  icon,
  initialOpen = false,
  label,
  children,
  onFocus,
  onKeyDown,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const elementsRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const labelsRef = useRef<string[]>([]);
  const parent = useContext(MenuBarContext);
  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const item = useListItem();

  const { floatingStyles, refs, context } = useFloating<HTMLElement>({
    nodeId,
    open: isOpen,
    strategy: 'fixed',
    onOpenChange: setIsOpen,
    placement: parent.isNested ? 'right-start' : 'bottom-start',
    middleware: [
      offset({
        mainAxis: parent.isNested ? 9 : 4,
        alignmentAxis: parent.isNested ? -5 : -2,
      }),
      sizeFn({
        apply({ elements }) {
          const { width } = elements.reference.getBoundingClientRect();

          Object.assign(elements.floating.style, {
            minWidth: !parent.isNested ? `${width + 4}px` : undefined,
          });
        },
        padding: 4,
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
    keyboardHandlers: false,
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

      if (parent.isNested && e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
        (refs.reference.current as HTMLAnchorElement).focus();
      }

      if (!parent.isNested && e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);

        const item = getPrevItem(
          parent.refs.floating,
          refs.reference.current as HTMLAnchorElement,
        );

        item?.focus();

        if (item?.getAttribute('aria-haspopup') === 'menu') {
          item.click();
        }
      }

      if (
        !parent.isNested &&
        e.key === 'ArrowRight' &&
        !e.currentTarget.getAttribute('aria-haspopup')
      ) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);

        const item = getNextItem(
          parent.refs.floating,
          refs.reference.current as HTMLAnchorElement,
        );

        item?.focus();

        if (item?.getAttribute('aria-haspopup') === 'menu') {
          item.click();
        }
      }
    },
    [parent.isNested, parent.refs.floating, refs.floating, refs.reference],
  );

  const menuCtx = useMemo<MenuBarContextType>(
    () => ({
      activeIndex,
      collapsed: false,
      context,
      elementsRef,
      floatingStyles,
      getFloatingProps,
      isOpen,
      isNested: true,
      labelsRef,
      refs,
      setActiveIndex,
      size: parent.size,
      variant: 'secondary',
      getItemProps: (userProps = {}) => ({
        ...getItemProps({
          ...userProps,
          onKeyDown: (e: KeyboardEvent<HTMLAnchorElement>) => {
            handleMenuItemKeyDown(e);
            userProps.onKeyDown?.(e);
          },
        }),
      }),
    }),
    [
      activeIndex,
      context,
      floatingStyles,
      getFloatingProps,
      getItemProps,
      handleMenuItemKeyDown,
      isOpen,
      parent.size,
      refs,
    ],
  );

  const handleFocus = (e: FocusEvent<HTMLAnchorElement>) => {
    setActiveIndex(null);
    onFocus?.(e);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (
      e.key === 'Enter' ||
      e.key === ' ' ||
      (!parent.isNested && e.key === 'ArrowDown') ||
      (parent.isNested && e.key === 'ArrowRight')
    ) {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(true);

      requestAnimationFrame(() => {
        const item = getFirstItem(refs.floating);
        item?.focus();
      });
    }

    if (!parent.isNested && e.key === 'ArrowUp') {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(true);

      requestAnimationFrame(() => {
        const item = getLastItem(refs.floating);
        item?.focus();
      });
    }

    onKeyDown?.(e);
  };

  useEffect(() => {
    if (!tree) {
      return;
    }

    function handleTreeClick() {
      setIsOpen(false);
    }

    function handleSubMenuOpen(event: { nodeId: string; parentId: string }) {
      if (event.nodeId !== nodeId && event.parentId === parentId) {
        setIsOpen(false);
      }
    }

    tree.events.on('click', handleTreeClick);
    tree.events.on('menuopen', handleSubMenuOpen);

    return () => {
      tree.events.off('click', handleTreeClick);
      tree.events.off('menuopen', handleSubMenuOpen);
    };
  }, [tree, nodeId, parentId]);

  useEffect(() => {
    if (isOpen && tree) {
      tree.events.emit('menuopen', { parentId, nodeId });
    }
  }, [tree, isOpen, nodeId, parentId]);

  const isActive = parent.activeIndex === item.index;

  return (
    <FloatingNode id={nodeId}>
      <MenuButton
        ref={buttonRef}
        collapsed={parent.collapsed}
        direction={parent.isNested ? 'vertical' : 'horizontal'}
        endIcon={parent.isNested ? <BiChevronRight /> : <BiChevronDown />}
        role="menuitem"
        size={parent.isNested ? 'sm' : parent.size}
        startIcon={icon}
        tabIndex={isActive ? 0 : -1}
        variant={
          parent.isNested && parent.variant === 'primary'
            ? 'secondary'
            : parent.variant
        }
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

      <MenuBarContext.Provider value={menuCtx}>
        <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
          <Transition
            in={isOpen}
            mountOnEnter
            nodeRef={refs.floating}
            timeout={TRANSITION_TIMEOUT}
            unmountOnExit
          >
            {status => (
              <FloatingPortal>
                <FloatingFocusManager
                  context={context}
                  initialFocus={-1}
                  modal={false}
                >
                  <Listbox
                    ref={refs.setFloating}
                    className="max-h-80 max-w-xs z-10"
                    style={floatingStyles}
                    visible={status === 'entered'}
                    {...getFloatingProps()}
                  >
                    {children}
                  </Listbox>
                </FloatingFocusManager>
              </FloatingPortal>
            )}
          </Transition>
        </FloatingList>
      </MenuBarContext.Provider>
    </FloatingNode>
  );
};
