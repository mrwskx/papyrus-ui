import { render, screen, userEvent, waitFor } from '../../utils/test-utils';

import { Link } from './link';

describe('Link', () => {
  describe('Given a link component with the default "a" element', () => {
    describe('When rendered', () => {
      it('Then the link should render an "a" tag by default', () => {
        render(<Link href="/docs">Link</Link>);
        expect(screen.getByRole('link')).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', '/docs');
      });
    });
  });

  describe('Given a link component with a custom "as" prop', () => {
    describe('When rendered with the "button" element', () => {
      it('Then the link should render a "button" tag', () => {
        render(<Link as="button">Button</Link>);
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveTextContent('Button');
      });
    });

    describe('When rendered with a custom element type', () => {
      it('Then the link should render that custom element', () => {
        render(
          <Link as="span" className="custom-class">
            Custom Element
          </Link>,
        );
        expect(screen.getByText('Custom Element')).toBeInTheDocument();
        expect(screen.getByText('Custom Element').tagName).toBe('SPAN');
        expect(screen.getByText('Custom Element')).toHaveClass('custom-class');
      });
    });
  });

  describe('Given a link component with the "disabled" prop', () => {
    describe('When the disabled prop is set to true', () => {
      it('Then the link should be rendered with disabled theme', () => {
        render(
          <Link as="button" disabled>
            Disabled Link
          </Link>,
        );
        expect(screen.getByText('Disabled Link')).toBeInTheDocument();
        expect(screen.getByText('Disabled Link')).toBeDisabled();
      });
    });

    describe('When the link is disabled and clicked', () => {
      it('Then the link should not trigger any action', async () => {
        const onClick = vi.fn();

        render(
          <Link as="button" disabled onClick={onClick}>
            Disabled Link
          </Link>,
        );

        await userEvent.click(screen.getByText('Disabled Link'));

        await waitFor(() => {
          expect(onClick).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('Given a link component with "className" prop', () => {
    describe('When a custom class is passed', () => {
      it('Then the link should render with the custom class', () => {
        render(<Link className="custom-link-class">Custom Class Link</Link>);
        expect(screen.getByText('Custom Class Link')).toBeInTheDocument();
        expect(screen.getByText('Custom Class Link')).toHaveClass(
          'custom-link-class',
        );
      });
    });
  });

  describe('Given a link component with a click event handler', () => {
    describe('When the link is clicked', () => {
      it('Then the click handler should be called', async () => {
        const onClick = vi.fn();
        render(<Link onClick={onClick}>Clickable Link</Link>);
        await userEvent.click(screen.getByText('Clickable Link'));

        await waitFor(() => {
          expect(onClick).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('Given a link component with "type" prop for button', () => {
    describe('When the type is not provided', () => {
      it('Then the button should have type="button"', () => {
        render(<Link as="button">Button without Type</Link>);
        expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
      });
    });

    describe('When the type is provided as "submit"', () => {
      it('Then the button should have type="submit"', () => {
        render(
          <Link as="button" type="submit">
            Submit Button
          </Link>,
        );
        expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
      });
    });
  });
});
