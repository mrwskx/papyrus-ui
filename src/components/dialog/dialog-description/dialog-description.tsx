'use client';

import { useId } from '@floating-ui/react';
import { useContext, useLayoutEffect } from 'react';

import { Text } from '../../text';
import type { TextProps } from '../../text';
import { DialogContext } from '../dialog.context';

export type DialogDescriptionProps = TextProps;

export function DialogDescription({
  children,
  ...props
}: DialogDescriptionProps) {
  const id = useId();
  const { setDescriptionId } = useContext(DialogContext);

  useLayoutEffect(() => {
    setDescriptionId(id);

    return () => {
      setDescriptionId(undefined);
    };
  }, [id, setDescriptionId]);

  return (
    <Text id={id} {...props}>
      {children}
    </Text>
  );
}
