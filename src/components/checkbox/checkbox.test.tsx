import { render, screen } from '../../utils/test-utils';

import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  describe('Given the checkbox component with default props', () => {
    describe('When it is rendered', () => {
      it('Then it should be enabled and unchecked', () => {
        render(<Checkbox value="example" />);
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).toBeEnabled();
        expect(screen.getByRole('checkbox')).not.toBeChecked();
      });
    });
  });

  describe('Given the checkbox with text content', () => {
    describe('When it is rendered', () => {
      it('Then it should render that text content', () => {
        render(<Checkbox value="example">Label</Checkbox>);
        expect(screen.getByText('Label')).toBeInTheDocument();
      });
    });
  });

  describe('Given the checkbox component with `disabled` set to true', () => {
    describe('When it is rendered', () => {
      it('Then it should render with the input field disabled', () => {
        render(<Checkbox disabled value="example" />);
        expect(screen.getByRole('checkbox')).toBeDisabled();
      });
    });
  });

  describe('Given the checkbox component with `defaultChecked`', () => {
    describe('When it is rendered', () => {
      it('Then it should be checked', () => {
        render(<Checkbox defaultChecked value="example" />);
        expect(screen.getByRole('checkbox')).toBeChecked();
      });
    });
  });

  describe('Given the checkbox component with the `checked` and `readOnly` props', () => {
    describe('When it is rendered', () => {
      it('Then it should be checked', () => {
        render(<Checkbox checked readOnly value="example" />);
        expect(screen.getByRole('checkbox')).toBeChecked();
      });
    });

    describe('When the `checked` prop changes', () => {
      it('Then it should render with the new value', () => {
        const { rerender } = render(
          <Checkbox checked readOnly value="example" />,
        );

        expect(screen.getByRole('checkbox')).toBeChecked();
        rerender(<Checkbox checked={false} readOnly value="example" />);
        expect(screen.getByRole('checkbox')).not.toBeChecked();
      });
    });
  });
});
