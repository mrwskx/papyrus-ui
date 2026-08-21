import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import cn from 'classnames';
import { forwardRef, useContext } from 'react';
import type { HTMLAttributes } from 'react';
import { Transition } from 'react-transition-group';

import { useMergeRefs } from '../../../utils/use-merge-refs';
import { PopoverContext } from '../popover.context';

export type PopoverContentProps = HTMLAttributes<HTMLDivElement>;

const TRANSITION_TIMEOUT = {
  appear: 0,
  enter: 0,
  exit: 200,
};

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, style, children, ...props }, ref) => {
    const { context, floatingStyles, modal, open, refs, getFloatingProps } =
      useContext(PopoverContext);

    const meredRef = useMergeRefs(ref, node => {
      refs.setFloating(node);
    });

    return (
      <Transition
        in={open}
        mountOnEnter
        nodeRef={refs.floating}
        timeout={TRANSITION_TIMEOUT}
        unmountOnExit
      >
        {status => (
          <FloatingPortal>
            <FloatingFocusManager context={context} modal={modal}>
              <div
                ref={meredRef}
                className={cn(
                  'z-40 opacity-0 transition-opacity',
                  status === 'entered' && 'opacity-100',
                  className,
                )}
                style={{
                  ...floatingStyles,
                  ...style,
                }}
                {...getFloatingProps(props)}
              >
                {children}
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </Transition>
    );
  },
);

PopoverContent.displayName = 'PopoverContent';
