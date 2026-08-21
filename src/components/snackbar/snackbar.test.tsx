import { render } from '../../utils/test-utils';

import { Snackbar } from './snackbar';

describe('ToastContainer', () => {
  describe('Given toast-container is rendered with toast as children', () => {
    describe('When the toast is displayed', () => {
      it('Then the title should be visible and correctly rendered within the toast', () => {
        const { getByTestId } = render(
          <Snackbar>
            <Snackbar.Item data-testid="toast" message="Error Message" />
          </Snackbar>,
        );

        expect(getByTestId('toast')).toBeInTheDocument();
      });
    });
  });
});
