import type { Meta, StoryFn } from '@storybook/react';

import { ImageInput } from './image-input';
import type { ImageInputProps } from './image-input';

interface NamedImage {
  name: string;
  url: string;
}

const meta: Meta<typeof ImageInput> = {
  title: 'Inputs/ImageInput',
  component: ImageInput,
  args: {
    label: 'Image',
    placeholder: 'Upload image',
  },
};

const Template: StoryFn<ImageInputProps> = function Template(args) {
  return (
    <div className="min-h-[256px] w-[320px]">
      <ImageInput {...args} />
    </div>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  id: 'image-input-basic',
};

export function WithValue(args: ImageInputProps<NamedImage>) {
  return (
    <div className="min-h-[256px] w-[320px]">
      <ImageInput<NamedImage>
        {...args}
        getName={v => v.name}
        getUrl={v => v.url}
        id="image-input-with-value"
        value={{ name: 'Avatar', url: 'https://picsum.photos/id/64/256/256' }}
      />
    </div>
  );
}

export function Multiple(args: ImageInputProps<NamedImage, true>) {
  return (
    <div className="min-h-[256px] w-full max-w-[640px]">
      <ImageInput<NamedImage, true>
        {...args}
        getName={v => v.name}
        getUrl={v => v.url}
        id="image-input-multiple"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        multiple
        value={[
          { name: 'Image 1', url: 'https://picsum.photos/id/1015/256/256' },
          { name: 'Image 2', url: 'https://picsum.photos/id/1024/256/256' },
        ]}
      />
    </div>
  );
}

export const FullWidthPreview = Template.bind({});

FullWidthPreview.args = {
  fullWidthPreview: true,
  id: 'image-input-full-width',
};

export const Rounded = Template.bind({});

Rounded.args = {
  id: 'image-input-rounded',
  rounded: true,
};

export const Description = Template.bind({});

Description.args = {
  description: 'This is a description.',
  id: 'image-input-description',
};

export const Message = Template.bind({});

Message.args = {
  id: 'image-input-message',
  message: 'Just a hint',
};

export const Invalid = Template.bind({});

Invalid.args = {
  id: 'image-input-invalid',
  invalid: true,
  message: 'Something went wrong',
};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
  id: 'image-input-disabled',
};

export const ReadOnly = Template.bind({});

ReadOnly.args = {
  id: 'image-input-readonly',
  readOnly: true,
};

export const AspectRatio = Template.bind({});

AspectRatio.args = {
  aspectRatio: 16 / 9,
  id: 'image-input-aspect-ratio',
};

export const Dimensions = Template.bind({});

Dimensions.args = {
  height: 160,
  id: 'image-input-dimensions',
  width: 160,
};

export default meta;
