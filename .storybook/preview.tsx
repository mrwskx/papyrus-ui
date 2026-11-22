import { DocsContainer } from '@storybook/addon-docs/blocks';
import { withThemeByClassName } from '@storybook/addon-themes';
import type { Decorator, Preview } from '@storybook/react-vite';
import cn from 'classnames';
import { useSyncExternalStore } from 'react';
import type { ComponentProps } from 'react';

import { Code, Heading, Link, OList, Text, UList } from '../src';

import { darkTheme, theme } from './theme';

import './style.css';

// A literal because Storybook's theme math cannot parse var(): slate-975, the
// dark canvas, so docs previews match the Canvas view.
const darkDocsTheme = { ...darkTheme, appContentBg: '#0a1017' };

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ['class'] });

  return () => {
    observer.disconnect();
  };
};

// color-scheme, not the class: with no class the theme follows the system (ADR-0001).
const getIsDark = () =>
  getComputedStyle(document.documentElement).colorScheme === 'dark';

function ThemedDocsContainer(props: ComponentProps<typeof DocsContainer>) {
  const isDark = useSyncExternalStore(subscribe, getIsDark);

  return <DocsContainer {...props} theme={isDark ? darkDocsTheme : theme} />;
}

const preview: Preview = {
  parameters: {
    layout: 'centered',
    viewMode: 'docs',
    backgrounds: {
      options: {
        primary: {
          name: 'Primary',
          value: '#056CF2',
        },

        tertiary: {
          name: 'Tertiary',
          value: '#f7f7f7',
        },

        white: {
          name: 'White',
          value: '#ffffff',
        },

        black: {
          name: 'Black',
          value: '#000000',
        },
      },
    },
    controls: {
      hideNoControlsWarning: true,
    },
    docs: {
      container: ThemedDocsContainer,
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
            as="p"
            className={cn('sb-unstyled my-4 first:mt-0 last:mb-0', className)}
            size="sm"
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
          <Code size="sm" {...props} />
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
