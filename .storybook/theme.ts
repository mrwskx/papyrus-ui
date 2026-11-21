import { create } from 'storybook/theming';

const brand = {
  brandTitle: 'Papyrus UI',
  colorPrimary: '#326eb7',
  colorSecondary: '#326eb7',
  fontBase: '"DM Sans", sans-serif',
  fontCode: '"IBM Plex Mono", monospace',
};

export const theme = create({
  ...brand,
  base: 'light',
  brandImage: '/images/logo-light.svg',
});

export const darkTheme = create({
  ...brand,
  base: 'dark',
  brandImage: '/images/logo-dark.svg',
});
