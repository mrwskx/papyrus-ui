import { faker } from '@faker-js/faker';
import type { StoryFn } from '@storybook/react';
import { capitalize } from 'lodash';
import { useRef, useState } from 'react';
import { BiBell } from 'react-icons/bi';

import { Avatar } from '../avatar';
import { Button } from '../button';
import { Icon } from '../icon';

import { Snackbar } from './snackbar';
import type { SnackbarProps } from './snackbar';
import { SnackbarItem } from './snackbar-item';
import type { SnackbarItemVariant } from './snackbar-item';

const meta = {
  title: 'Feedback/Snackbar',
  component: Snackbar,
  subcomponents: {
    SnackbarItem,
  },
};

const AUTO_HIDE_DURATION = 3000;

const variants: SnackbarItemVariant[] = [
  'primary',
  'secondary',
  'info',
  'success',
  'warning',
  'danger',
];

interface SnackbarItemState {
  id: number;
  message: string;
  description: string;
  variant: SnackbarItemVariant;
  onDismiss: () => void;
  onHide: () => void;
}

const Template: StoryFn<SnackbarProps> = function Template(args) {
  const [items, setItems] = useState<readonly SnackbarItemState[]>([]);

  const createdItems = useRef(0);

  const remove = (id: number) => {
    setItems(prevState => prevState.filter(item => item.id !== id));
  };

  const onPush = () => {
    const id = createdItems.current + 1;

    const item = {
      id,
      message: capitalize(faker.lorem.words({ min: 1, max: 3 })),
      description: capitalize(faker.lorem.words({ min: 1, max: 6 })),
      variant: faker.helpers.arrayElement(variants),
      onDismiss: () => remove(id),
      onHide: () => remove(id),
    };

    setItems(prevState => [item, ...prevState]);
    createdItems.current = id;
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-96"
      style={{ width: '60vw' }}
    >
      <Button onClick={onPush}>Push Message</Button>

      <Snackbar {...args}>
        {items.map(({ id, description, ...props }) => (
          <Snackbar.Item
            {...props}
            key={id}
            autoHideDuration={AUTO_HIDE_DURATION}
          >
            {description}
          </Snackbar.Item>
        ))}
      </Snackbar>
    </div>
  );
};

export const Basic = Template.bind({});

export const Placement = Template.bind({});

Placement.args = {
  placement: 'bottom-start',
};

export function Variants(args: SnackbarProps) {
  return (
    <div
      className="flex flex-col items-center justify-center h-96"
      style={{ width: '60vw' }}
    >
      <Snackbar {...args}>
        {variants.map(variant => (
          <Snackbar.Item
            key={variant}
            message={capitalize(faker.lorem.words({ min: 1, max: 3 }))}
            variant={variant}
            onDismiss={() => {
              // Do nothing
            }}
          >
            {capitalize(faker.lorem.words({ min: 1, max: 3 }))}
          </Snackbar.Item>
        ))}
      </Snackbar>
    </div>
  );
}

export function WithAction(args: SnackbarProps) {
  return (
    <div
      className="flex flex-col items-center justify-center h-96"
      style={{ width: '60vw' }}
    >
      <Snackbar {...args}>
        <Snackbar.Item
          actionLabel="View More"
          message={capitalize(faker.lorem.words({ min: 1, max: 3 }))}
          onActionClick={() => {
            // Do nothing
          }}
          onDismiss={() => {
            // Do nothing
          }}
        >
          {capitalize(faker.lorem.words({ min: 1, max: 3 }))}
        </Snackbar.Item>
      </Snackbar>
    </div>
  );
}

export function WithCustomIcon(args: SnackbarProps) {
  return (
    <div
      className="flex flex-col items-center justify-center h-96"
      style={{ width: '60vw' }}
    >
      <Snackbar {...args}>
        <Snackbar.Item
          icon={
            <Icon className="text-3xl text-white">
              <BiBell />
            </Icon>
          }
          message={capitalize(faker.lorem.words({ min: 1, max: 3 }))}
          onDismiss={() => {
            // Do nothing
          }}
        >
          {capitalize(faker.lorem.words({ min: 1, max: 3 }))}
        </Snackbar.Item>
      </Snackbar>
    </div>
  );
}

export function WithAvatar(args: SnackbarProps) {
  return (
    <div
      className="flex flex-col items-center justify-center h-96"
      style={{ width: '60vw' }}
    >
      <Snackbar {...args}>
        <Snackbar.Item
          icon={
            <Avatar size="md">
              <img alt="Profile" src="https://i.pravatar.cc/300" />
            </Avatar>
          }
          message={capitalize(faker.lorem.words({ min: 1, max: 3 }))}
          onDismiss={() => {
            // Do nothing
          }}
        >
          {capitalize(faker.lorem.words({ min: 1, max: 3 }))}
        </Snackbar.Item>
      </Snackbar>
    </div>
  );
}

export default meta;
