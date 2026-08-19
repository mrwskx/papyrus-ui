import type { Meta, StoryFn } from '@storybook/react';

import { RangeSkeleton } from './range-skeleton';
import type { RangeSkeletonProps } from './range-skeleton';

const meta: Meta<RangeSkeletonProps> = {
  title: 'Feedback/Skeleton/RangeSkeleton',
  component: RangeSkeleton,
};

const Template: StoryFn<RangeSkeletonProps> = args => (
  <div className="w-80">
    <RangeSkeleton {...args} />
  </div>
);

export const Basic = Template.bind({});

export default meta;
