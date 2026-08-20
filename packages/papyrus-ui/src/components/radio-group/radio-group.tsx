import cn from 'classnames';
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useState,
} from 'react';
import type {
  ChangeEvent,
  FocusEventHandler,
  ReactNode,
  RefAttributes,
} from 'react';

import { useId } from '../../utils/use-id';
import { InputGroup } from '../input-group';
import type { RadioProps } from '../radio';

export type RadioGroupDirection = 'row' | 'column';

export interface RadioGroupProps {
  /**
   * If `true`, the group container takes full width and each radio button fills the free space equally.
   * Used to display radio buttons in a row and make them fill the available space.
   *
   * @default false
   */
  block?: boolean;

  /**
   * The class name for the radio group.
   */
  className?: string;

  /**
   * The default value for the radio group.
   */
  defaultValue?: string;

  /**
   * Optional description text for the radio group.
   * Can be used to provide additional context or instructions for the group of radio buttons.
   */
  description?: ReactNode;

  /**
   * The direction of the radio group layout.
   * Can either be `'row'` for horizontal alignment or `'column'` for vertical alignment.
   *
   * @default 'column'
   */
  direction?: RadioGroupDirection;

  /**
   * If `true`, disables all radio buttons in the group, preventing user interaction.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * If `true`, indicates that the radio group is invalid (e.g., due to validation errors).
   *
   * @default false
   */
  invalid?: boolean;

  /**
   * The label text for the radio group.
   */
  label?: ReactNode;

  /**
   * Message to display under the radio group, such as validation errors or hints.
   */
  message?: ReactNode;

  /**
   * The name attribute for the radio group.
   * This is used to group radio buttons together when submitting form data.
   */
  name?: string;

  /**
   * If `true`, the radio buttons in the group are read-only, preventing the user from making changes.
   *
   * @default false
   */
  readOnly?: boolean;

  /**
   * The current value of the radio group.
   */
  value?: string;

  /**
   * Callback function to be invoked when the value of the radio group changes.
   *
   * @param value - The new value of the radio group.
   */
  onChange?: (value: string) => void;

  /**
   * Callback function to handle focus events on the radio buttons.
   * This is triggered when one of radio buttons within the group is focused.
   */
  onFocus?: FocusEventHandler<HTMLInputElement>;

  /**
   * Callback function to handle blur events on the radio buttons.
   * This is triggered when one of radio buttons within the group loses focus.
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;

  /**
   * The children of the RadioGroup, typically a list of Radio components.
   * Each child should be a `Radio` component, and the group should contain more then one radio buttons.
   */
  children?: ReactNode;
}

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  (
    {
      block = false,
      className,
      defaultValue,
      description,
      direction = 'row',
      disabled = false,
      invalid = false,
      label,
      message,
      name,
      readOnly = false,
      value,
      onChange,
      onBlur,
      onFocus,
      children,
    },
    ref,
  ) => {
    const [valueState, setValueState] = useState(() => value ?? defaultValue);
    const labelId = useId();

    useEffect(() => {
      if (typeof value !== 'undefined') {
        setValueState(value);
      }
    }, [value]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly || e.target.disabled || e.target.readOnly) {
        return;
      }

      const { value: inputValue } = e.target;
      setValueState(inputValue);
      onChange?.(inputValue);
    };

    return (
      <InputGroup
        className={className}
        description={description}
        id={labelId}
        invalid={invalid}
        label={label}
        message={message}
      >
        <div
          aria-labelledby={labelId}
          className={cn(
            'flex flex-wrap gap-x-6 gap-y-2',
            direction === 'row' ? 'flex-row' : 'flex-col',
            block ? 'flex' : 'inline-flex',
          )}
          role="group"
        >
          {Children.map(children, (child, idx) =>
            isValidElement<RadioProps & RefAttributes<HTMLInputElement>>(child)
              ? cloneElement(child, {
                  ref: idx === Children.count(children) - 1 ? ref : undefined,
                  name,
                  checked: child.props.value === valueState,
                  className: cn(
                    block ? 'flex-1' : 'flex-none',
                    child.props.className,
                  ),
                  disabled: disabled || child.props.disabled,
                  readOnly: readOnly || child.props.readOnly,
                  onChange: (_checked, e) => {
                    if (e) {
                      handleChange(e);
                    }
                  },
                  onFocus,
                  onBlur,
                })
              : child,
          )}
        </div>
      </InputGroup>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';
