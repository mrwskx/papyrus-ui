import type { StoryFn } from '@storybook/react';
import { capitalize } from 'lodash';
import { BiInfoCircle, BiSolidPurchaseTag } from 'react-icons/bi';

import { Icon } from '../icon';
import type { InputBoxSize } from '../input-box';

import { NumericInput } from './numeric-input';
import type { NumericInputProps } from './numeric-input';

const sizes: InputBoxSize[] = ['sm', 'md', 'lg'];

export default {
  title: 'Inputs/NumericInput',
  component: NumericInput,

  args: {
    label: 'Max Price',
    allowNegative: false,
    decimalScale: 2,
    defaultValue: 1999,
    fixedDecimalScale: true,
    placeholder: '$ 0.00',
    prefix: '$ ',
    thousandSeparator: true,
  },
};

const Template: StoryFn<NumericInputProps> = function Template(args) {
  return (
    <div className="w-64">
      <NumericInput {...args} />
    </div>
  );
};

export const Basic = Template.bind({});

export function Sizes(args: NumericInputProps) {
  return (
    <div className="flex flex-col w-64">
      {sizes.map((size, i) => (
        <div key={size} className={i ? 'mt-4' : ''}>
          <NumericInput
            {...args}
            id={`numeric-input-size-${size}`}
            label={capitalize(size)}
            size={size}
          />
        </div>
      ))}
    </div>
  );
}

export function WithIcon(args: NumericInputProps) {
  return (
    <div className="flex flex-col w-64">
      <div className="mb-4">
        <NumericInput
          {...args}
          id="numeric-input-with-start-icon"
          label="With Start Icon"
          startIcon={
            <Icon className="text-neutral-950">
              <BiSolidPurchaseTag name="purchase-tag" />
            </Icon>
          }
        />
      </div>

      <div>
        <NumericInput
          {...args}
          endIcon={
            <Icon className="text-info-600">
              <BiInfoCircle />
            </Icon>
          }
          id="numeric-input-with-end-icon"
          label="With End Icon"
        />
      </div>
    </div>
  );
}

export const Description = Template.bind({});

Description.args = {
  id: 'numeric-input-description',
  description: 'This is a description.',
};

export const Message = Template.bind({});

Message.args = {
  id: 'numeric-input-message',
  message: 'This is a message',
};

export const Invalid = Template.bind({});

Invalid.args = {
  id: 'numeric-input-invalid',
  invalid: true,
};

export const Disabled = Template.bind({});

Disabled.args = {
  id: 'numeric-input-disabled',
  disabled: true,
};
