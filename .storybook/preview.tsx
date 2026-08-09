import { withThemeByClassName } from '@storybook/addon-themes';
import type { Decorator, Preview } from '@storybook/react';
import cn from 'classnames';
import { Code, Heading, Link, OList, Text, UList } from 'papyrus-ui';
import type { ComponentProps } from 'react';

import { theme } from './theme';

import './style.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    viewMode: 'docs',
    backgrounds: {
      default: 'White',
      values: [
        {
          name: 'Primary',
          value: '#056CF2',
        },
        {
          name: 'Tertiary',
          value: '#f7f7f7',
        },
        {
          name: 'White',
          value: '#ffffff',
        },
        {
          name: 'Black',
          value: '#000000',
        },
      ],
    },
    controls: {
      hideNoControlsWarning: true,
    },
    docs: {
      theme,
      components: {
        a: Link,
        h1: ({ className, ...props }: ComponentProps<typeof Heading>) => (
          <Heading
            className={cn('sb-unstyled mb-4', className)}
            level={1}
            {...props}
          />
        ),
        h2: ({ className, ...props }: ComponentProps<typeof Heading>) => (
          <Heading
            className={cn(
              'sb-unstyled mt-10 mb-4 pb-1 border-b border-neutral-300 first:mt-0',
              className,
            )}
            level={2}
            {...props}
          />
        ),
        h3: ({ className, ...props }: ComponentProps<typeof Heading>) => (
          <Heading
            className={cn('sb-unstyled my-4 first:mt-0', className)}
            level={3}
            {...props}
          />
        ),
        p: ({ className, ...props }: ComponentProps<typeof Text>) => (
          <Text
            as='p'
            className={cn('sb-unstyled my-4 first:mt-0 last:mb-0', className)}
            size='sm'
            {...props}
          />
        ),
        ul: ({ className, ...props }: ComponentProps<typeof UList>) => (
          <UList
            className={cn('sb-unstyled my-4 first:mt-0 last:mb-0', className)}
            {...props}
          />
        ),
        ol: ({ className, ...props }: ComponentProps<typeof OList>) => (
          <OList
            className={cn('sb-unstyled my-4 first:mt-0 last:mb-0', className)}
            {...props}
          />
        ),
        code: (props: ComponentProps<typeof Code>) => (
          <Code size='sm' {...props} />
        ),
      },
    },
  },
};

export const decorators: Decorator[] = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
];

export default preview;
