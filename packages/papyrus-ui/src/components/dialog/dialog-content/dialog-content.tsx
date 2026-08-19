'use client';

import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
} from '@floating-ui/react';
import cn from 'classnames';
import { useContext } from 'react';
import type { FC, HTMLAttributes, ReactNode } from 'react';
import { Transition } from 'react-transition-group';

import { ANIMATION_DURATION } from '../dialog.constants';
import { DialogContext } from '../dialog.context';

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

const TRANSITION_TIMEOUT = {
  appear: 0,
  enter: 0,
  exit: ANIMATION_DURATION,
};

export const DialogContent: FC<DialogContentProps> = ({
  className,
  children,
  ...props
}) => {
  const {
    context,
    getFloatingProps,
    isOpen,
    refs,
    size,
    labelId,
    descriptionId,
  } = useContext(DialogContext);

  return (
    <Transition
      in={isOpen}
      mountOnEnter
      nodeRef={refs.floating}
      timeout={TRANSITION_TIMEOUT}
      unmountOnExit
    >
      {status => (
        <FloatingPortal>
          <FloatingOverlay
            className={cn(
              'fixed inset-0 flex flex-col items-center w-full h-full bg-black/50 opacity-0 transition z-30',
              size === 'sm' && 'justify-center p-4 overflow-y-auto',
              size === 'md' &&
                'justify-center p-0 sm:p-4 overflow-y-hidden sm:overflow-y-auto',
              size === 'lg' && 'justify-center p-0 sm:p-4 overflow-y-hidden',
              size === 'xl' &&
                'justify-start px-0 lg:px-12 py-0 lg:py-4 overflow-y-hidden',
              'fade',
              status === 'entered' && 'opacity-100',
              className,
            )}
            data-testid="overlay"
            lockScroll
          >
            <FloatingFocusManager context={context}>
              <div
                ref={node => {
                  refs.setFloating(node);
                }}
                aria-describedby={descriptionId}
                aria-labelledby={labelId}
                className={cn(
                  'bg-white flex flex-col w-full shadow-md overflow-hidden',
                  size === 'sm' &&
                    'relative flex-none max-w-sm max-h-full rounded-xl ',
                  size === 'md' &&
                    'absolute sm:relative inset-0 flex-none sm:max-w-lg h-full sm:h-auto max-h-full sm:rounded-xl',
                  size === 'lg' &&
                    'absolute sm:relative inset-0 flex-none sm:max-w-4xl h-full sm:h-auto max-h-full sm:rounded-xl',
                  size === 'xl' &&
                    'absolute lg:relative inset-0 flex-1 min-h-full h-full lg:rounded-xl',
                )}
                {...getFloatingProps(props)}
              >
                {children}
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </Transition>
  );
};
