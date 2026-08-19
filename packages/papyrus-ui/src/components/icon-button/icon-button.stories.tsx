import { startCase } from 'lodash';
import { BiSolidLike } from 'react-icons/bi';

import { Avatar } from '../avatar';

import { IconButton } from './icon-button';
import type {
  IconButtonProps,
  IconButtonSize,
  IconButtonVariant,
} from './icon-button';

const variants: IconButtonVariant[] = [
  'primary',
  'secondary',
  'tertiary',
  'plain',
  'ghost',
];

const sizes: IconButtonSize[] = ['sm', 'md', 'lg'];

export default {
  title: 'Inputs/IconButton',
  component: IconButton,

  args: {
    children: <BiSolidLike />,
  },
};

export function Basic(args: IconButtonProps) {
  return <IconButton {...args} />;
}

export function Variants(args: IconButtonProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap justify-center -mt-4 -mx-2">
        {variants
          .filter(variant => variant !== 'ghost')
          .map(variant => (
            <div
              key={variant}
              className="mt-4 px-2"
              title={`${startCase(variant)} variant IconButton`}
            >
              <IconButton
                {...args}
                title={`${startCase(variant)} variant IconButton`}
                variant={variant}
              />
            </div>
          ))}
      </div>
      <div className="bg-gradient-to-br from-primary-800 to-primary-900 py-2">
        <div className="flex flex-wrap justify-center -mt-4 -mx-2">
          {variants
            .filter(variant => variant === 'ghost')
            .map(variant => (
              <div key={variant} className="mt-4 px-2">
                <IconButton {...args} variant={variant} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export function Sizes(args: IconButtonProps) {
  return (
    <div className="flex items-center flex-wrap -mt-4 -mx-2">
      {sizes.map(size => (
        <div key={size} className="mt-4 px-2">
          <IconButton {...args} size={size} title={`${size} size IconButton`} />
        </div>
      ))}
    </div>
  );
}

export function Rounded(args: IconButtonProps) {
  return <IconButton {...args} rounded />;
}

export function WithAvatar(args: IconButtonProps) {
  return (
    <IconButton
      {...args}
      avatar={
        <Avatar>
          <img alt="Profile" src="https://i.pravatar.cc/300" />
        </Avatar>
      }
      rounded
      variant="tertiary"
    />
  );
}
