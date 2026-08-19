import { BiUser } from 'react-icons/bi';

import { Avatar } from './avatar';
import type { AvatarProps, AvatarSize } from './avatar';

const sizes: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export default {
  title: 'Data Display/Avatar',
  component: Avatar,

  args: {
    placeholder: 'Peter Griffin',
  },
};

export function Basic(args: AvatarProps) {
  return (
    <div className="flex">
      <div className="mr-2">
        <Avatar {...args}>
          <img alt="Profile" src="https://i.pravatar.cc/300" />
        </Avatar>
      </div>

      <div className="mr-2">
        <Avatar {...args} className="bg-warning-500" />
      </div>

      <div>
        <Avatar {...args} icon={<BiUser />} />
      </div>
    </div>
  );
}

export function Sizes(args: AvatarProps) {
  return (
    <div className="flex items-center">
      {sizes.map((size, i) => (
        <div key={i} className={i ? 'ml-2' : ''}>
          <Avatar {...args} size={size}>
            <img alt="Profile" src="https://i.pravatar.cc/300" />
          </Avatar>
        </div>
      ))}
    </div>
  );
}

export function Rounded(args: AvatarProps) {
  return (
    <div className="flex">
      <div className="mr-2">
        <Avatar {...args}>
          <img alt="Profile" src="https://i.pravatar.cc/300" />
        </Avatar>
      </div>

      <div>
        <Avatar {...args} icon={<BiUser />} />
      </div>
    </div>
  );
}
