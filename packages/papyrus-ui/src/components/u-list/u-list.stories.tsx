import type { Meta, StoryFn } from '@storybook/react';
import { BiCog, BiGridAlt, BiStats } from 'react-icons/bi';

import { Icon } from '../icon';
import { Marker } from '../marker';

import { UList } from './u-list';
import type { UListProps } from './u-list';

const meta: Meta = {
  title: 'Typography/UList',
  component: UList,
};

const Template: StoryFn<UListProps> = args => (
  <div className="min-w-0 sm:min-w-96">
    <UList {...args}>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </UList>
  </div>
);

export const Basic = Template.bind({});

export const WithNoBullets: StoryFn<UListProps> = args => (
  <div className="min-w-0 sm:min-w-96">
    <UList {...args} className="list-none">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </UList>
  </div>
);

export const WithIcons: StoryFn<UListProps> = args => (
  <div className="min-w-0 sm:min-w-96">
    <UList {...args} className="list-none">
      <li>
        <Marker role="none">
          <Icon>
            <BiGridAlt size="1em" />
          </Icon>
        </Marker>
        Item 1
      </li>
      <li>
        <Marker role="none">
          <Icon>
            <BiStats size="1em" />
          </Icon>
        </Marker>
        Item 2
      </li>
      <li>
        <Marker role="none">
          <Icon>
            <BiCog size="1em" />
          </Icon>
        </Marker>
        Item 3
      </li>
    </UList>
  </div>
);

export const NestedList: StoryFn<UListProps> = args => (
  <div className="min-w-0 sm:min-w-96">
    <UList {...args}>
      <li>
        First level item
        <UList className="list-[circle]">
          <li>Nested item 1</li>
          <li>Nested item 2</li>
        </UList>
      </li>
      <li>
        Second level item
        <UList className="list-[circle]">
          <li>Another nested item 1</li>
          <li>Another nested item 2</li>
        </UList>
      </li>
      <li>Third level item</li>
    </UList>
  </div>
);

export const SmallText = Template.bind({});

SmallText.args = {
  size: 'sm',
};

export const PrimaryFont = Template.bind({});

PrimaryFont.args = {
  fontVariant: 'primary',
};

export const SecondaryFont = Template.bind({});

SecondaryFont.args = {
  fontVariant: 'secondary',
};

export const BoldText = Template.bind({});

BoldText.args = {
  bold: true,
};

export default meta;
