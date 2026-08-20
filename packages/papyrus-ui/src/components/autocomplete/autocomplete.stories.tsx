import type { Meta, StoryFn } from '@storybook/react';
import { BiInfoCircle, BiSearch } from 'react-icons/bi';

import { Icon } from '../icon';
import type { InputBoxSize } from '../input-box';

import { Autocomplete } from './autocomplete';
import type { AutocompleteProps } from './autocomplete';

const SIZE_OPTIONS: InputBoxSize[] = ['sm', 'md', 'lg'];

const OPTIONS_LIST = ['Peter', 'Louis', 'Mag', 'Chris', 'Stewie', 'Bryan'];

const meta: Meta<typeof Autocomplete> = {
  title: 'Inputs/Autocomplete',
  component: Autocomplete,
  args: {
    label: 'Character',
    placeholder: 'Type to search',
  },
};

const Template: StoryFn<AutocompleteProps> = function Template(args) {
  return (
    <div className="min-h-[256px] w-64">
      <Autocomplete {...args} options={OPTIONS_LIST} />
    </div>
  );
};

export const Basic = Template.bind({
  id: 'autocomplete-basic',
});

export const Multiple = Template.bind({});

Multiple.args = {
  id: 'autocomplete-multiple',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  multiple: true,
  defaultValue: ['Chris', 'Bryan'],
};

export const Description = Template.bind({});

Description.args = {
  id: 'autocomplete-description',
  description: 'This is a description.',
};

export const Message = Template.bind({});

Message.args = {
  id: 'autocomplete-message',
  message: 'Just a hint',
};

export const Invalid = Template.bind({});

Invalid.args = {
  id: 'autocomplete-invalid',
  invalid: true,
  message: 'Something went wrong',
};

export const Disabled = Template.bind({});

Disabled.args = {
  id: 'autocomplete-disabled',
  disabled: true,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  multiple: true,
  value: ['Chris', 'Bryan'],
};

export function Sizes(args: AutocompleteProps) {
  return (
    <div className="flex flex-col min-h-[384px] w-64">
      {SIZE_OPTIONS.map((size, i) => (
        <div key={size} className={i ? 'mt-4' : ''}>
          <Autocomplete
            {...args}
            id={`autocomplete-size-${size}`}
            options={OPTIONS_LIST}
            size={size}
          />
        </div>
      ))}
    </div>
  );
}

export function WithIcon(args: AutocompleteProps) {
  return (
    <div className="flex flex-col min-h-[384px] w-64">
      <div className="mt-4">
        <Autocomplete
          {...args}
          id="autocomplete-with-start-icon"
          label="With Start Icon"
          options={OPTIONS_LIST}
          startIcon={
            <Icon className="text-neutral-950">
              <BiSearch />
            </Icon>
          }
        />
      </div>

      <div className="mt-4">
        <Autocomplete
          {...args}
          endIcon={
            <Icon className="text-info-600">
              <BiInfoCircle />
            </Icon>
          }
          id="autocomplete-with-end-icon"
          label="With End Icon"
          options={OPTIONS_LIST}
        />
      </div>
    </div>
  );
}

export default meta;
