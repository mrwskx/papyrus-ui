import cn from 'classnames';
import { forwardRef } from 'react';
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';

import type { ChangeHandler } from '../../types';
import { Text } from '../text';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  value: string;
  onChange?: ChangeHandler<boolean, ChangeEvent<HTMLInputElement>>;
  children?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, disabled, readOnly, children, onChange, ...props }, ref) => (
    <label
      className={cn(
        'inline-flex items-baseline gap-2',
        disabled || readOnly ? 'cursor-default' : 'pointer',
        className,
      )}
    >
      <span className={children ? 'py-1' : ''}>
        <input
          {...props}
          ref={ref}
          className='checkbox-input'
          disabled={disabled}
          readOnly={readOnly}
          type='checkbox'
          onChange={e => onChange?.(e.target.checked, e)}
        />
      </span>
      {children && (
        <Text as='span' className='flex-1'>
          {children}
        </Text>
      )}
    </label>
  ),
);

Checkbox.displayName = 'Checkbox';
