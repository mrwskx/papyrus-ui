import type { Meta, StoryFn } from '@storybook/react';
import cn from 'classnames';
import { capitalize } from 'lodash';
import { Fragment } from 'react';
import { BiBell } from 'react-icons/bi';

import { Avatar } from '../avatar';
import { Heading } from '../heading';

import { Alert } from './alert';
import type { AlertProps, AlertVariant } from './alert';

const meta: Meta = {
  title: 'Feedback/Alert',
  args: {
    variant: 'primary',
    message: 'Alert message',
    children: 'Alert description',
  },
};

const Template: StoryFn<AlertProps> = args => (
  <div className="w-80">
    <Alert {...args} />
  </div>
);

export const Basic = Template.bind({});

const VARIANTS: AlertVariant[] = [
  'primary',
  'info',
  'success',
  'warning',
  'danger',
];

export const Variants: StoryFn<AlertProps> = args => (
  <div className="w-80">
    {VARIANTS.map((variant, i) => (
      <Fragment key={i}>
        <Heading className={cn('mb-1.5', i > 0 ? 'mt-6' : 'mt-0')} level={3}>
          {capitalize(variant)}
        </Heading>

        <Template
          {...args}
          message={`${capitalize(variant)} Alert`}
          variant={variant}
        />
      </Fragment>
    ))}
  </div>
);

export const WithCloseButton = Template.bind({});

WithCloseButton.args = {
  onClose: () => {
    // Do nothing
  },
};

export const WithCustomIcon = Template.bind({});

WithCustomIcon.args = {
  icon: <BiBell />,
};

export const WithAvatar = Template.bind({});

WithAvatar.args = {
  icon: (
    <Avatar size="md">
      <img alt="Profile" src="https://i.pravatar.cc/300" />
    </Avatar>
  ),
};

export default meta;
