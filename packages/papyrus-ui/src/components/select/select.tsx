'use client';

import cn from 'classnames';
import { forwardRef, isValidElement } from 'react';
import type {
  ChangeEvent,
  ForwardedRef,
  ReactElement,
  ReactNode,
  RefAttributes,
  SelectHTMLAttributes,
} from 'react';
import type { IconBaseProps } from 'react-icons';
import { BiChevronDown } from 'react-icons/bi';

import type { ChangeHandler } from '../../types';
import { useId } from '../../utils/use-id';
import { Icon } from '../icon';
import { InputAction } from '../input-action';
import { InputBox } from '../input-box';
import type { InputBoxSize } from '../input-box';
import { InputGroup } from '../input-group';

export type SelectValue<IsMulti extends boolean> = IsMulti extends true
  ? string[]
  : string | undefined;

export interface SelectProps<IsMulti extends boolean = false> extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'defaultValue' | 'size' | 'value' | 'onChange'
> {
  /**
   * The default value of the uncontrolled input.
   * This is used when the component is uncontrolled and does not have a `value` prop.
   */
  defaultValue?: SelectValue<IsMulti>;

  /**
   * Optional description text for the input field, providing additional context or instructions for the user.
   * Appears above the input field to guide the user on the expected input.
   */
  description?: ReactNode;

  /**
   * Defines the number of visible options in the dropdown list.
   * Useful for controlling the size of the dropdown and how many options are visible without scrolling.
   */
  htmlSize?: number;

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
   * If `true`, allows multiple values to be selected. For single selection (`IsMulti` is `false`), this is ignored.
   * If `true`, the `value` prop will be an array, and the `onChange` callback will return an array of selected values.
   *
   * @default false
   */
  multiple?: IsMulti;

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
   * The current value of the input. This prop is used to control the value of the input.
   * Use `onChange` to capture changes to the value.
   */
  value?: SelectValue<IsMulti>;

  /**
   * Callback fired when the value changes. Receives the new value and the raw event.
   */
  onChange?: ChangeHandler<
    SelectValue<IsMulti>,
    ChangeEvent<HTMLSelectElement>
  >;

  /**
   * The options for the select dropdown. These are typically provided as `<option>` elements.
   * This can be an array of `<option>` elements or any other components that render options for the user to select.
   */
  children?: ReactNode;
}

export interface SelectFn {
  <IsMulti extends boolean = false>(
    props: SelectProps<IsMulti> & RefAttributes<HTMLSelectElement>,
  ): ReactElement;
  displayName: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  <IsMulti extends boolean = false>(
    {
      className,
      description,
      disabled,
      htmlSize,
      id,
      invalid,
      label,
      message,
      size = 'md',
      startIcon,
      endIcon,
      multiple,
      onChange,
      children,
      ...props
    }: SelectProps<IsMulti>,
    ref: ForwardedRef<HTMLSelectElement>,
  ) => {
    const inputId = useId(id);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const nextValue = multiple
        ? Array.from(e.target.selectedOptions, v => v.value)
        : e.target.value;

      onChange?.(nextValue as SelectValue<IsMulti>, e);
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
        <InputBox disabled={disabled} invalid={invalid} size={size}>
          {isValidElement<IconBaseProps>(startIcon) && (
            <InputAction className="mr-1">{startIcon}</InputAction>
          )}

          <div className="flex-1 relative">
            <select
              ref={ref}
              className={cn(
                'select-base relative z-10',
                multiple ? 'pr-4' : 'pr-7',
              )}
              disabled={disabled}
              multiple={multiple}
              size={htmlSize}
              onChange={handleChange}
              {...props}
            >
              {children}
            </select>

            {!multiple && (
              <InputAction className="absolute top-0 right-0 bottom-0 m-auto">
                <Icon
                  className={cn(
                    disabled ? 'text-neutral-950/40' : 'text-neutral-950',
                  )}
                >
                  <BiChevronDown />
                </Icon>
              </InputAction>
            )}
          </div>

          {isValidElement(endIcon) && (
            <InputAction className="ms-1">{endIcon}</InputAction>
          )}
        </InputBox>
      </InputGroup>
    );
  },
) as SelectFn;

Select.displayName = 'Select';
