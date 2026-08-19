import type { Meta, StoryFn } from '@storybook/react';
import { capitalize } from 'lodash';

import { Heading } from './heading';
import type { HeadingLevel, HeadingProps, HeadingFontVariant } from './heading';

const meta: Meta = {
  title: 'Typography/Heading',
  component: Heading,
};

const levels: HeadingLevel[] = [1, 2, 3, 4, 5, 6];

const variants: HeadingFontVariant[] = ['primary', 'secondary'];

const Template: StoryFn<HeadingProps> = function Template(args) {
  return <Heading {...args} />;
};

export const Basic = Template.bind({});

Basic.args = {
  children: 'This is a heading',
};

export function VariantsAndSizes(args: HeadingProps) {
  return (
    <div className="flex flex-wrap mt-8 -mx-6">
      {variants.map(variant => (
        <div key={variant} className="w-full lg:w-1/2 px-6">
          <Heading as="h4" className="text-neutral-500 mb-3" level={6}>
            {capitalize(variant)}
          </Heading>

          <div className="flex flex-col -mt-4">
            {levels.map(level => (
              <div key={level} className="mt-4">
                <Heading
                  {...args}
                  as="div"
                  className="whitespace-nowrap"
                  fontVariant={variant}
                  level={level}
                >
                  Heading H{level}
                </Heading>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default meta;
