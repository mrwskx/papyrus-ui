import type { StoryFn } from '@storybook/react';

import { Range } from './range';
import type { RangeProps } from './range';

export default {
  title: 'Inputs/Range',
  component: Range,

  args: {
    label: 'Zoom',
    defaultValue: 50,
    min: 0,
    max: 100,
  },
};

const Template: StoryFn<RangeProps> = function Template(args) {
  return <Range {...args} />;
};

export const Basic = Template.bind({});

Basic.args = {
  id: 'range-basic',
};

export const Description = Template.bind({
  id: 'range-description',
});

Description.args = {
  id: 'range-description',
  description: 'This is a description',
};

export const Invalid = Template.bind({});

Invalid.args = {
  id: 'range-invalid',
  invalid: true,
  message: 'Something went wrong',
};

export const Message = Template.bind({});

Message.args = {
  id: 'range-message',
  message: 'This is a message',
};

export const Disabled = Template.bind({});

Disabled.args = {
  id: 'range-disabled',
  disabled: true,
};
