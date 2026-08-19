import { render, screen, userEvent, waitFor } from '../../utils/test-utils';

import { Alert } from './alert';

describe('Alert', () => {
  describe('Given an alert with default props', () => {
    describe('When the component is rendered', () => {
      it('Then it should display the correct message', () => {
        render(<Alert message='This is a primary alert' variant='primary' />);
        expect(screen.getByText('This is a primary alert')).toBeInTheDocument();
      });
    });
  });

  describe('Given an alert with a close button', () => {
    describe('When the close button is clicked', () => {
      it('Then the onClose handler should be called', async () => {
        const onClose = vi.fn();
        render(
          <Alert
            message='This is an info alert'
            variant='info'
            onClose={onClose}
          >
            Additional info
          </Alert>,
        );

        const closeButton = screen.getByRole('button');
        expect(closeButton).toBeInTheDocument();
        await userEvent.click(closeButton);

        await waitFor(() => {
          expect(onClose).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('Given an alert without a close button', () => {
    describe('When the component is rendered', () => {
      it('Then the close button should not be in the document', () => {
        render(<Alert message='This is a warning alert' variant='warning' />);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
      });
    });
  });

  describe('Given an alert with children content', () => {
    describe('When the component is rendered', () => {
      it('Then the message and children content should be displayed', () => {
        render(
          <Alert message='This is a primary alert' variant='primary'>
            This is extra content
          </Alert>,
        );
        expect(screen.getByText('This is a primary alert')).toBeInTheDocument();
        expect(screen.getByText('This is extra content')).toBeInTheDocument();
      });
    });
  });

  describe('Given an alert with custom close label', () => {
    describe('When the component is rendered', () => {
      it('Then the close button should have the custom aria-label', () => {
        render(
          <Alert
            closeLabel='Dismiss'
            message='This is an info alert'
            variant='info'
            onClose={vi.fn}
          >
            Additional info
          </Alert>,
        );

        const closeButton = screen.getByLabelText('Dismiss');
        expect(closeButton).toBeInTheDocument();
      });
    });
  });
});
