import type { Meta, StoryFn } from '@storybook/react';

import { OList } from './o-list';
import type { OListProps } from './o-list';

const meta: Meta = {
  title: 'Typography/OList',
  component: OList,
};

const Template: StoryFn<OListProps> = function Template(args) {
  return (
    <div className="min-w-0 sm:min-w-96">
      <OList {...args}>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </OList>
    </div>
  );
};

export const Basic = Template.bind({});

export function WithCustomNumbering(args: OListProps) {
  return (
    <div className="min-w-0 sm:min-w-96 space-y-4">
      <div>
        <p className="text-sm font-semibold mb-2">Decimal (default)</p>
        <OList {...args} className="list-decimal">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </OList>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Lowercase Roman</p>
        <OList {...args} className="list-[lower-roman]">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </OList>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Lowercase Alpha</p>
        <OList {...args} className="list-[lower-alpha]">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </OList>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">No Numbers</p>
        <OList {...args} className="list-none">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </OList>
      </div>
    </div>
  );
}

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
