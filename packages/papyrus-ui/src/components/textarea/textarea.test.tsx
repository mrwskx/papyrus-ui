import { render, screen, userEvent } from '../../utils/test-utils';

import { Textarea } from './textarea';

describe('Textarea', () => {
  describe('Given the textarea component with default props', () => {
    describe('When it is rendered', () => {
      it('Then it should render with default values, and the input field should be enabled and empty', () => {
        render(<Textarea />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeEnabled();
        expect(screen.getByRole('textbox')).toHaveValue('');
      });
    });
  });

  describe('Given the textarea component with a placeholder', () => {
    describe('When it is rendered', () => {
      it('Then it should render with the placeholder', () => {
        render(<Textarea placeholder="First Name" />);
        expect(screen.getByRole('textbox')).toHaveAttribute(
          'placeholder',
          'First Name',
        );
      });
    });
  });

  describe('Given the textarea component with `disabled` set to true', () => {
    describe('When it is rendered', () => {
      it('Then it should render with the input field disabled', () => {
        render(<Textarea disabled />);
        expect(screen.getByRole('textbox')).toBeDisabled();
      });
    });
  });

  describe('Given the textarea component with `readOnly` set to true', () => {
    describe('When it is rendered', () => {
      it('Then it should render with the input field readOnly', () => {
        render(<Textarea readOnly />);
        expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
      });
    });
  });

  describe('Given the textarea component with `defaultValue`', () => {
    describe('When it is rendered', () => {
      it('Then it should render with the default value', () => {
        render(<Textarea defaultValue="Bob" />);
        expect(screen.getByRole('textbox')).toHaveValue('Bob');
      });
    });
  });

  describe('Given the textarea component with a valid `startIcon` component', () => {
    describe('When it is rendered', () => {
      it('Then it should render with the startIcon', () => {
        render(<Textarea startIcon={<div data-testid="start-icon" />} />);

        expect(screen.getByTestId('start-icon')).toBeInTheDocument();
      });
    });
  });

  describe('Given the textarea component with a valid `endIcon` component', () => {
    describe('When it is rendered', () => {
      it('Then it should render with the endIcon', () => {
        render(<Textarea endIcon={<div data-testid="end-icon" />} />);

        expect(screen.getByTestId('end-icon')).toBeInTheDocument();
      });
    });
  });

  describe('Given the textarea component with an `onChange` handler', () => {
    describe('When a user types into the input field', () => {
      it('Then it should call the `onChange` handler with the new value', async () => {
        const onChange = vi.fn();
        render(<Textarea defaultValue="" onChange={onChange} />);
        await userEvent.type(screen.getByRole('textbox'), 'Bob');

        expect(onChange).toHaveBeenCalled();
        const [value] =
          onChange['mock'].calls[onChange['mock'].calls.length - 1];
        expect(value).toEqual('Bob');
      });
    });
  });

  describe('Given the textarea component with the `value` prop', () => {
    describe('When it is rendered', () => {
      it('Then it should render with the value', () => {
        render(<Textarea readOnly value="Bob" />);
        expect(screen.getByRole('textbox')).toHaveValue('Bob');
      });
    });

    describe('When the `value` prop changes', () => {
      it('Then it should render with the new value', () => {
        const { rerender } = render(<Textarea readOnly value="Bob" />);
        expect(screen.getByRole('textbox')).toHaveValue('Bob');
        rerender(<Textarea readOnly value="Alice" />);
        expect(screen.getByRole('textbox')).toHaveValue('Alice');
      });
    });
  });
});
