import type { Meta, StoryFn } from '@storybook/react';

import { Button } from '../button';

import { Tooltip } from './tooltip';
import type { TooltipProps } from './tooltip';

const meta: Meta<TooltipProps> = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  args: {
    title: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

const Template: StoryFn<TooltipProps> = function Template(args) {
  return <Tooltip {...args} />;
};

export const Basic = Template.bind({});

export const Placement = Template.bind({});

Placement.args = {
  placement: 'right',
};

export const OpenControlled = Template.bind({});

OpenControlled.args = {
  title: 'Controlled open tooltip',
  open: true,
};

export const TriggerOnClick = Template.bind({});

TriggerOnClick.args = {
  title: 'Tooltip triggered on click',
  trigger: 'click',
  children: <Button>Click me</Button>,
};

export default meta;
