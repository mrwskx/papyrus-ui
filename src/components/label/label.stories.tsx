import type { Meta, StoryFn } from '@storybook/react';

import { Label } from './label';
import type { LabelProps } from './label';

const meta: Meta = {
  title: 'Typography/Label',
  component: Label,
};

const Template: StoryFn<LabelProps> = function Template(args) {
  return <Label {...args} />;
};

export const Basic = Template.bind({});

Basic.args = {
  children: 'This is a label',
};

export default meta;
