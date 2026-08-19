import type { StoryFn } from '@storybook/react';
import { BiInfoCircle, BiSearch } from 'react-icons/bi';

import { Icon } from '../icon';
import type { InputBoxSize } from '../input-box';

import { TextInput } from './text-input';
import type { TextInputProps } from './text-input';

const sizes: InputBoxSize[] = ['sm', 'md', 'lg'];

export default {
  title: 'Inputs/TextInput',
  component: TextInput,

  args: {
    label: 'First Name',
    defaultValue: 'Bob',
    placeholder: 'First Name',
  },
};

const Template: StoryFn<TextInputProps> = args => (
  <div className="w-64">
    <TextInput {...args} />
  </div>
);

export const Basic = Template.bind({});

Basic.args = {
  id: 'text-input-basic',
};

export const Clearable = Template.bind({});

Clearable.args = {
  id: 'text-input-clearable',
  clearable: true,
};

export function Sizes(args: TextInputProps) {
  return (
    <div className="flex flex-col w-64">
      {sizes.map((size, i) => (
        <div key={i} className={i ? 'mt-4' : ''}>
          <TextInput {...args} id={`text-input-size-${size}`} size={size} />
        </div>
      ))}
    </div>
  );
}

export function WithIcon(args: TextInputProps) {
  return (
    <div className="flex flex-col w-64">
      <div className="mb-4">
        <TextInput
          {...args}
          id="text-input-with-start-icon"
          label="With Start Icon"
          startIcon={
            <Icon className="text-neutral-950">
              <BiSearch />
            </Icon>
          }
        />
      </div>

      <div>
        <TextInput
          {...args}
          endIcon={
            <Icon className="text-info-950">
              <BiInfoCircle />
            </Icon>
          }
          id="text-input-with-end-icon"
          label="With End Icon"
        />
      </div>
    </div>
  );
}

export const Description = Template.bind({});

Description.args = {
  id: 'text-input-description',
  description: 'This is a description.',
};

export const Message = Template.bind({});

Message.args = {
  id: 'text-input-message',
  description: 'This is a message',
};

export const Invalid = Template.bind({});

Invalid.args = {
  id: 'text-input-invalid',
  invalid: true,
  description: 'Something went wrong',
};

export const Disabled = Template.bind({});

Disabled.args = {
  id: 'text-input-disabled',
  disabled: true,
};
