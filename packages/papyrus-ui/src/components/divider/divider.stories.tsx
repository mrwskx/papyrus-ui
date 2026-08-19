import type { Meta, StoryFn } from '@storybook/react';

import { Heading } from '../heading';

import { Divider } from './divider';
import type { DividerProps } from './divider';

const meta: Meta = {
  title: 'Layout/Divider',
};

export const Basic: StoryFn<DividerProps> = args => (
  <div className="w-80">
    <Divider {...args} />
  </div>
);

export const Direction: StoryFn<DividerProps> = args => (
  <>
    <Heading className="mb-4" level={3}>
      Horizontal
    </Heading>

    <div className="w-80">
      <Divider {...args} direction="horizontal" />
    </div>

    <Heading className="mb-4 mt-6" level={3}>
      Vertical
    </Heading>

    <div className="flex h-48 justify-center">
      <Divider {...args} direction="vertical" />
    </div>
  </>
);
export default meta;
