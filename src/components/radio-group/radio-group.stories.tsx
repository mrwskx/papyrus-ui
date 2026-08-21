import type { Meta, StoryFn } from '@storybook/react';

import { Radio } from '../radio';

import { RadioGroup } from './radio-group';

const meta: Meta<typeof RadioGroup> = {
  title: 'Inputs/RadioGroup',
  component: RadioGroup,
  args: {
    label: 'Radio Group',
    children: [
      <Radio key={1} value="1">
        Label 1
      </Radio>,
      <Radio key={2} value="2">
        Label 2
      </Radio>,
      <Radio key={3} value="3">
        Label 3
      </Radio>,
    ],
  },
};

const Template: StoryFn<typeof RadioGroup> = function Template(args) {
  const { block } = args;

  return (
    <div className={block ? 'w-96' : ''}>
      <RadioGroup {...args} />
    </div>
  );
};

export const RowLayout = Template.bind({});

RowLayout.args = {
  name: 'radio-group-row-layout',
  direction: 'row', // Displays radioes horizontally in a row
};

export const BlockLayout = Template.bind({});

BlockLayout.args = {
  name: 'radio-group-block-layout',
  block: true, // Ensures radioes take up equal space when displayed in a row
  direction: 'row',
};

export const ColumnLayout = Template.bind({});

ColumnLayout.args = {
  name: 'radio-group-column-layout',
  direction: 'column', // Displays radioes vertically in a column
};

export const Description = Template.bind({});

Description.args = {
  name: 'radio-group-description',
  description: 'Lorem ipsum dolor sit amet.',
};

export const Message = Template.bind({});

Message.args = {
  name: 'radio-group-message',
  message: 'Just a hint',
};

export const ErrorMessage = Template.bind({});

ErrorMessage.args = {
  name: 'radio-group-error',
  message: 'Something is wrong',
  invalid: true, // Marks the group as invalid, typically for form validation
};

export const Disabled = Template.bind({});

Disabled.args = {
  name: 'radio-group-disabled',
  disabled: true, // Disables the entire radio group
};

export const ReadOnly = Template.bind({});

ReadOnly.args = {
  defaultValue: '1',
  name: 'radio-group-readonly',
  readOnly: true, // Ensures radios are not interactable
};

export default meta;
