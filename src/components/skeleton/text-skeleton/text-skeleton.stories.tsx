import type { Meta, StoryFn } from '@storybook/react';

import { TextSkeleton } from './text-skeleton';
import type { TextSkeletonProps } from './text-skeleton';

const meta: Meta = {
  title: 'Feedback/Skeleton/TextSkeleton',
  component: TextSkeleton,
  args: {
    fontVariant: 'primary',
    size: 'md',
    className: 'w-64',
  },
};

const Template: StoryFn<TextSkeletonProps> = function Template(args) {
  return <TextSkeleton {...args} />;
};

export const Basic = Template.bind({});

export const Small = Template.bind({});

Small.args = {
  size: 'sm',
};

export default meta;
