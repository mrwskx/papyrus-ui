import type { StoryFn, Meta } from '@storybook/react';

import { CodeBlock } from './code-block';
import type { CodeBlockProps } from './code-block';

const meta: Meta = {
  title: 'Typography/CodeBlock',
  component: CodeBlock,
  args: {
    children: `function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("World");`,
  },
};

export const Template: StoryFn<CodeBlockProps> = args => (
  <div className="w-full max-w-xl">
    <CodeBlock {...args} />
  </div>
);

export const Basic = Template.bind({});

Basic.args = {
  children: `function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("World");`,
  size: 'md',
  language: 'javascript',
};

export const SmallSize = Template.bind({});

SmallSize.args = {
  children: `const sum = (a, b) => a + b;
console.log(sum(5, 3));`,
  size: 'sm',
  language: 'javascript',
};

export const WithLineNumbers = Template.bind({});

WithLineNumbers.args = {
  children: `import React from 'react';

function App() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;`,
  showLineNumbers: true,
  language: 'tsx',
};

export const LongCode = Template.bind({});

LongCode.args = {
  children: `// This is a very long line of code that should demonstrate horizontal scrolling behavior when wrap is disabled
const veryLongVariableName = "This is a very long string that contains a lot of text and should cause horizontal scrolling in the code block";

function processData(inputData, configurationOptions, additionalParameters) {
  return inputData.map(item => transformItem(item, configurationOptions, additionalParameters));
}`,
  language: 'javascript',
  wrap: false,
};

export const WrappedCode = Template.bind({});

WrappedCode.args = {
  children: `// This demonstrates word wrapping behavior
const veryLongVariableName = "This is a very long string that contains a lot of text and should wrap to the next line when wrap is enabled";

function processData(input, config, params) {
  return input.map(item => transform(item, config, params));
}`,
  language: 'javascript',
  wrap: true,
};

export const PythonCode = Template.bind({});

PythonCode.args = {
  children: `def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# Generate first 10 Fibonacci numbers
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`,
  language: 'python',
  showLineNumbers: true,
};

export const WithCopyCallback = Template.bind({});

WithCopyCallback.args = {
  children: `console.log("This code can be copied!");
alert("Copy functionality works!");`,
  language: 'javascript',
  onCopy: () => alert('Code copied to clipboard!'),
};

export const CustomCopyLabel = Template.bind({});

CustomCopyLabel.args = {
  children: `// This code block has a custom copy button label
const message = "Click the copy button to see the custom label!";
console.log(message);`,
  language: 'javascript',
  copyLabel: 'Copy this code snippet',
};

export const EmptyCodeBlock = Template.bind({});

EmptyCodeBlock.args = {
  children: '',
  language: 'text',
};

export default meta;
