import { forwardRef } from 'react';
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';

import type { ChangeHandler } from '../../types';
import { useId } from '../../utils/use-id';
import { InputGroup } from '../input-group';

export interface RangeProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> {
  /**
   * The default value of the uncontrolled input.
   * This is used when the component is uncontrolled and does not have a `value` prop.
   */
  defaultValue?: number;

  /**
   * Optional description text for the input field, providing additional context or instructions for the user.
   * Appears above the input field to guide the user on the expected input.
   */
  description?: ReactNode;

  /**
   * If `true`, the input element is disabled and can't be interacted with.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * If `true`, the input element will have a validation error style.
   *
   * @default false
   */
  invalid?: boolean;

  /**
   * The label text for the input field. It is essential for accessibility to link the label with the input.
   */
  label?: ReactNode;

  /**
   * Message to display under the input, such as validation errors or hints.
   */
  message?: ReactNode;

  /**
   * The minimum value the range input can have. This ensures that the user cannot select a value lower than the specified `min` value.
   */
  min?: number;

  /**
   * The maximum value the range input can have. This ensures that the user cannot select a value higher than the specified `max` value.
   */
  max?: number;

  /**
   * The current value of the input. This prop is used to control the value of the input.
   * The value should be within the specified `min` and `max` range. Use `onChange` to capture changes to the value.
   */
  value?: number;

  /**
   * Callback fired when the value changes. Receives the new value and the raw event.
   */
  onChange?: ChangeHandler<number, ChangeEvent<HTMLInputElement>>;
}

export const Range = forwardRef<HTMLInputElement, RangeProps>(
  (
    { className, description, id, invalid, label, message, onChange, ...props },
    ref,
  ) => {
    const inputId = useId(id);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const next = Number(e.target.value);
      onChange?.(next, e);
    };

    return (
      <InputGroup
        className={className}
        description={description}
        htmlFor={inputId}
        invalid={invalid}
        label={label}
        message={message}
      >
        <input
          ref={ref}
          className='range-input'
          type='range'
          {...props}
          onChange={handleChange}
        />
      </InputGroup>
    );
  },
);

Range.displayName = 'Range';
