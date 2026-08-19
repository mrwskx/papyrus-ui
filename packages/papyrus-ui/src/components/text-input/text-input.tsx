'use client';

import { forwardRef, isValidElement, useEffect, useRef, useState } from 'react';
import type {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import type { IconBaseProps } from 'react-icons';
import { BiX } from 'react-icons/bi';

import type { ChangeHandler } from '../../types';
import { useId } from '../../utils/use-id';
import { useMergeRefs } from '../../utils/use-merge-refs';
import { Icon } from '../icon';
import { InputAction } from '../input-action';
import { InputBox } from '../input-box';
import type { InputBoxSize } from '../input-box';
import { InputGroup } from '../input-group';

export interface TextInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onChange'
> {
  /**
   * If `true`, the clear button will be displayed if the input's value is not empty.
   *
   * @default false
   */
  clearable?: boolean;

  /**
   * Aria label for clear button.
   */
  clearLabel?: string;

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
   *
   * @default false
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
   * The current value of the input. This prop is used to control the value of the input.
   * Use `onChange` to capture changes to the value.
   */
  value?: string;

  /**
   * Callback fired when the value changes. Receives the new value and the raw event.
   */
  onChange?: ChangeHandler<string, ChangeEvent<HTMLInputElement>>;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      defaultValue,
      description,
      disabled,
      clearable,
      clearLabel = 'Clear',
      id,
      invalid,
      label,
      message,
      size,
      startIcon,
      endIcon,
      readOnly,
      value,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [valueState, setValueState] = useState(
      () => defaultValue ?? value ?? '',
    );

    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const mergedRefs = useMergeRefs(ref, inputRef);
    const inputId = useId(id);

    const isClearable =
      clearable && !disabled && !readOnly && focused && valueState.length > 0;

    useEffect(() => {
      if (typeof value !== 'undefined') {
        setValueState(value);
      }
    }, [value]);

    const changeValue = (
      nextValue: string,
      e?: ChangeEvent<HTMLInputElement>,
    ) => {
      setValueState(nextValue);
      onChange?.(nextValue, e);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      changeValue(e.target.value, e);
    };

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      e.persist();
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      e.persist();
      setFocused(false);
      onBlur?.(e);
    };

    const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      inputRef.current?.focus();
      changeValue('');
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
            <InputAction className="me-1">{startIcon}</InputAction>
          )}

          <input
            {...props}
            ref={mergedRefs}
            className="input-base"
            disabled={disabled}
            id={inputId}
            readOnly={readOnly}
            type="text"
            value={valueState}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
          />

          {isClearable && (
            <InputAction className="ms-1">
              <Icon
                aria-label={clearLabel}
                className="text-xl color-neutral-800 hover:opacity-60"
                data-testid="clear-icon"
                role="button"
                tabIndex={-1}
                onMouseDown={handleClear}
              >
                <BiX />
              </Icon>
            </InputAction>
          )}

          {isValidElement(endIcon) && (
            <InputAction className="ms-1">{endIcon}</InputAction>
          )}
        </InputBox>
      </InputGroup>
    );
  },
);

TextInput.displayName = 'TextInput';
