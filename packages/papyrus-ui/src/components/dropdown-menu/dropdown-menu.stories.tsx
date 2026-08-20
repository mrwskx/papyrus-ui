import {
  BiCog,
  BiDotsVerticalRounded,
  BiEnvelope,
  BiGridAlt,
  BiHome,
  BiSolidCrown,
  BiStats,
  BiSupport,
} from 'react-icons/bi';

import { IconButton } from '../icon-button';

import { DropdownMenu } from './dropdown-menu';
import type { DropdownMenuProps } from './dropdown-menu';

export default {
  title: 'Navigation/DropdownMenu',
  component: DropdownMenu,
};

export function Basic(args: DropdownMenuProps) {
  return (
    <div className="flex h-64 justify-center w-96">
      <DropdownMenu {...args}>
        <DropdownMenu.Trigger>
          <IconButton>
            <BiDotsVerticalRounded />
          </IconButton>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item
            endIcon={<BiSolidCrown className="text-primary-600" />}
            selected
            startIcon={<BiHome />}
          >
            Option 1
          </DropdownMenu.Item>

          <DropdownMenu.Item startIcon={<BiEnvelope />}>
            Option 2
          </DropdownMenu.Item>

          <DropdownMenu.Item disabled startIcon={<BiGridAlt />}>
            Option 3
          </DropdownMenu.Item>

          <DropdownMenu.Submenu icon={<BiStats />} label="Option 4">
            <DropdownMenu.Item>Option 4-1</DropdownMenu.Item>
            <DropdownMenu.Item>Option 4-2</DropdownMenu.Item>
            <DropdownMenu.Item>Option 4-3</DropdownMenu.Item>
          </DropdownMenu.Submenu>

          <DropdownMenu.Submenu icon={<BiCog />} label="Option 5">
            <DropdownMenu.Item>Option 5-1</DropdownMenu.Item>
            <DropdownMenu.Item>Option 5-2</DropdownMenu.Item>

            <DropdownMenu.Submenu label="Option 5-3">
              <DropdownMenu.Item>Option 5-3-1</DropdownMenu.Item>
              <DropdownMenu.Item>Option 5-3-2</DropdownMenu.Item>
              <DropdownMenu.Item>Option 5-3-3</DropdownMenu.Item>
            </DropdownMenu.Submenu>
          </DropdownMenu.Submenu>

          <DropdownMenu.Item danger startIcon={<BiSupport />}>
            Option 6
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
}

export function WithDescriptions(args: DropdownMenuProps) {
  return (
    <div className="flex h-64 justify-center w-96">
      <DropdownMenu {...args}>
        <DropdownMenu.Trigger>
          <IconButton>
            <BiDotsVerticalRounded />
          </IconButton>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item
            description="Navigate to the main dashboard"
            endIcon={<BiSolidCrown className="text-primary-600" />}
            selected
            startIcon={<BiHome />}
          >
            Dashboard
          </DropdownMenu.Item>

          <DropdownMenu.Item
            description="View and manage your messages"
            startIcon={<BiEnvelope />}
          >
            Messages
          </DropdownMenu.Item>

          <DropdownMenu.Item
            description="Access your account settings"
            startIcon={<BiCog />}
          >
            Settings
          </DropdownMenu.Item>

          <DropdownMenu.Item
            danger
            description="Get help and support"
            startIcon={<BiSupport />}
          >
            Support
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
}
