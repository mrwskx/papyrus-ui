'use client';

import { forwardRef, isValidElement } from 'react';
import type {
  ChangeEvent,
  ReactElement,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';
import type { IconBaseProps } from 'react-icons';

import type { ChangeHandler } from '../../types';
import { useId } from '../../utils/use-id';
import { InputAction } from '../input-action';
import { InputBox } from '../input-box';
import type { InputBoxSize } from '../input-box';
import { InputGroup } from '../input-group';

export interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange'
> {
  /**
   * The default value of the uncontrolled input.
   * This is used when the component is uncontrolled and does not have a `value` prop.
   */
  defaultValue?: string;

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
   * Placeholder text to display in input element.
   */
  placeholder?: string;

  /**
   * If `true`, the input element is read-only and can't be interacted with.
   */
  readOnly?: boolean;

  /**
   * The size of the autocomplete component.
   */
  size?: InputBoxSize;

  /**
   * icon to display at the start of the input element.
   */
  startIcon?: ReactElement;

  /**
   * icon to display at the end of the input element.
   */
  endIcon?: ReactElement;

  /**
   * The current value of the textarea. This prop is used to control the value of the textarea.
   * Use `onChange` to capture changes to the value.
   */
  value?: string;

  /**
   * Callback fired when the value changes. Receives the new value and the raw event.
   */
  onChange?: ChangeHandler<string, ChangeEvent<HTMLTextAreaElement>>;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      defaultValue,
      description,
      disabled,
      endIcon,
      id,
      invalid,
      label,
      message,
      readOnly,
      size,
      startIcon,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const inputId = useId(id);
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e.target.value, e);
    };

    return (
      <InputGroup
        description={description}
        htmlFor={inputId}
        invalid={invalid}
        label={label}
        message={message}
      >
        <InputBox disabled={disabled} invalid={invalid} size={size}>
          {isValidElement<IconBaseProps>(startIcon) && (
            <InputAction className='me-1'>{startIcon}</InputAction>
          )}

          <textarea
            {...props}
            ref={ref}
            className='textarea-base'
            defaultValue={defaultValue}
            disabled={disabled}
            readOnly={readOnly}
            value={value}
            onChange={handleChange}
          />

          {isValidElement<IconBaseProps>(endIcon) && (
            <InputAction className='ms-1'>{endIcon}</InputAction>
          )}
        </InputBox>
      </InputGroup>
    );
  },
);

Textarea.displayName = 'Textarea';
