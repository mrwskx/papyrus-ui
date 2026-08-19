import { render, screen, userEvent } from '../../../utils/test-utils';

import { SnackbarItem } from './snackbar-item';

describe('Toast', () => {
  describe('Given that the toast component is rendered with message', () => {
    const content = 'Error message';

    describe('When the toast is displayed', () => {
      it('Then the title should be visible and correctly rendered within the toast', () => {
        render(<SnackbarItem message={content} />);
        const toastElement = screen.getByRole('alert');
        const titleElement = screen.getByText(content);
        expect(toastElement).toContainElement(titleElement);
      });
    });
  });

  describe('Given that the toast component is rendered with an onDismiss callback', () => {
    const dismissLabel = 'Dismiss';
    const onDismissMock = vi.fn();

    describe('When the close button is clicked', () => {
      it('Then the onClose callback should be triggered', async () => {
        render(
          <SnackbarItem
            dismissLabel={dismissLabel}
            message='Message'
            onDismiss={onDismissMock}
          />,
        );
        const closeButton = screen.getByLabelText(dismissLabel);
        await userEvent.click(closeButton);
        expect(onDismissMock).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Given that the toast component is rendered with a specified autoHideDuration and onHide callback', () => {
    const autoCloseTimeout = 1000;
    const onHideMock = vi.fn();

    describe('When the toast is displayed', () => {
      beforeEach(() => {
        vi.useFakeTimers();
      });

      afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
      });

      it('Then the onHide callback should be triggered automatically after the specified duration', () => {
        render(
          <SnackbarItem
            autoHideDuration={autoCloseTimeout}
            message='Message'
            onHide={onHideMock}
          />,
        );

        expect(onHideMock).toHaveBeenCalledTimes(0);
        vi.runAllTimers();
        expect(onHideMock).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Given that the toast component is rendered with additional content', () => {
    const content = 'Error message';

    describe('When the toast is displayed', () => {
      it('Then the title should be visible and correctly rendered within the toast', () => {
        render(<SnackbarItem message='Message'>{content}</SnackbarItem>);
        const toastElement = screen.getByRole('alert');
        const titleElement = screen.getByText(content);
        expect(toastElement).toContainElement(titleElement);
      });
    });
  });

  describe('Given that the toast component is rendered with `actionLabel` and `onActionClick`', () => {
    const actionLabel = 'Action';
    const onActionMock = vi.fn();

    describe('When the toast is displayed', () => {
      it('Then the action should be visible and correctly rendered within the toast', async () => {
        render(
          <SnackbarItem
            actionLabel={actionLabel}
            message='Message'
            onActionClick={onActionMock}
          />,
        );

        const buttonElement = screen.getByTestId('action');
        await userEvent.click(buttonElement);
        expect(onActionMock).toHaveBeenCalledTimes(1);
      });
    });
  });
});
