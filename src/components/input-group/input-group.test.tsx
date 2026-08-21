import { render, screen } from '../../utils/test-utils';

import { InputGroup } from './input-group';

describe('InputGroup', () => {
  describe('Given the InputGroup component with a label and an input field', () => {
    describe('When `htmlFor` prop is provided', () => {
      it('Then the label should be associated with the input field', () => {
        render(
          <InputGroup htmlFor="username" label="Username">
            <input id="username" />
          </InputGroup>,
        );
        const label = screen.getByText('Username');
        const input = screen.getByLabelText('Username');
        expect(input).toBeInTheDocument();
        expect(label).toBeInTheDocument();
        expect(label.tagName).toBe('LABEL');
      });
    });

    describe('When `htmlFor` prop is not provided', () => {
      it('Then the label should be rendered as a `span` element', () => {
        render(
          <InputGroup label="Username">
            <input />
          </InputGroup>,
        );
        const label = screen.getByText('Username');
        expect(label.tagName).toBe('SPAN');
      });
    });
  });
});

describe('Given the InputGroup component with a description', () => {
  describe('When the description prop is provided', () => {
    it('Then the description text should be rendered above the input', () => {
      render(
        <InputGroup description="Enter your username" label="Username">
          <input id="username" />
        </InputGroup>,
      );
      const description = screen.getByText('Enter your username');
      expect(description).toBeInTheDocument();
    });
  });
});

describe('Given the InputGroup component with a message', () => {
  describe('When the `invalid` prop is true and a message is provided', () => {
    it('Then the message should be displayed with role="alert"', () => {
      render(
        <InputGroup invalid label="Username" message="Username is required">
          <input id="username" />
        </InputGroup>,
      );
      const message = screen.getByText('Username is required');
      expect(message).toBeInTheDocument();
      expect(message).toHaveAttribute('role', 'alert'); // Assuming error theme are applied.
    });
  });

  describe('When the `invalid` prop is false and a message is provided', () => {
    it('Then the message should be displayed with role="status"', () => {
      render(
        <InputGroup
          invalid={false}
          label="Username"
          message="Please enter your username"
        >
          <input id="username" />
        </InputGroup>,
      );
      const message = screen.getByText('Please enter your username');
      expect(message).toBeInTheDocument();
      expect(message).toHaveAttribute('role', 'status');
    });
  });
});

describe('Given the InputGroup component with children as a fieldset', () => {
  describe('When the `children` prop is passed as a fieldset', () => {
    it('Then the fieldset should be rendered correctly inside the InputGroup', () => {
      render(
        <InputGroup label="Options">
          <fieldset>
            <legend>Choose an option</legend>
          </fieldset>
        </InputGroup>,
      );
      const legend = screen.getByText('Choose an option');
      expect(legend).toBeInTheDocument();
    });
  });
});
