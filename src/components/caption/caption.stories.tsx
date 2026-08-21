import type { Meta, StoryFn } from '@storybook/react';

import { Caption } from './caption';
import type { CaptionProps } from './caption';

const meta: Meta = {
  title: 'Typography/Caption',
  component: Caption,
};

const Template: StoryFn<CaptionProps> = function Template(args) {
  return <Caption {...args} />;
};

export const Basic = Template.bind({});

Basic.args = {
  children: 'This is a caption',
};

export default meta;
