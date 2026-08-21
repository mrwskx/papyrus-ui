import type { Meta } from '@storybook/react';
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

export function Basic(args: MarkerProps) {
  return (
    <UList className="list-none">
      <li>
        <Marker {...args} />
        List Item
      </li>
    </UList>
  );
}

export default meta;
