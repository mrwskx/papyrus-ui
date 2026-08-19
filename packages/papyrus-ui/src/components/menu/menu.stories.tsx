import type { StoryFn } from '@storybook/react';
import { capitalize } from 'lodash';
import { Fragment, useState } from 'react';
import {
  BiCog,
  BiEnvelope,
  BiGridAlt,
  BiHome,
  BiLeftIndent,
  BiRightIndent,
  BiSolidCrown,
  BiStats,
  BiSupport,
} from 'react-icons/bi';

import { Heading } from '../heading';
import { IconButton } from '../icon-button';

import { Menu } from './menu';
import type { MenuProps } from './menu';

const variants: Array<MenuProps['variant']> = ['primary', 'secondary', 'ghost'];

const sizes: Array<MenuProps['size']> = ['sm', 'md', 'lg'];

export default {
  title: 'Navigation/Menu',
  component: Menu,
  args: {
    variant: 'primary',
  },
};

const Template: StoryFn<MenuProps> = args => (
  <div className={args.collapsed ? '' : 'w-48'}>
    <Menu {...args}>
      <Menu.Item
        endIcon={<BiSolidCrown className="text-primary-600" />}
        selected
        startIcon={<BiHome />}
      >
        Option 1
      </Menu.Item>

      <Menu.Item startIcon={<BiEnvelope />}>Option 2</Menu.Item>

      <Menu.Item disabled startIcon={<BiGridAlt />}>
        Option 3
      </Menu.Item>

      <Menu.Submenu icon={<BiStats />} label="Option 4">
        <Menu.Item>Option 4-1</Menu.Item>
        <Menu.Item>Option 4-2</Menu.Item>
        <Menu.Item>Option 4-3</Menu.Item>
      </Menu.Submenu>

      <Menu.Submenu icon={<BiCog />} label="Option 5">
        <Menu.Item>Option 5-1</Menu.Item>
        <Menu.Item>Option 5-2</Menu.Item>

        <Menu.Submenu label="Option 5-3">
          <Menu.Item>Option 5-3-1</Menu.Item>
          <Menu.Item>Option 5-3-2</Menu.Item>
          <Menu.Item>Option 5-3-3</Menu.Item>
        </Menu.Submenu>
      </Menu.Submenu>

      <Menu.Item danger startIcon={<BiSupport />}>
        Option 6
      </Menu.Item>
    </Menu>
  </div>
);

export const Basic: StoryFn<MenuProps> = Template.bind({});

export const Size: StoryFn<MenuProps> = args => (
  <>
    {sizes.map((size, i) => (
      <Fragment key={i}>
        <Heading className={`mb-1.5 mt-${i > 0 ? '6' : '0'}`} level={3}>
          {capitalize(size)}
        </Heading>

        <Template {...args} key={i} size={size} />
      </Fragment>
    ))}
  </>
);

export const Variant: StoryFn<MenuProps> = args => (
  <div className="flex flex-col gap-4">
    {variants.map((variant, i) => (
      <div
        key={i}
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

        <Template {...args} key={i} variant={variant} />
      </div>
    ))}
  </div>
);

export const WithDescriptions: StoryFn<MenuProps> = args => (
  <div className={args.collapsed ? '' : 'w-48'}>
    <Menu {...args}>
      <Menu.Item
        description="Navigate to the main dashboard"
        endIcon={<BiSolidCrown className="text-primary-600" />}
        selected
        startIcon={<BiHome />}
      >
        Dashboard
      </Menu.Item>

      <Menu.Item
        description="View and manage your messages"
        startIcon={<BiEnvelope />}
      >
        Messages
      </Menu.Item>

      <Menu.Item
        description="Access your account settings"
        startIcon={<BiCog />}
      >
        Settings
      </Menu.Item>

      <Menu.Item
        danger
        description="Get help and support"
        startIcon={<BiSupport />}
      >
        Support
      </Menu.Item>
    </Menu>
  </div>
);

export const Collapsed: StoryFn<MenuProps> = args => {
  const [collapsed, setCollapsed] = useState(true);

  const onCollapsedChange = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <>
      <IconButton
        className="m-1"
        variant="secondary"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <BiRightIndent /> : <BiLeftIndent />}
      </IconButton>

      <Template
        {...args}
        collapsed={collapsed}
        onCollapsedChange={onCollapsedChange}
      />
    </>
  );
};
