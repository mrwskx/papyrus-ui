import { createContext } from 'react';

import type { SnackbarPlacement } from './snackbar.types';

export interface SnackbarContextValue {
  placement: SnackbarPlacement;
}

export const SnackbarContext = createContext<SnackbarContextValue>({
  placement: 'top-end',
});
