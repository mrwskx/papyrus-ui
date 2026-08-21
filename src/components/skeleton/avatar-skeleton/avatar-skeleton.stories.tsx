import type { Meta, StoryFn } from '@storybook/react';

import { AvatarSkeleton } from './avatar-skeleton';
import type { AvatarSkeletonProps } from './avatar-skeleton';

const meta: Meta = {
  title: 'Feedback/Skeleton/AvatarSkeleton',
  component: AvatarSkeleton,
  args: {
    size: 'md',
  },
};

const Template: StoryFn<AvatarSkeletonProps> = function Template(args) {
  return <AvatarSkeleton {...args} />;
};

export const Basic = Template.bind({});

export const SizeXs = Template.bind({});

SizeXs.args = {
  size: 'xs',
};

export const SizeSm = Template.bind({});

SizeSm.args = {
  size: 'sm',
};

export const SizeLg = Template.bind({});

SizeLg.args = {
  size: 'lg',
};

export const SizeXl = Template.bind({});

SizeXl.args = {
  size: 'xl',
};

export const Size2Xl = Template.bind({});

Size2Xl.args = {
  size: '2xl',
};

export default meta;
