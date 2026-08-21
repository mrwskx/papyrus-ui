import type { Meta, StoryFn } from '@storybook/react';

import { CaptionSkeleton } from './caption-skeleton';
import type { CaptionSkeletonProps } from './caption-skeleton';

const meta: Meta<CaptionSkeletonProps> = {
  title: 'Feedback/Skeleton/CaptionSkeleton',
  component: CaptionSkeleton,
  args: {
    className: 'w-9',
  },
};

const Template: StoryFn<CaptionSkeletonProps> = function Template(args) {
  return <CaptionSkeleton {...args} />;
};

export const Basic = Template.bind({});

export default meta;
