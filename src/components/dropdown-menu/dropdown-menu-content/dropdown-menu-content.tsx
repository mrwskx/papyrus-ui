'use client';

import {
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
} from '@floating-ui/react';
import cn from 'classnames';
import { useContext } from 'react';
import type { HTMLAttributes } from 'react';
import { Transition } from 'react-transition-group';

import { getAncestorThemeScope } from '../../../utils/get-ancestor-theme-scope';
import { Listbox } from '../../listbox';
import { DropdownMenuContext } from '../dropdown-menu.context';

export interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  initialFocus?: number;
  returnFocus?: boolean;
}

const TRANSITION_TIMEOUT = {
  appear: 0,
  enter: 200,
  exit: 200,
};

export function DropdownMenuContent({
  children,
  className,
  initialFocus = 0,
  returnFocus = true,
  style,
  ...props
}: DropdownMenuContentProps) {
  const {
    context,
    elementsRef,
    floatingStyles,
    getFloatingProps,
    isOpen,
    labelsRef,
    refs,
  } = useContext(DropdownMenuContext);

  const themeScope = getAncestorThemeScope(refs.reference.current);

  return (
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
              initialFocus={initialFocus}
              modal={false}
              returnFocus={returnFocus}
            >
              <Listbox
                ref={node => {
                  refs.setFloating(node);
                }}
                className={cn(themeScope, 'max-h-80 max-w-xs', className)}
                style={floatingStyles}
                visible={status === 'entered'}
                {...getFloatingProps(props)}
              >
                {children}
              </Listbox>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </Transition>
    </FloatingList>
  );
}
