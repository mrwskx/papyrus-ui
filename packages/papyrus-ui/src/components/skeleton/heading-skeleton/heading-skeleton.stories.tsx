import type { Meta, StoryFn } from '@storybook/react';

import { HeadingSkeleton } from './heading-skeleton';
import type { HeadingSkeletonProps } from './heading-skeleton';

const meta: Meta = {
  title: 'Feedback/Skeleton/HeadingSkeleton',
  component: HeadingSkeleton,
  args: {
    fontVariant: 'primary',
    level: 1,
    size: 'md',
    w: 96,
  },
};

const Template: StoryFn<HeadingSkeletonProps> = function Template(args) {
  return <HeadingSkeleton {...args} />;
};

export const Basic = Template.bind({});

export const H2 = Template.bind({});

H2.args = {
  level: 2,
};

export const H3 = Template.bind({});

H3.args = {
  level: 3,
};

export const H4 = Template.bind({});

H4.args = {
  level: 4,
};

export const H5 = Template.bind({});

H5.args = {
  level: 5,
};

export const H6 = Template.bind({});

H6.args = {
  level: 6,
};

export default meta;
