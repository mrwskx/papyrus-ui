import type { Meta, StoryFn } from '@storybook/react';

import { TextSkeleton } from '../text-skeleton';

import { CheckboxSkeleton } from './checkbox-skeleton';
import type { CheckboxSkeletonProps } from './checkbox-skeleton';

const meta: Meta<CheckboxSkeletonProps> = {
  title: 'Feedback/Skeleton/CheckboxSkeleton',
  component: CheckboxSkeleton,
  args: {
    children: (
      <>
        <TextSkeleton className="w-40" />
        <TextSkeleton className="w-40" />
      </>
    ),
  },
};

const Template: StoryFn<CheckboxSkeletonProps> = function Template(args) {
  return <CheckboxSkeleton {...args} />;
};

export const Basic = Template.bind({});

export default meta;
