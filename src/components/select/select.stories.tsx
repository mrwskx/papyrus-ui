import type { StoryFn } from '@storybook/react';
import { BiInfoCircle, BiSearch } from 'react-icons/bi';

import { Icon } from '../icon';
import type { InputBoxSize } from '../input-box';

import { Select } from './select';
import type { SelectProps } from './select';

const SIZE_OPTIONS: InputBoxSize[] = ['sm', 'md', 'lg'];

const SELECT_OPTIONS = [
  'Choose a person',
  'Peter',
  'Louis',
  'Mag',
  'Chris',
  'Stewie',
  'Bryan',
];

export default {
  title: 'Inputs/Select',
  component: Select,
  args: {
    label: 'Character',
    defaultValue: 0,
    children: SELECT_OPTIONS.map((val, idx) => (
      <option key={val} value={idx}>
        {val}
      </option>
    )),
  },
};

const Template: StoryFn<SelectProps> = function Template(args) {
  return (
    <div className="w-64">
      <Select {...args} />
    </div>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  id: 'select-basic',
};

export const Multiple = Template.bind({});

Multiple.args = {
  id: 'select-multiple',
  defaultValue: [],
  multiple: true,
} as never;

export function Sizes(args: SelectProps) {
  return (
    <div className="flex flex-col w-64">
      {SIZE_OPTIONS.map((size, i) => (
        <div key={size} className={i ? 'mt-4' : ''}>
          <Select {...args} id={`select-size-${size}`} size={size}>
            {SELECT_OPTIONS.map((val, idx) => (
              <option key={val} value={idx}>
                {val}
              </option>
            ))}
          </Select>
        </div>
      ))}
    </div>
  );
}

export function WithIcon(args: SelectProps) {
  return (
    <div className="flex flex-col w-64">
      <div className="mb-4">
        <Select
          {...args}
          id="select-with-start-icon"
          label="With Start Icon"
          startIcon={
            <Icon className="text-neutral-950">
              <BiSearch />
            </Icon>
          }
        >
          {SELECT_OPTIONS.map((val, idx) => (
            <option key={val} value={idx}>
              {val}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Select
          {...args}
          endIcon={
            <Icon className="text-info-600">
              <BiInfoCircle />
            </Icon>
          }
          id="select-with-end-icon"
          label="With End Icon"
        >
          {SELECT_OPTIONS.map((val, idx) => (
            <option key={val} value={idx}>
              {val}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}

export const Description = Template.bind({});

Description.args = {
  id: 'select-description',
  description: 'This is a description',
};

export const Invalid = Template.bind({});

Invalid.args = {
  id: 'select-invalid',
  invalid: true,
  message: 'Something wend wrong',
};

export const Message = Template.bind({});

Message.args = {
  id: 'select-message',
  message: 'This is a message',
};

export const Disabled = Template.bind({});

Disabled.args = {
  id: 'select-disabled',
  disabled: true,
};
