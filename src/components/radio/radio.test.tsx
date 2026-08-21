import { render, screen } from '../../utils/test-utils';

import { Radio } from './radio';

describe('Radio', () => {
  describe('Given the radio component with default props', () => {
    describe('When it is rendered', () => {
      it('Then it should be enabled and unchecked', () => {
        render(<Radio />);
        expect(screen.getByRole('radio')).toBeInTheDocument();
        expect(screen.getByRole('radio')).toBeEnabled();
        expect(screen.getByRole('radio')).not.toBeChecked();
      });
    });
  });

  describe('Given the radio component with text content', () => {
    describe('When it is rendered', () => {
      it('Then it should render that text content', () => {
        render(<Radio value="example">Label</Radio>);
        expect(screen.getByText('Label')).toBeInTheDocument();
      });
    });
  });

  describe('Given the radio component with `disabled` set to true', () => {
    describe('When it is rendered', () => {
      it('Then it should render with the input field disabled', () => {
        render(<Radio disabled />);
        expect(screen.getByRole('radio')).toBeDisabled();
      });
    });
  });

  describe('Given the radio component with `defaultChecked`', () => {
    describe('When it is rendered', () => {
      it('Then it should be checked', () => {
        render(<Radio defaultChecked />);
        expect(screen.getByRole('radio')).toBeChecked();
      });
    });
  });

  describe('Given the radio component with `checked` and `readOnly` props', () => {
    describe('When it is rendered', () => {
      it('Then it should be checked', () => {
        render(<Radio checked readOnly />);
        expect(screen.getByRole('radio')).toBeChecked();
      });
    });
  });
});
