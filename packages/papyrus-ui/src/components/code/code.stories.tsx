import type { StoryFn, Meta } from '@storybook/react';

import { Code } from './code';
import type { CodeProps } from './code';

const meta: Meta = {
  title: 'Typography/Code',
  component: Code,
  args: {
    children: 'console.log("Hello World")',
  },
};

export const Template: StoryFn<CodeProps> = args => <Code {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'console.log("Hello World")',
};

export const SmallSize = Template.bind({});

SmallSize.args = {
  children: 'const x = 42;',
  size: 'sm',
};

export const MediumSize = Template.bind({});

MediumSize.args = {
  children: 'function greet() { return "Hello"; }',
  size: 'md',
};

export const InParagraph: StoryFn<CodeProps> = () => (
  <p className="text-body-md-primary">
    To log a message to the console, use <Code>console.log()</Code> in your
    JavaScript code. You can also use <Code size="sm">console.error()</Code> for
    error messages.
  </p>
);

export const VariableNames = Template.bind({});

VariableNames.args = {
  children: 'userName',
};

export const FunctionCall = Template.bind({});

FunctionCall.args = {
  children: 'Math.random()',
};

export const LongCode = Template.bind({});

LongCode.args = {
  children: 'document.querySelector(".my-very-long-class-name")',
};

export default meta;
