import type { StoryFn, Meta } from '@storybook/react';

import { Text } from '../text';

import { Link } from './link';
import type { LinkProps } from './link';

const meta: Meta = {
  title: 'Typography/Link',
  component: Link,
  args: {
    href: '#',
    children: 'This is a link',
  },
};

const Template: StoryFn<LinkProps> = function Template(args: LinkProps) {
  return (
    <Text>
      <Link {...args} />
    </Text>
  );
};

export const Basic = Template.bind({});

export const AsButton = Template.bind({});

AsButton.args = {
  as: 'button',
  href: undefined,
  children: 'This is a button',
};

export const Disabled = Template.bind({});

Disabled.args = {
  as: 'button',
  href: undefined,
  disabled: true,
  children: 'This is a button',
};

export default meta;
