import type { StoryFn } from '@storybook/react';

import { Radio } from './radio';
import type { RadioProps } from './radio';

export default {
  title: 'Inputs/Radio',
  component: Radio,

  args: {
    name: 'radio',
    value: 'true',
    id: 'radio',
    children: 'Radio',
  },
};

const Template: StoryFn<RadioProps> = function Template(args) {
  return <Radio {...args} />;
};

export const Basic = Template.bind({});

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
};
