import type { Meta, StoryFn } from '@storybook/react';

import { TextSkeleton } from '../text-skeleton';

import { ListSkeleton } from './list-skeleton';
import type { ListSkeletonProps } from './list-skeleton';

const meta: Meta = {
  title: 'Feedback/Skeleton/ListSkeleton',
  component: ListSkeleton,
  args: {
    fontVariant: 'primary',
    size: 'md',
  },
};

const Template: StoryFn<ListSkeletonProps> = function Template(args) {
  return (
    <ListSkeleton {...args}>
      <TextSkeleton className="w-96" />
      <TextSkeleton className="w-96" />
    </ListSkeleton>
  );
};

export const Basic = Template.bind({});

export const Small = Template.bind({});

Small.args = {
  size: 'sm',
};

export default meta;
