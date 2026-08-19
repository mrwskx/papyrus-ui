import type { Meta, StoryFn } from '@storybook/react';
import { BiBell, BiSolidError } from 'react-icons/bi';

import { Avatar } from '../avatar';
import { Icon } from '../icon';
import { IconButton } from '../icon-button';

import { Badge } from './badge';
import type { BadgeProps } from './badge';

const meta: Meta = {
  title: 'Data Display/Badge',
  component: Badge,
  args: {
    content: 5,
    children: (
      <IconButton title="Notifications" variant="tertiary">
        <BiBell />
      </IconButton>
    ),
  },
};

const Template: StoryFn<BadgeProps> = args => <Badge {...args} />;

export const Basic = Template.bind({});

export const BackgroundColor = Template.bind({});

BackgroundColor.args = {
  className: 'bg-primary-500',
};

export const Dot = Template.bind({});

Dot.args = {
  dot: true,
};

export const OverflowCount = Template.bind({});

OverflowCount.args = {
  content: 1000,
  overflowCount: 999,
};

export const ZeroCount = Template.bind({});

ZeroCount.args = {
  content: 0,
  showZero: true,
};

export const Position = Template.bind({});

Position.args = {
  position: 'bottom-end',
};

export const Offset = Template.bind({});

Offset.args = {
  offsetX: -5,
  offsetY: -5,
  children: (
    <IconButton
      avatar={
        <Avatar>
          <img alt="Profile" src="https://i.pravatar.cc/300" />
        </Avatar>
      }
      rounded
      size="lg"
      title="Profile"
    />
  ),
};

export const CustomContent = Template.bind({});

CustomContent.args = {
  content: (
    <Icon className="text-danger-500 text-lg">
      <BiSolidError />
    </Icon>
  ),
  children: (
    <IconButton title="Notifications">
      <BiBell />
    </IconButton>
  ),
};

export const Standalone = Template.bind({});

Standalone.args = {
  content: 42,
  children: null,
};

export default meta;
