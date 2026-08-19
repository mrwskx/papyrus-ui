'use client';

import { forwardRef, isValidElement, useEffect, useState } from 'react';
import type { InputHTMLAttributes, ReactElement, ReactNode } from 'react';
import type { IconBaseProps } from 'react-icons';
import { NumericFormat } from 'react-number-format';
import type { NumberFormatValues } from 'react-number-format';

import { useId } from '../../utils/use-id';
import { InputAction } from '../input-action';
import { InputBox } from '../input-box';
import type { InputBoxSize } from '../input-box';
import { InputGroup } from '../input-group';

export type NumericValue = number | null;

export interface NumericInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'defaultValue' | 'size' | 'type' | 'value' | 'onChange'
> {
  /**
   * If `true`, allows leading zeros in the numeric input.
   *
   * @default false
   */
  allowLeadingZeros?: boolean;

  /**
   * If `true`, allows negative numbers in the input field.
   *
   * @default false
   */
  allowNegative?: boolean;

  /**
   * An array of allowed decimal separators for the numeric input. When missing, decimal separator and '.' are used.
   */
  allowedDecimalSeparators?: string[];

  /**
   * If defined, limits how many digits can appear after the decimal point.
   */
  decimalScale?: number;

  /**
   * The character to use as the decimal separator.
   *
   * @default '.'
   */
  decimalSeparator?: string;

  /**
   * The default value of the uncontrolled input.
   * This is used when the component is uncontrolled and does not have a `value` prop.
   */
  defaultValue?: NumericValue;

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
   * If `true`, ensures that the input always maintains a fixed number of decimal places as defined by `decimalScale`.
   *
   * @default false
   */
  fixedDecimalScale?: boolean;

  /**
   * If `true`, the input element will have a validation error style.
   *
   * @default false
   */
  invalid?: boolean;

  /**
   * A function to validate whether the current numeric value is allowed.
   */
  isAllowed?: (values: NumberFormatValues) => boolean;

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
   * A prefix string to be displayed before the input value.
   */
  prefix?: string;

  /**
   * Defines the size of the input box. This can be used to adjust the height of the input element.
   *
   * @default 'md'
   */
  size?: InputBoxSize;

  /**
   * A React element to be displayed at the start of the input field.
   */
  startIcon?: ReactElement;

  /**
   * A React element to be displayed at the end of the input field.
   */
  endIcon?: ReactElement;

  /**
   * A suffix string to be displayed after the input value.
   */
  suffix?: string;

  /**
   * If `true`, a thousands separator (`,`) will be used to format large numbers.
   * This helps make large numbers more readable by adding grouping separators.
   * For example, `1000` would be displayed as `1,000`.
   *
   * @default false
   */
  thousandSeparator?: boolean | string;

  /**
   * Defines the style of the thousands grouping, such as `'thousand'`, `'lakh'`, or `'wan'`.
   */
  thousandsGroupStyle?: 'thousand' | 'lakh' | 'wan' | 'none';

  /**
   * The current value of the input. This prop is used to control the value of the input.
   * Use `onChange` to capture changes to the value.
   */
  value?: NumericValue;

  /**
   * Callback function triggered when the value of the input changes.
   * The function receives the new numeric value as its argument.
   */
  onChange?: (value: NumericValue) => void;
}

export const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  (
    {
      defaultValue,
      description,
      disabled,
      id,
      invalid = false,
      label,
      message,
      readOnly,
      size = 'md',
      startIcon,
      endIcon,
      value,
      onChange,

      ...props
    },
    ref,
  ) => {
    const [valueState, setValueState] = useState<NumericValue>(
      value ?? defaultValue ?? null,
    );

    const inputId = useId(id);
    const inputValue = valueState ?? '';

    useEffect(() => {
      if (value !== undefined) {
        setValueState(value);
      }
    }, [value]);

    const handleValueChange = (values: NumberFormatValues) => {
      onChange?.(values.floatValue ?? null);
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

          <NumericFormat
            {...props}
            className='input-base'
            disabled={disabled}
            getInputRef={ref}
            id={inputId}
            readOnly={readOnly}
            value={inputValue}
            onValueChange={handleValueChange}
          />

          {isValidElement(endIcon) && (
            <InputAction className='ms-1'>{endIcon}</InputAction>
          )}
        </InputBox>
      </InputGroup>
    );
  },
);

NumericInput.displayName = 'NumericInput';
