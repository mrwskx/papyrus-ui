'use client';

import { useContext } from 'react';
import type { MouseEvent, ComponentType } from 'react';
import { BiX } from 'react-icons/bi';

import type { ButtonProps } from '../../button';
import { IconButton } from '../../icon-button';
import { DialogContext } from '../dialog.context';

export interface DialogCloseProps extends Omit<ButtonProps, 'as' | 'href'> {
  as?: ComponentType<ButtonProps>;
}

export function DialogClose({
  as: Element,
  onClick,
  children,
  ...props
}: DialogCloseProps) {
  const { close } = useContext(DialogContext);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    onClick?.(e);
    close();
  };

  if (Element) {
    return (
      <Element {...props} onClick={handleClick}>
        {children}
      </Element>
    );
  }

  return (
    <IconButton
      {...props}
      rounded
      size="sm"
      variant="plain"
      onClick={handleClick}
    >
      <BiX />
    </IconButton>
  );
}
