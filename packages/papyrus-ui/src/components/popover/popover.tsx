import {
  arrow as arrowFn,
  autoUpdate,
  flip,
  offset as offsetFn,
  shift,
  useHover,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useFocus,
} from '@floating-ui/react';
import type { OffsetOptions, Placement } from '@floating-ui/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { PopoverArrow as Arrow } from './popover-arrow';
import { PopoverContent as Content } from './popover-content';
import { PopoverTrigger as Trigger } from './popover-trigger';
import { PopoverContext } from './popover.context';
import type { PopoverContextType } from './popover.context';

declare type PopoverRole =
  'tooltip' | 'dialog' | 'alertdialog' | 'menu' | 'listbox' | 'grid' | 'tree';

export type PopoverTrigger = 'click' | 'focus' | 'hover';

export interface PopoverProps {
  arrowPadding?: number;
  children?: ReactNode;
  initialOpen?: boolean;
  offset?: OffsetOptions;
  open?: boolean;
  overflowPadding?: number;
  modal?: boolean;
  placement?: Placement;
  role?: PopoverRole;
  trigger?: PopoverTrigger | PopoverTrigger[];
  onOpenChange?: (open: boolean) => void;
}

function PopoverComponent({
  arrowPadding,
  initialOpen = false,
  offset,
  open,
  overflowPadding,
  modal = false,
  placement = 'bottom',
  role,
  trigger = 'click',
  onOpenChange,
  children,
}: PopoverProps) {
  const [openState, setOpenState] = useState(() => open ?? initialOpen);
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const isControlled = open !== undefined;
  const triggers = Array.isArray(trigger) ? trigger : [trigger];

  const { context, floatingStyles, refs } = useFloating({
    placement,
    open: openState,
    whileElementsMounted: autoUpdate,
    middleware: [
      arrowFn({
        element: arrowRef,
        padding: arrowPadding,
      }),
      flip({
        crossAxis: placement.includes('-'),
        fallbackAxisSideDirection: 'end',
        padding: overflowPadding,
      }),
      shift({ padding: overflowPadding }),
      offsetFn(offset),
    ],
    onOpenChange: (nextOpen: boolean) => {
      if (isControlled) {
        onOpenChange?.(nextOpen);
      } else {
        setOpenState(nextOpen);
      }
    },
  });

  const clickProps = useClick(context, {
    enabled: !isControlled && triggers.includes('click'),
  });

  const focusProps = useFocus(context, {
    enabled: !isControlled && triggers.includes('focus'),
  });

  const hoverProps = useHover(context, {
    move: false,
    enabled: !isControlled && triggers.includes('hover'),
  });

  const dismissProps = useDismiss(context);

  const roleProps = useRole(context, { role });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    clickProps,
    dismissProps,
    focusProps,
    hoverProps,
    roleProps,
  ]);

  const popoverCxt = useMemo<PopoverContextType>(
    () => ({
      arrowRef,
      context,
      floatingStyles,
      getReferenceProps,
      getFloatingProps,
      open: openState,
      modal,
      refs,
    }),
    [
      context,
      floatingStyles,
      getFloatingProps,
      getReferenceProps,
      modal,
      openState,
      refs,
    ],
  );

  useEffect(() => {
    if (open !== undefined) {
      setOpenState(open);
    }
  }, [open]);

  return (
    <PopoverContext.Provider value={popoverCxt}>
      {children}
    </PopoverContext.Provider>
  );
}

export const Popover = Object.assign(PopoverComponent, {
  Arrow,
  Content,
  Trigger,
});
