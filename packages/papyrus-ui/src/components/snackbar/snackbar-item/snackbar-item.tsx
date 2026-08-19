'use client';

import cn from 'classnames';
import { forwardRef, useCallback, useContext, useEffect, useRef } from 'react';
import type {
  ComponentType,
  HTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import type { IconBaseProps } from 'react-icons';
import {
  BiCheckCircle,
  BiError,
  BiErrorCircle,
  BiInfoCircle,
  BiX,
} from 'react-icons/bi';
import { Transition } from 'react-transition-group';

import { useTimeout } from '../../../utils/use-timeout';
import { Button } from '../../button';
import { Heading } from '../../heading';
import { Icon } from '../../icon';
import { IconButton } from '../../icon-button';
import { Text } from '../../text';
import { SnackbarContext } from '../snackbar.context';

export type SnackbarItemVariant =
  'primary' | 'secondary' | 'info' | 'danger' | 'warning' | 'success';

export interface SnackbarItemProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Label text for the action button.
   */
  actionLabel?: string;

  /**
   * Specifies the duration (in milliseconds) after which the toast automatically closes if set.
   */
  autoHideDuration?: number;

  /**
   * Secondary content of the toast component.
   */
  children?: ReactNode;

  /**
   * Aria label for close button.
   */
  dismissLabel?: string;

  /**
   * Represents the icon of the toast component.
   */
  icon?: ReactElement;

  /**
   * Primary content of the toast component.
   */
  message: string;

  /**
   * Determines the visual style or variant of the toast component.
   */
  variant?: SnackbarItemVariant;

  /**
   * Indicates whether the toast component is currently visible or not.
   */
  in?: boolean;

  /**
   * A callback function triggered on the action button click.
   */
  onActionClick?: () => void;

  /**
   * A callback function triggered when the toast is closed manually.
   */
  onDismiss?: () => void;

  /**
   * A callback function triggered when the toast is closed automatically after timeout.
   */
  onHide?: () => void;
}

const TRANSITION_TIMEOUT = {
  appear: 0,
  enter: 200,
  exit: 200,
};

const iconByVariant: Record<
  SnackbarItemVariant,
  ComponentType<IconBaseProps>
> = {
  primary: BiInfoCircle,
  secondary: BiInfoCircle,
  info: BiInfoCircle,
  danger: BiErrorCircle,
  warning: BiError,
  success: BiCheckCircle,
};

const rootVariantClasses = {
  primary: 'bg-primary-700',
  secondary: 'bg-black/80',
  info: 'bg-info-700',
  success: 'bg-success-700',
  warning: 'bg-warning-700',
  danger: 'bg-danger-700',
};

const rootPlacementClasses = {
  top: 'snackbar-item-top',
  'top-start': 'snackbar-item-top-start',
  'top-end': 'snackbar-item-top-end',
  bottom: 'snackbar-item-bottom',
  'bottom-start': 'snackbar-item-bottom-start',
  'bottom-end': 'snackbar-item-bottom-end',
};

const rootVisiblePlacementClasses = {
  top: 'snackbar-item-visible-top',
  'top-start': 'snackbar-item-visible-top-start',
  'top-end': 'snackbar-item-visible-top-end',
  bottom: 'snackbar-item-visible-bottom',
  'bottom-start': 'snackbar-item-visible-bottom-start',
  'bottom-end': 'snackbar-item-visible-bottom-end',
};

export const SnackbarItem = forwardRef<
  Transition<HTMLElement>,
  SnackbarItemProps
>(
  (
    {
      actionLabel,
      autoHideDuration,
      children,
      className,
      dismissLabel = 'Dismiss',
      icon,
      in: visible = true,
      message,
      role = 'alert',
      variant = 'primary',
      onActionClick,
      onDismiss,
      onHide,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref,
  ) => {
    const { placement } = useContext(SnackbarContext);
    const { setTimeout, clearTimeout } = useTimeout();
    const nodeRef = useRef<HTMLDivElement>(null);

    const defferAutoHide = useCallback(() => {
      if (autoHideDuration) {
        setTimeout(() => {
          onHide?.();
        }, autoHideDuration);
      }
    }, [autoHideDuration, onHide, setTimeout]);

    useEffect(() => {
      defferAutoHide();
    }, [defferAutoHide]);

    const IconComponent = iconByVariant[variant];

    const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
      clearTimeout();
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
      defferAutoHide();
      onMouseLeave?.(e);
    };

    return (
      <Transition
        {...props}
        ref={ref}
        in={visible}
        mountOnEnter
        nodeRef={nodeRef}
        timeout={TRANSITION_TIMEOUT}
        unmountOnExit
      >
        {(status, childProps) => (
          <div
            {...childProps}
            ref={nodeRef}
            className={cn(
              'snackbar-item',
              rootPlacementClasses[placement],
              status === 'entered' && rootVisiblePlacementClasses[placement],
              rootVariantClasses[variant],
              className,
            )}
            role={role}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center space-x-3">
              {icon ?? (
                <Icon className="text-3xl" color="white">
                  <IconComponent />
                </Icon>
              )}

              <div className="flex-1 overflow-hidden">
                {children ? (
                  <>
                    <Heading as="div" className="mb-1 truncate" level={5}>
                      {message}
                    </Heading>
                    <Text as="div" className="mt-1 truncate" size="sm">
                      {children}
                    </Text>
                  </>
                ) : (
                  <Text as="div" className="truncate">
                    {message}
                  </Text>
                )}
              </div>

              {actionLabel && onActionClick && (
                <Button
                  data-testid="action"
                  rounded
                  size="sm"
                  variant="ghost"
                  onClick={onActionClick}
                >
                  {actionLabel}
                </Button>
              )}

              {onDismiss && (
                <IconButton
                  aria-label={dismissLabel}
                  rounded
                  size="sm"
                  variant="ghost"
                  onClick={onDismiss}
                >
                  <BiX />
                </IconButton>
              )}
            </div>
          </div>
        )}
      </Transition>
    );
  },
);

SnackbarItem.displayName = 'SnackbarItem';
