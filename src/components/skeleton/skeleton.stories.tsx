import type { Meta } from '@storybook/react';

import { Skeleton } from './skeleton';
import type { SkeletonProps } from './skeleton';

const meta: Meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  args: {
    className: 'w-64 h-10 rounded-lg',
  },
};

export function Basic(args: SkeletonProps) {
  return <Skeleton {...args} />;
}

export default meta;
