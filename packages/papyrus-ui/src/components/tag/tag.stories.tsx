import type { StoryFn } from '@storybook/react';
import { capitalize, toUpper } from 'lodash';
import { BiCheck, BiStar, BiTag } from 'react-icons/bi';

import { Tag } from './tag';
import type { TagProps, TagSize, TagVariant } from './tag';

const sizes: TagSize[] = ['sm', 'md', 'lg'];

const variants: TagVariant[] = [
  'primary',
  'secondary',
  'tertiary',
  'info',
  'success',
  'warning',
  'danger',
  'ghost',
];

export default {
  title: 'Data Display/Tag',
  component: Tag,

  args: {
    children: 'tag title',
  },
};

const Template: StoryFn<TagProps> = function Template(args) {
  return <Tag {...args} />;
};

export const Basic = Template.bind({});

export function Sizes(args: TagProps) {
  return (
    <div className="flex items-center -mt-2 -mx-1 flex-wrap">
      {sizes.map(size => (
        <div key={size} className="mt-2 px-1">
          <Tag {...args} size={size}>
            {toUpper(size)}
          </Tag>
        </div>
      ))}
    </div>
  );
}

export function Variants(args: TagProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap justify-center -mt-4 -mx-2">
        {variants
          .filter(variant => variant !== 'ghost')
          .map(variant => (
            <div key={variant} className="mt-2 px-1">
              <Tag {...args} variant={variant}>
                {capitalize(variant)}
              </Tag>
            </div>
          ))}
      </div>
      <div className="bg-gradient-to-br from-primary-800 to-primary-900 py-2">
        <div className="flex flex-wrap justify-center -mt-4 -mx-2">
          {variants
            .filter(variant => variant === 'ghost')
            .map(variant => (
              <div key={variant} className="mt-4 px-2">
                <Tag {...args} variant={variant}>
                  {capitalize(variant)}
                </Tag>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export const Rounded = Template.bind({});

Rounded.args = {
  rounded: true,
};

export const Clickable = Template.bind({});

Clickable.args = {
  onClick: () => {
    // do nothing
  },
  children: 'Clickable Tag',
};

export const WithIcon = Template.bind({});

WithIcon.args = {
  icon: <BiTag />,
  children: 'Tag with Icon',
};

export const WithIconAndClickable = Template.bind({});

WithIconAndClickable.args = {
  icon: <BiStar />,
  onClick: () => {
    // do nothing
  },
  children: 'Clickable with Icon',
};

export const Removable = Template.bind({});

Removable.args = {
  onRemove: () => {
    // do nothing
  },
  children: 'Removable Tag',
};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
  onRemove: () => {
    // do nothing
  },
  onClick: () => {
    // do nothing
  },
  children: 'Disabled Tag',
};

export function AllVariantsWithIcons(args: TagProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap justify-center -mt-4 -mx-2">
        {variants
          .filter(variant => variant !== 'ghost')
          .map(variant => (
            <div key={variant} className="mt-2 px-1">
              <Tag {...args} icon={<BiCheck />} variant={variant}>
                {toUpper(variant)}
              </Tag>
            </div>
          ))}
      </div>
      <div className="bg-gradient-to-br from-primary-800 to-primary-900 py-2">
        <div className="flex flex-wrap justify-center -mt-4 -mx-2">
          {variants
            .filter(variant => variant === 'ghost')
            .map(variant => (
              <div key={variant} className="mt-4 px-2">
                <Tag {...args} icon={<BiCheck />} variant={variant}>
                  {toUpper(variant)}
                </Tag>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export function AllSizesWithIcons(args: TagProps) {
  return (
    <div className="flex items-center -mt-2 -mx-1 flex-wrap">
      {sizes.map(size => (
        <div key={size} className="mt-2 px-1">
          <Tag {...args} icon={<BiStar />} size={size}>
            {toUpper(size)}
          </Tag>
        </div>
      ))}
    </div>
  );
}

export const RemovableAndClickable = Template.bind({});

RemovableAndClickable.args = {
  onClick: () => {
    alert('Tag clicked!');
  },
  onRemove: () => {
    alert('Tag removed!');
  },
  children: 'Removable & Clickable',
};

export function InteractiveExamples(args: TagProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag {...args} icon={<BiCheck />} onClick={() => alert('Clicked!')}>
        Clickable
      </Tag>
      <Tag {...args} icon={<BiStar />} onRemove={() => alert('Removed!')}>
        Removable
      </Tag>
      <Tag
        {...args}
        icon={<BiTag />}
        onClick={() => alert('Clicked!')}
        onRemove={() => alert('Removed!')}
      >
        Both
      </Tag>
    </div>
  );
}

export function AllInteractiveCombinations(args: TagProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Basic Interactive Tags</h3>
        <div className="flex flex-wrap gap-2">
          <Tag {...args} onClick={() => alert('Basic click!')}>
            Clickable Only
          </Tag>
          <Tag {...args} onRemove={() => alert('Basic remove!')}>
            Removable Only
          </Tag>
          <Tag
            {...args}
            onClick={() => alert('Click!')}
            onRemove={() => alert('Remove!')}
          >
            Clickable & Removable
          </Tag>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">With Icons</h3>
        <div className="flex flex-wrap gap-2">
          <Tag
            {...args}
            icon={<BiCheck />}
            onClick={() => alert('Icon click!')}
          >
            Clickable with Icon
          </Tag>
          <Tag
            {...args}
            icon={<BiStar />}
            onRemove={() => alert('Icon remove!')}
          >
            Removable with Icon
          </Tag>
          <Tag
            {...args}
            icon={<BiTag />}
            onClick={() => alert('Icon click!')}
            onRemove={() => alert('Icon remove!')}
          >
            Both with Icon
          </Tag>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Different Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Tag
            {...args}
            icon={<BiCheck />}
            variant="success"
            onClick={() => alert('Success click!')}
            onRemove={() => alert('Success remove!')}
          >
            Success
          </Tag>
          <Tag
            {...args}
            icon={<BiStar />}
            variant="warning"
            onClick={() => alert('Warning click!')}
            onRemove={() => alert('Warning remove!')}
          >
            Warning
          </Tag>
          <Tag
            {...args}
            icon={<BiTag />}
            variant="danger"
            onClick={() => alert('Danger click!')}
            onRemove={() => alert('Danger remove!')}
          >
            Danger
          </Tag>
        </div>
      </div>
    </div>
  );
}
