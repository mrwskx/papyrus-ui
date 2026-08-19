import type { StoryFn } from '@storybook/react';
import cn from 'classnames';
import { capitalize } from 'lodash';
import { Fragment } from 'react';
import {
  BiCog,
  BiEnvelope,
  BiGridAlt,
  BiHome,
  BiStats,
  BiSupport,
  BiSolidCrown,
} from 'react-icons/bi';

import { Divider } from '../divider';
import { Heading } from '../heading';

import { MenuBar } from './menu-bar';
import type { MenuBarProps } from './menu-bar';

const variants: Array<MenuBarProps['variant']> = [
  'primary',
  'secondary',
  'ghost',
];

const sizes: Array<MenuBarProps['size']> = ['sm', 'md', 'lg'];

export default {
  title: 'Navigation/MenuBar',
  component: MenuBar,
  args: {
    variant: 'primary',
  },
};

const Template: StoryFn<MenuBarProps> = function Template(args) {
  const { variant } = args;

  return (
    <div>
      <MenuBar {...args}>
        <MenuBar.Item
          endIcon={<BiSolidCrown className="text-primary-600" />}
          selected
          startIcon={<BiHome />}
        >
          Option 1
        </MenuBar.Item>

        <MenuBar.Item startIcon={<BiEnvelope />}>Option 2</MenuBar.Item>

        <MenuBar.Item disabled startIcon={<BiGridAlt />}>
          Option 3
        </MenuBar.Item>

        <MenuBar.Submenu icon={<BiStats />} label="Option 4">
          <MenuBar.Item>Option 4-1</MenuBar.Item>
          <MenuBar.Item>Option 4-2</MenuBar.Item>

          <MenuBar.Submenu label="Option 5-3">
            <MenuBar.Item>Option 4-3-1</MenuBar.Item>
            <MenuBar.Item>Option 4-3-2</MenuBar.Item>
            <MenuBar.Item>Option 4-3-3</MenuBar.Item>
          </MenuBar.Submenu>
        </MenuBar.Submenu>

        <MenuBar.Submenu icon={<BiCog />} label="Option 5">
          <MenuBar.Item>Option 5-1</MenuBar.Item>
          <MenuBar.Item>Option 5-2</MenuBar.Item>
          <MenuBar.Item>Option 5-3</MenuBar.Item>
        </MenuBar.Submenu>

        <MenuBar.Item danger startIcon={<BiSupport />}>
          Option 6
        </MenuBar.Item>
      </MenuBar>
      {variant === 'primary' && <Divider className="text-neutral-200" />}
    </div>
  );
};

export const Basic: StoryFn<MenuBarProps> = Template.bind({});

export function Size(args: MenuBarProps) {
  return (
    <>
      {sizes.map((size, i) => (
        <Fragment key={size}>
          <Heading className={cn('mb-1.5', i > 0 ? 'mt-6' : 'mt-0')} level={3}>
            {capitalize(size)}
          </Heading>

          <Template {...args} key={size} size={size} />
        </Fragment>
      ))}
    </>
  );
}

export function Variant(args: MenuBarProps) {
  return (
    <div className="flex flex-col gap-4">
      {variants.map(variant => (
        <div
          key={variant}
          className={
            variant === 'ghost'
              ? 'bg-gradient-to-br from-primary-800 to-primary-900 px-2 py-4'
              : 'px-2'
          }
        >
          <Heading
            className={variant === 'ghost' ? 'text-white mb-3' : 'mb-3'}
            level={3}
          >
            {capitalize(variant)}
          </Heading>

          <Template {...args} key={variant} variant={variant} />
        </div>
      ))}
    </div>
  );
}

export function WithDescriptions(args: MenuBarProps) {
  const { variant } = args;

  return (
    <div>
      <MenuBar {...args}>
        <MenuBar.Item
          description="Navigate to the main dashboard"
          endIcon={<BiSolidCrown className="text-primary-600" />}
          selected
          startIcon={<BiHome />}
        >
          Dashboard
        </MenuBar.Item>

        <MenuBar.Item
          description="View and manage your messages"
          startIcon={<BiEnvelope />}
        >
          Messages
        </MenuBar.Item>

        <MenuBar.Item
          description="Access your account settings"
          startIcon={<BiCog />}
        >
          Settings
        </MenuBar.Item>

        <MenuBar.Item
          danger
          description="Get help and support"
          startIcon={<BiSupport />}
        >
          Support
        </MenuBar.Item>
      </MenuBar>
      {variant === 'primary' && <Divider className="text-neutral-200" />}
    </div>
  );
}

export const Collapsed = Template.bind({});

Collapsed.args = {
  collapsed: true,
};
