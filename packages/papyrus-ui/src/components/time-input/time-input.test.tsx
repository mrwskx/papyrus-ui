import { render, screen, userEvent } from '../../utils/test-utils';

import { TimeInput } from './time-input'; // Import your TimeInput component

describe('TimeInput', () => {
  describe('Given the TimeInput component with default props', () => {
    describe('When it is rendered', () => {
      it('Then it should render with the default value  and the input field should be enabled', () => {
        render(<TimeInput />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeEnabled();
        expect(screen.getByRole('textbox')).toHaveValue('__:__');
      });
    });
  });

  describe('Given the TimeInput component with a placeholder', () => {
    describe('When it is rendered', () => {
      it('Then it should render with the placeholder', () => {
        render(<TimeInput placeholder='HH:MM' />);
        expect(screen.getByRole('textbox')).toHaveAttribute(
          'placeholder',
          'HH:MM',
        );
      });
    });
  });

  describe('Given the TimeInput component with `disabled` set to true', () => {
    describe('When it is rendered', () => {
      it('Then it should render with the input field disabled', () => {
        render(<TimeInput disabled />);
        expect(screen.getByRole('textbox')).toBeDisabled();
      });
    });
  });

  describe('Given the TimeInput component with `readOnly` set to true', () => {
    describe('When it is rendered', () => {
      it('Then it should render with the input field read-only', () => {
        render(<TimeInput readOnly />);
        expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
      });
    });
  });

  describe('Given the TimeInput component with `defaultValue`', () => {
    describe('When it is rendered', () => {
      it('Then it should render with the default value', () => {
        render(<TimeInput defaultValue='12:30' />);
        expect(screen.getByRole('textbox')).toHaveValue('12:30');
      });
    });
  });

  describe('Given the TimeInput component with the `hour12` prop set to true', () => {
    describe('When it is rendered', () => {
      it('Then it should not allow the time to be not in 12-hour format (AM/PM)', () => {
        render(<TimeInput defaultValue='12:30' hour12 />);
        expect(screen.getByRole('textbox')).toHaveValue('12:30');
      });
    });
  });

  describe('Given the TimeInput component with a valid `startIcon` component', () => {
    describe('When it is rendered', () => {
      it('Then it should render with the startIcon', () => {
        render(<TimeInput startIcon={<div data-testid='start-icon' />} />);
        expect(screen.getByTestId('start-icon')).toBeInTheDocument();
      });
    });
  });

  describe('Given the TimeInput component with a valid `endIcon` component', () => {
    describe('When it is rendered', () => {
      it('Then it should render with the endIcon', () => {
        render(<TimeInput endIcon={<div data-testid='end-icon' />} />);
        expect(screen.getByTestId('end-icon')).toBeInTheDocument();
      });
    });
  });

  describe('Given the TimeInput component with `onChange` handler', () => {
    describe('When a user types a value into the input field', () => {
      it('Then it should call the `onChange` handler with the new value', async () => {
        const onChange = vi.fn();
        render(<TimeInput onChange={onChange} />);
        await userEvent.type(screen.getByRole('textbox'), '12:45');

        expect(onChange).toBeCalledWith('12:45');
      });
    });
  });

  describe('Given the TimeInput component with the `value` prop', () => {
    describe('When it is rendered', () => {
      it('Then it should render with the `value`', () => {
        render(<TimeInput value='15:30' />);
        expect(screen.getByRole('textbox')).toHaveValue('15:30');
      });
    });

    describe('When the `value` prop changes', () => {
      it('Then it should render with the new value', () => {
        const { rerender } = render(<TimeInput value='15:30' />);
        expect(screen.getByRole('textbox')).toHaveValue('15:30');
        rerender(<TimeInput value='16:45' />);
        expect(screen.getByRole('textbox')).toHaveValue('16:45');
      });
    });
  });
});
