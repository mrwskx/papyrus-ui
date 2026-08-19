'use client';

import { forwardRef, isValidElement, useEffect, useState } from 'react';
import type {
  InputHTMLAttributes,
  ReactElement,
  KeyboardEvent,
  ReactNode,
} from 'react';
import type { IconBaseProps } from 'react-icons';
import { PatternFormat } from 'react-number-format';
import type { NumberFormatValues } from 'react-number-format';

import { useId } from '../../utils/use-id';
import { InputAction } from '../input-action';
import { InputBox } from '../input-box';
import type { InputBoxSize } from '../input-box';
import { InputGroup } from '../input-group';

export interface TimeInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'defaultValue' | 'size' | 'type' | 'value' | 'onChange'
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
   * If `true`, enables 12-hour format for the time input (AM/PM).
   * Otherwise, uses the 24-hour format.
   *
   * @default false
   */
  hour12?: boolean;

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
   * If `true`, enables seconds in the time input (e.g., HH:MM:SS format).
   *
   * @default false
   */
  seconds?: boolean;

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
   * Callback function fired when the value changes. Receives the new formatted time string.
   */
  onChange?: (value: string) => void;
}

const SECONDS_FORMAT = '##:##:##';

const MINUTES_FORMAT = '##:##';

const MASK = '_';

const SECONDS_DEFAULT_VALUE = '00:00:00';

const MINUTES_DEFAULT_VALUE = '00:00';

function getDateByValue(value: string) {
  const parts = value.split(':').map(part => parseInt(part, 10));
  return new Date(0, 0, 0, parts[0], parts[1], parts[2] ?? 0);
}

function isValidDate(date: Date, hour12: boolean) {
  return !(
    isNaN(date.getTime()) ||
    date.getDay() !== 0 ||
    (hour12 && date.getHours() > 12)
  );
}

function toFormattedValue(value: string | undefined, seconds: boolean) {
  if (seconds) {
    return value
      ? value.replaceAll(MASK, '0').replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3')
      : SECONDS_DEFAULT_VALUE;
  }

  return value
    ? value.replaceAll(MASK, '0').replace(/(\d{2})(\d{2})/, '$1:$2')
    : MINUTES_DEFAULT_VALUE;
}

function fromDate(date: Date) {
  return date.toTimeString().split(' ')[0];
}

function incrementTimeValue(
  value: string | undefined,
  hour12: boolean,
  seconds: boolean,
) {
  const formattedValue = toFormattedValue(value, seconds);
  const date = getDateByValue(formattedValue);

  if (seconds) {
    date.setSeconds(date.getSeconds() + 1);
  } else {
    date.setMinutes(date.getMinutes() + 1);
  }

  if (!isValidDate(date, hour12)) {
    return formattedValue;
  }

  return fromDate(date);
}

function decrementTimeValue(
  value: string | undefined,
  hour12: boolean,
  seconds: boolean,
) {
  const formattedValue = toFormattedValue(value, seconds);
  const date = getDateByValue(formattedValue);

  if (seconds) {
    date.setSeconds(date.getSeconds() - 1);
  } else {
    date.setMinutes(date.getMinutes() - 1);
  }

  if (!isValidDate(date, hour12)) {
    return formattedValue;
  }

  return fromDate(date);
}

function toRawValue(value: string) {
  return value.replace(/:/g, '');
}

export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  (
    {
      defaultValue,
      disabled,
      description,
      hour12 = false,
      id,
      label,
      invalid = false,
      message,
      readOnly = false,
      seconds = false,
      size = 'md',
      startIcon,
      endIcon,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [valueState, setValueState] = useState(() => value ?? defaultValue);

    const inputId = useId(id);

    useEffect(() => {
      if (value !== undefined) {
        setValueState(value);
      }
    }, [value]);

    const updateValueState = (formattedValue: string) => {
      setValueState(toRawValue(formattedValue));
    };

    const changeValue = (nextValue: string) => {
      updateValueState(nextValue);
      onChange?.(nextValue);
    };

    const isAllowed = (values: NumberFormatValues) => {
      const [p1, p2, p3] = values.formattedValue
        .replaceAll(MASK, '0')
        .split(':')
        .map(v => parseInt(v, 10));

      const [hrs, min, sec] = [p1, p2, p3 ?? 0];

      if (hour12 && hrs > 12) {
        return false;
      }

      if (!hour12 && hrs > 23) {
        return false;
      }

      if (min > 59 || sec > 59) {
        return false;
      }

      return true;
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        changeValue(incrementTimeValue(valueState, hour12, seconds));
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        changeValue(decrementTimeValue(valueState, hour12, seconds));
      }
    };

    const handleValueChange = (values: NumberFormatValues) => {
      changeValue(values.formattedValue);
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

          <PatternFormat
            allowEmptyFormatting
            className='input-base'
            disabled={disabled}
            format={seconds ? SECONDS_FORMAT : MINUTES_FORMAT}
            getInputRef={ref}
            id={inputId}
            isAllowed={isAllowed}
            mask={MASK}
            readOnly={readOnly}
            value={valueState}
            onKeyDown={handleKeyDown}
            onValueChange={handleValueChange}
            {...props}
          />

          {isValidElement(endIcon) && (
            <InputAction className='ms-1'>{endIcon}</InputAction>
          )}
        </InputBox>
      </InputGroup>
    );
  },
);

TimeInput.displayName = 'TimeInput';
