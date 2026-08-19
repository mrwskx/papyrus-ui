'use client';

import { useId } from '@floating-ui/react';
import cn from 'classnames';
import { useContext, useLayoutEffect } from 'react';
import type { FC, HTMLAttributes } from 'react';

import { Heading } from '../../heading';
import { DialogContext } from '../dialog.context';

export type DialogTitleProps = Omit<
  HTMLAttributes<HTMLElement>,
  'color' | 'size'
>;

export const DialogTitle: FC<DialogTitleProps> = ({
  children,
  className,
  ...props
}: DialogTitleProps) => {
  const id = useId();
  const { setLabelId } = useContext(DialogContext);

  useLayoutEffect(() => {
    setLabelId(id);

    return () => {
      setLabelId(undefined);
    };
  }, [id, setLabelId]);

  return (
    <Heading
      as="div"
      className={cn('flex-1 text-neutral-950 truncate', className)}
      id={id}
      level={5}
      {...props}
    >
      {children}
    </Heading>
  );
};
