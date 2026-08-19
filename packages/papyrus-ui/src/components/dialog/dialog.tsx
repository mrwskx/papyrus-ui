'use client';

import {
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { useTimeout } from '../../utils/use-timeout';

import { DialogBody } from './dialog-body';
import { DialogClose } from './dialog-close';
import { DialogContent } from './dialog-content';
import { DialogDescription } from './dialog-description';
import { DialogFooter } from './dialog-footer';
import { DialogHeader } from './dialog-header';
import { DialogTitle } from './dialog-title';
import { DialogTrigger } from './dialog-trigger';
import { ANIMATION_DURATION } from './dialog.constants';
import { DialogContext } from './dialog.context';
import type { DialogContextType } from './dialog.context';
import type { DialogSize } from './dialog.types';

export type DialogRole = 'dialog' | 'alertdialog';

export interface DialogProps {
  /**
   * If `true`, the dialog will close when the Escape key is pressed.
   *
   * @default true
   */
  closeOnEscClick?: boolean;

  /**
   * If `true`, the dialog will close when a click occurs outside the dialog content.
   *
   * @default true
   */
  closeOnOutsideClick?: boolean;

  /**
   * If `true`, the dialog will be open, otherwise, it will be closed.
   *
   * @default false
   */
  isOpen?: boolean;

  /**
   * Defines the role of the dialog. It can either be a regular dialog (`'dialog'`) or an alert dialog (`'alertdialog'`).
   * - `'dialog'`: Regular dialog
   * - `'alertdialog'`: Used for dialogs that require immediate user interaction.
   *
   * @default 'dialog'
   */
  role?: DialogRole;

  /**
   * Defines the size of the dialog. It could be small, medium, large, or extra large adjusting the overall dimensions of the dialog.
   *
   * @default 'md'
   */
  size?: DialogSize;

  /**
   * Callback function that is triggered when the dialog is closed.
   * This function is typically used to perform cleanup or trigger additional actions after the dialog is closed.
   */
  onClose?: () => void;

  /**
   * Callback function that is triggered after the dialog has fully closed.
   * This can be used to perform any actions or state changes after the dialog has been closed.
   */
  onAfterClose?: () => void;

  /**
   * The content of the dialog. The valid children for an uncontrolled dialog are `Dialog.Trigger` and `Dialog.Content`.
   * For a controlled dialog, only `Dialog.Content` should be provided.
   */
  children: ReactNode;
}

function DialogComponent({
  closeOnEscClick = true,
  closeOnOutsideClick = true,
  isOpen,
  role: roleProp = 'dialog',
  size = 'md',
  onClose,
  onAfterClose,
  children,
}: DialogProps) {
  const { setTimeout, clearTimeout } = useTimeout();
  // Set initial isOpen state as false to have an animation on first isOpen
  const [isOpenState, setIsOpenState] = useState(false);
  const [labelId, setLabelId] = useState<string | undefined>();
  const [descriptionId, setDescriptionId] = useState<string | undefined>();

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      setIsOpenState(nextOpen);

      if (!nextOpen && onClose) {
        onClose();
      }
    },
    [onClose],
  );

  const { refs, context } = useFloating({
    open: isOpenState,
    onOpenChange: setOpen,
  });

  const click = useClick(context, {
    enabled: isOpen === undefined,
  });

  const dismiss = useDismiss(context, {
    escapeKey: closeOnEscClick,
    outsidePress: closeOnOutsideClick,
    outsidePressEvent: 'mousedown',
  });

  const role = useRole(context, { role: roleProp });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const dialogCxt = useMemo<DialogContextType>(
    () => ({
      context,
      descriptionId,
      isOpen: isOpenState,
      labelId,
      refs,
      size,
      close,
      getFloatingProps,
      getReferenceProps,
      setDescriptionId,
      setLabelId,
    }),
    [
      context,
      descriptionId,
      isOpenState,
      labelId,
      refs,
      size,
      close,
      getFloatingProps,
      getReferenceProps,
    ],
  );

  useEffect(() => {
    if (isOpen !== undefined) {
      setIsOpenState(isOpen);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpenState) {
      setTimeout(() => {
        onAfterClose?.();
      }, ANIMATION_DURATION);
    }

    return () => {
      clearTimeout();
    };
  }, [clearTimeout, onAfterClose, isOpen, isOpenState, setTimeout]);

  return (
    <DialogContext.Provider value={dialogCxt}>
      {children}
    </DialogContext.Provider>
  );
}

export const Dialog = Object.assign(DialogComponent, {
  Content: DialogContent,
  Close: DialogClose,
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
  Title: DialogTitle,
  Trigger: DialogTrigger,
  Description: DialogDescription,
});
