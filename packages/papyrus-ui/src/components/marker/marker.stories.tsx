import type { Meta, StoryFn } from '@storybook/react';
import { BiCheck } from 'react-icons/bi';

import { Icon } from '../icon';
import { UList } from '../u-list';

import { Marker } from './marker';
import type { MarkerProps } from './marker';

const meta: Meta = {
  title: 'Typography/Marker',
  component: Marker,
  args: {
    children: (
      <Icon>
        <BiCheck />
      </Icon>
    ),
  },
};

export const Basic: StoryFn<MarkerProps> = args => (
  <UList className="list-none">
    <li>
      <Marker {...args} />
      List Item
    </li>
  </UList>
);

export default meta;
