import type { Meta, StoryFn } from '@storybook/react';

import { Quote } from './quote';
import type { QuoteProps } from './quote';

const meta: Meta = {
  title: 'Typography/Quote',
  component: Quote,
};

const Template: StoryFn<QuoteProps> = args => <Quote {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: 'To be, or not to be, that is the question.',
};

export const SmallText = Template.bind({});

SmallText.args = {
  size: 'sm',
  children:
    'The only limit to our realization of tomorrow is our doubts of today.',
};

export const PrimaryFont = Template.bind({});
PrimaryFont.args = {
  fontVariant: 'primary',
  children:
    'Small steps in the right direction can turn out to be the biggest step of your life.',
};

export const SecondaryFont = Template.bind({});
SecondaryFont.args = {
  fontVariant: 'secondary',
  children:
    'The only limit to our realization of tomorrow is our doubts of today.',
};

export const PrimaryVariant = Template.bind({});
PrimaryVariant.args = {
  variant: 'primary',
  children: 'The journey of a thousand miles begins with one step.',
};

export const SecondaryVariant = Template.bind({});
SecondaryVariant.args = {
  variant: 'secondary',
  children:
    'Success is not final, failure is not fatal: It is the courage to continue that counts.',
};

export const TertiaryVariant = Template.bind({});
TertiaryVariant.args = {
  variant: 'secondary',
  children: 'This demonstrates the tertiary emphasis style.',
};

export default meta;
