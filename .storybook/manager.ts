import { addons } from '@storybook/manager-api';

import { theme } from './theme';

addons.setConfig({
  theme,
  isFullscreen: false,
  showPanel: true,
  panelPosition: 'bottom',
  isToolshown: true,
});
