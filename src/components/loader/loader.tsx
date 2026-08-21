import cn from 'classnames';
import { BiLoaderAlt } from 'react-icons/bi';

import { Icon } from '../icon';
import type { IconProps } from '../icon';

export type LoaderProps = Omit<IconProps, 'children'>;

export function Loader({ className, ...props }: LoaderProps) {
  return (
    <Icon className={cn('animate-spin animate-slow', className)} {...props}>
      <BiLoaderAlt />
    </Icon>
  );
}
