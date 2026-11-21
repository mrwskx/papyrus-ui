import { addons } from 'storybook/manager-api';

import { darkTheme, theme } from './theme';

addons.setConfig({
  // Read once at load so the sidebar shows the brand image that suits the system setting.
  theme: window.matchMedia('(prefers-color-scheme: dark)').matches
    ? darkTheme
    : theme,
  isFullscreen: false,
  showPanel: true,
  panelPosition: 'bottom',
  isToolshown: true,
});
