import cn from 'classnames';
import type { FC, ReactNode } from 'react';

import { InputMessage } from '../input-message';
import { Label } from '../label';
import { Text } from '../text';

export interface InputGroupProps {
  /**
   * The class name to be applied to the input group.
   */
  className?: string;

  /**
   * Optional description text for the input field, providing additional context or instructions for the user.
   * Appears above the input field to guide the user on the expected input.
   */
  description?: ReactNode;

  /**
   * The ID of the input element, used to associate the label with the input for accessibility.
   * If `htmlFor` is not provided, the label will be rendered as a `span` instead of a `label`, which is less ideal
   * for accessibility but can be used in exceptional cases such as labelling a checkbox group or a fieldset.
   */
  htmlFor?: string;

  /**
   * The unique identifier for the label element, useful when the label text is in a non-`label` element.
   */
  id?: string;

  /**
   * If `true`, renders the message text as an error message. Otherwise, renders it as a hint.
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
   * An input or fieldset element to be included inside the InputGroup, representing the actual input field(s).
   */
  children: ReactNode;
}

export const InputGroup: FC<InputGroupProps> = ({
  className,
  description,
  htmlFor,
  id,
  invalid,
  label,
  message,
  children,
}) => (
  <div className={cn('flex flex-col', className)}>
    {label && (
      <Label
        as={htmlFor ? 'label' : 'span'}
        className={description ? 'mb-0.5' : 'mb-1.5'}
        htmlFor={htmlFor}
        id={id}
      >
        {label}
      </Label>
    )}

    {description && (
      <Text className="mb-1.5" size="sm">
        {description}
      </Text>
    )}

    {children}

    {message && (
      <InputMessage className="mt-0.5" invalid={invalid}>
        {message}
      </InputMessage>
    )}
  </div>
);
