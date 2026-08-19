import { render, screen, userEvent, waitFor } from '../../utils/test-utils';

import { Dialog } from './dialog';

describe('Dialog', () => {
  describe('Given a dialog component with valid Dialog.Trigger and Dialog.Content components', () => {
    describe('When interacting with the Dialog.Trigger component', () => {
      it('Then the Dialog.Content should be displayed', async () => {
        render(
          <Dialog>
            <Dialog.Trigger>
              <button>Trigger</button>
            </Dialog.Trigger>
            <Dialog.Content>
              <div>Content</div>
            </Dialog.Content>
          </Dialog>,
        );

        const button = screen.getByRole('button');
        await userEvent.click(button);

        await waitFor(() => {
          expect(screen.getByText('Content')).toBeVisible();
        });
      });
    });
  });

  describe('Given a dialog component with `open` prop', () => {
    describe('When the open prop is toggled from false to true', () => {
      it('Then the dialog should become open', async () => {
        const { rerender } = render(
          <Dialog isOpen={false}>
            <Dialog.Trigger>
              <button>Trigger</button>
            </Dialog.Trigger>
            <Dialog.Content>
              <div>Content</div>
            </Dialog.Content>
          </Dialog>,
        );

        expect(screen.queryByText('Content')).not.toBeInTheDocument();

        rerender(
          <Dialog isOpen>
            <Dialog.Trigger>
              <button>Trigger</button>
            </Dialog.Trigger>
            <Dialog.Content>
              <div>Content</div>
            </Dialog.Content>
          </Dialog>,
        );

        await waitFor(() => {
          expect(screen.getByText('Content')).toBeVisible();
        });
      });
    });

    describe('When the open prop is toggled from true to false', () => {
      it('Then the dialog should become hidden', async () => {
        const { rerender } = render(
          <Dialog isOpen>
            <Dialog.Trigger>
              <button>Trigger</button>
            </Dialog.Trigger>
            <Dialog.Content>
              <div>Content</div>
            </Dialog.Content>
          </Dialog>,
        );

        expect(screen.getByText('Content')).toBeVisible();

        rerender(
          <Dialog isOpen={false}>
            <Dialog.Trigger>
              <button>Trigger</button>
            </Dialog.Trigger>
            <Dialog.Content>
              <div>Content</div>
            </Dialog.Content>
          </Dialog>,
        );

        await waitFor(() => {
          expect(screen.queryByText('Content')).not.toBeInTheDocument();
        });
      });
    });
  });

  describe('Given a dialog component with open and onOpenChange props', () => {
    describe('When the popover is opened and user click outside the popover content', () => {
      it('Then the onClose callback should be called', async () => {
        const onClose = vi.fn();

        render(
          <>
            <button>Outside</button>
            <Dialog isOpen onClose={onClose}>
              <Dialog.Trigger>
                <button>Trigger</button>
              </Dialog.Trigger>
              <Dialog.Content>
                <div>Content</div>
              </Dialog.Content>
            </Dialog>
          </>,
        );

        await userEvent.click(screen.getByText('Outside'));

        await waitFor(() => {
          expect(onClose).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('Given a dialog component with the `closeOnEscClick` prop', () => {
    describe('When the `closeOnEscClick` prop is set to true and the user presses the "Escape" key', () => {
      it('Then the dialog should close', async () => {
        const onClose = vi.fn();

        render(
          <Dialog closeOnEscClick onClose={onClose}>
            <Dialog.Trigger>
              <button>Trigger</button>
            </Dialog.Trigger>
            <Dialog.Content>
              <div>Content</div>
            </Dialog.Content>
          </Dialog>,
        );

        await userEvent.click(screen.getByText('Trigger'));

        await waitFor(() => {
          expect(screen.getByText('Content')).toBeVisible();
        });

        await userEvent.keyboard('{escape}');

        await waitFor(() => {
          expect(screen.queryByText('Content')).not.toBeInTheDocument();
        });

        expect(onClose).toHaveBeenCalledTimes(1);
      });
    });

    describe('When the `closeOnEscClick` prop is set to false and the user presses the "Escape" key', () => {
      it('Then the dialog should not close', async () => {
        const onClose = vi.fn();

        render(
          <Dialog closeOnEscClick={false} onClose={onClose}>
            <Dialog.Trigger>
              <button>Trigger</button>
            </Dialog.Trigger>
            <Dialog.Content>
              <div>Content</div>
            </Dialog.Content>
          </Dialog>,
        );

        await userEvent.click(screen.getByText('Trigger'));

        await waitFor(() => {
          expect(screen.getByText('Content')).toBeVisible();
        });

        await userEvent.keyboard('{escape}');

        await waitFor(() => {
          expect(screen.getByText('Content')).toBeInTheDocument();
        });

        expect(onClose).not.toHaveBeenCalled();
      });
    });
  });

  describe('Given a dialog component with the `closeOnOutsideClick` prop', () => {
    describe('When the `closeOnOutsideClick` prop is set to true and the user clicks outside the dialog content', () => {
      it('Then the dialog should close', async () => {
        const onClose = vi.fn();

        render(
          <Dialog closeOnOutsideClick onClose={onClose}>
            <Dialog.Trigger>
              <button>Trigger</button>
            </Dialog.Trigger>
            <Dialog.Content>
              <div>Content</div>
            </Dialog.Content>
          </Dialog>,
        );

        await userEvent.click(screen.getByText('Trigger'));

        await waitFor(() => {
          expect(screen.getByText('Content')).toBeVisible();
        });

        await userEvent.click(screen.getByTestId('overlay'));

        await waitFor(() => {
          expect(screen.queryByText('Content')).not.toBeInTheDocument();
        });

        expect(onClose).toHaveBeenCalledTimes(1);
      });
    });

    describe('When the `closeOnOutsideClick` prop is set to false and the user clicks outside the dialog content', () => {
      it('Then the dialog should not close', async () => {
        const onClose = vi.fn();

        render(
          <>
            <button>Outside</button>
            <Dialog closeOnOutsideClick={false} onClose={onClose}>
              <Dialog.Trigger>
                <button>Trigger</button>
              </Dialog.Trigger>
              <Dialog.Content>
                <div>Content</div>
              </Dialog.Content>
            </Dialog>
          </>,
        );

        await userEvent.click(screen.getByText('Trigger'));

        await waitFor(() => {
          expect(screen.getByText('Content')).toBeVisible();
        });

        await userEvent.click(screen.getByTestId('overlay'));

        await waitFor(() => {
          expect(screen.getByText('Content')).toBeInTheDocument();
        });

        expect(onClose).not.toHaveBeenCalled();
      });
    });
  });
});
