import type { Meta, StoryFn } from '@storybook/react';

import { ButtonSkeleton } from './button-skeleton';
import type { ButtonSkeletonProps } from './button-skeleton';

const meta: Meta<ButtonSkeletonProps> = {
  title: 'Feedback/Skeleton/ButtonSkeleton',
  component: ButtonSkeleton,
  args: {
    block: false,
    rounded: false,
    size: 'md',
  },
};

const Template: StoryFn<ButtonSkeletonProps> = function Template(args) {
  return <ButtonSkeleton {...args} />;
};

export const Basic = Template.bind({});

export const SizeSm = Template.bind({});

SizeSm.args = {
  size: 'sm',
};

export const SizeLg = Template.bind({});

SizeLg.args = {
  size: 'lg',
};

export function Block(args: ButtonSkeletonProps) {
  return (
    <div className="w-96">
      <Template {...args} block />{' '}
    </div>
  );
}

export const Rounded = Template.bind({});

Rounded.args = {
  rounded: true,
};

export default meta;
