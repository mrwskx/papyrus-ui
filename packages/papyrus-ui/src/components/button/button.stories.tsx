import { startCase, upperCase } from 'lodash';
import { BiSolidLike } from 'react-icons/bi';

import { Button } from './button';
import type { ButtonProps, ButtonSize, ButtonVariant } from './button';

const variants: ButtonVariant[] = [
  'primary',
  'secondary',
  'tertiary',
  'plain',
  'info',
  'success',
  'warning',
  'danger',
  'ghost',
];

const sizes: ButtonSize[] = ['sm', 'md', 'lg'];

export default {
  title: 'Inputs/Button',
  component: Button,

  args: {
    children: 'Click Me',
  },
};

export function Basic(args: ButtonProps) {
  return <Button {...args} />;
}

export function Variants(args: ButtonProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap justify-center -mt-4 -mx-2">
        {variants
          .filter(variant => variant !== 'ghost')
          .map((variant, i) => (
            <div
              key={i}
              className="flex justify-center w-1/2 md:w-1/4 mt-4 px-2"
            >
              <Button {...args} variant={variant}>
                {startCase(variant)}
              </Button>
            </div>
          ))}
      </div>
      <div className="bg-gradient-to-br from-primary-800 to-primary-900 py-2">
        <div className="flex flex-wrap justify-center -mt-4 -mx-2">
          {variants
            .filter(variant => variant === 'ghost')
            .map((variant, i) => (
              <div
                key={i}
                className="flex justify-center w-1/2 md:w-1/4 mt-4 px-2"
              >
                <Button {...args} variant={variant}>
                  {startCase(variant)}
                </Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export function Sizes(args: ButtonProps) {
  return (
    <div className="flex items-center flex-wrap -mt-4 -mx-2">
      {sizes.map((size, i) => (
        <div key={i} className="mt-4 px-2">
          <Button {...args} size={size}>
            {upperCase(size)}
          </Button>
        </div>
      ))}
    </div>
  );
}

export function WithIcon(args: ButtonProps) {
  return (
    <div className="flex flex-wrap -mt-4 -mx-2">
      <div className="mt-4 px-2">
        <Button {...args} startIcon={<BiSolidLike />}>
          Start Icon
        </Button>
      </div>

      <div className="mt-4 px-2">
        <Button {...args} endIcon={<BiSolidLike />}>
          End Icon
        </Button>
      </div>
    </div>
  );
}

export function Loading(args: ButtonProps) {
  return <Button {...args} loading />;
}

export function Disabled(args: ButtonProps) {
  return <Button {...args} disabled />;
}

export function AsLink(args: ButtonProps) {
  return <Button {...args} as="a" href="#" />;
}

export function Rounded(args: ButtonProps) {
  return <Button {...args} rounded />;
}
