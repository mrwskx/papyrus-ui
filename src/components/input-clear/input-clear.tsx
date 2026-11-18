import type { HTMLAttributes } from 'react';
import { BiX } from 'react-icons/bi';

import { Icon } from '../icon';

export interface InputClearProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'children' | 'onMouseDown'
> {
  /**
   * Accessible name of the clear action.
   */
  label: string;
  /**
   * Called when the clear action is pressed.
   */
  onClear: () => void;
}

export function InputClear({ label, onClear, ...props }: InputClearProps) {
  return (
    <Icon
      {...props}
      aria-label={label}
      className="text-neutral-950 cursor-pointer hover:opacity-60"
      role="button"
      tabIndex={-1}
      // Mouse down, not click, so preventDefault keeps focus in the input.
      onMouseDown={e => {
        e.preventDefault();
        e.stopPropagation();
        onClear();
      }}
    >
      <BiX />
    </Icon>
  );
}
