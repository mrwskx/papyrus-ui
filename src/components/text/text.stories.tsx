import type { StoryFn, Meta } from '@storybook/react';

import { Text } from './text';
import type { TextProps } from './text';

const meta: Meta = {
  title: 'Typography/Text',
  component: Text,
  args: {
    children: 'This is a text',
  },
};

export const Template: StoryFn<TextProps> = function Template(args) {
  return <Text {...args} />;
};

export const Basic = Template.bind({});

Basic.args = {
  children:
    'This is a default text using the primary font-family and medium size.',
  size: 'md',
  fontVariant: 'primary',
};

export const SmallText = Template.bind({});

SmallText.args = {
  children: 'This is a small text using the primary font-family.',
  size: 'sm',
};

export const PrimaryFont = Template.bind({});

PrimaryFont.args = {
  children: 'This text uses the primary font-family.',
  size: 'md',
  fontVariant: 'primary',
};

export const SecondaryFont = Template.bind({});

SecondaryFont.args = {
  children: 'This text uses the secondary font-family.',
  size: 'md',
  fontVariant: 'secondary',
};

export const BoldText = Template.bind({});

BoldText.args = {
  children: 'This text is bold.',
  size: 'md',
  fontVariant: 'primary',
  bold: true,
};

export default meta;
