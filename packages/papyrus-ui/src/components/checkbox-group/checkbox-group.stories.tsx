import type { Meta, StoryFn } from '@storybook/react';

import { Checkbox } from '../checkbox';

import { CheckboxGroup } from './checkbox-group';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Inputs/CheckboxGroup',
  component: CheckboxGroup,
  args: {
    label: 'Checkbox Group',
    name: 'checkboxGroup',
    children: [
      <Checkbox key={1} value="1">
        Label 1
      </Checkbox>,
      <Checkbox key={2} value="2">
        Label 2
      </Checkbox>,
      <Checkbox key={3} value="3">
        Label 3
      </Checkbox>,
    ],
  },
};

const Template: StoryFn<typeof CheckboxGroup> = function Template(args) {
  const { block } = args;

  return (
    <div className={block ? 'w-96' : ''}>
      <CheckboxGroup {...args} />
    </div>
  );
};

export const SingleCheckbox = Template.bind({});

SingleCheckbox.args = {
  label: 'Single Checkbox',
  defaultValue: false, // Single checkbox selection, default value can be a boolean (false or true)
  children: <Checkbox value="true">I agree with terms and conditions</Checkbox>,
};

export const RowLayout = Template.bind({});

RowLayout.args = {
  direction: 'row', // Displays checkboxes horizontally in a row
};

export const BlockLayout = Template.bind({});

BlockLayout.args = {
  block: true, // Ensures checkboxes take up equal space when displayed in a row
  direction: 'row',
};

export const ColumnLayout = Template.bind({});
ColumnLayout.args = {
  direction: 'column', // Displays checkboxes vertically in a column
};

export const Description = Template.bind({});

Description.args = {
  description: 'Lorem ipsum dolor sit amet.',
};

export const Message = Template.bind({});

Message.args = {
  message: 'Just a hint',
};

export const ErrorMessage = Template.bind({});

ErrorMessage.args = {
  message: 'Something is wrong',
  invalid: true, // Marks the group as invalid, typically for form validation
};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true, // Disables the entire checkbox group
};

export const ReadOnly = Template.bind({});

ReadOnly.args = {
  defaultValue: ['1', '2'],
  readOnly: true, // Ensures checkboxes are not interactable
};

export default meta;
