import { render, screen, fireEvent } from '../../utils/test-utils';
import { Radio } from '../radio';

import { RadioGroup } from './radio-group';

describe('RadioGroup', () => {
  describe('Given the RadioGroup component with default props', () => {
    describe('When it is rendered', () => {
      it('Then it should render the checkbox items', () => {
        render(
          <RadioGroup name="group1">
            <Radio value="1">Label 1</Radio>
            <Radio value="2">Label 2</Radio>
          </RadioGroup>,
        );
        expect(screen.getByLabelText('Label 1')).toBeInTheDocument();
        expect(screen.getByLabelText('Label 2')).toBeInTheDocument();
      });

      it('Then it should not check any checkbox by default when value is false', () => {
        render(
          <RadioGroup name="group1">
            <Radio value="1">Label 1</Radio>
            <Radio value="2">Label 2</Radio>
          </RadioGroup>,
        );
        expect(screen.getByLabelText('Label 1')).not.toBeChecked();
        expect(screen.getByLabelText('Label 2')).not.toBeChecked();
      });
    });
  });

  describe('Given the RadioGroup component with multiple checkboxes and defaultValue', () => {
    describe('When it is rendered', () => {
      it('Then it should render with selected checkboxes based on the defaultValue array', () => {
        render(
          <RadioGroup defaultValue="1" name="group1">
            <Radio value="1">Label 1</Radio>
            <Radio value="2">Label 2</Radio>
          </RadioGroup>,
        );
        expect(screen.getByLabelText('Label 1')).toBeChecked();
        expect(screen.getByLabelText('Label 2')).not.toBeChecked();
      });
    });
  });

  describe('Given the RadioGroup component with `disabled` set to true', () => {
    describe('When it is rendered', () => {
      it('Then all checkboxes should be disabled', () => {
        render(
          <RadioGroup disabled name="group1">
            <Radio value="1">Label 1</Radio>
            <Radio value="2">Label 2</Radio>
          </RadioGroup>,
        );
        expect(screen.getByLabelText('Label 1')).toBeDisabled();
        expect(screen.getByLabelText('Label 2')).toBeDisabled();
      });
    });

    describe('When user clicks on checkbox', () => {
      it("Then the checkbox shouldn't change it's state and onChange shouldn't called", () => {
        const onChange = vi.fn();

        render(
          <RadioGroup disabled name="group1" onChange={onChange}>
            <Radio value="1">Label 1</Radio>
            <Radio value="2">Label 2</Radio>
          </RadioGroup>,
        );

        fireEvent.click(screen.getByLabelText('Label 1'));
        expect(screen.getByLabelText('Label 1')).not.toBeChecked();
        expect(onChange).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('Given RadioGroup component with one disabled checkbox', () => {
    describe('When it is rendered', () => {
      it('Then only this checkbox should be disabled', () => {
        render(
          <RadioGroup name="group1">
            <Radio disabled value="1">
              Label 1
            </Radio>
            <Radio value="2">Label 2</Radio>
          </RadioGroup>,
        );
        expect(screen.getByLabelText('Label 1')).toBeDisabled();
        expect(screen.getByLabelText('Label 2')).not.toBeDisabled();
      });
    });

    describe('When user clicks on disabled checkbox', () => {
      it("Then the checkbox shouldn't change it's state and onChange shouldn't be called", () => {
        const onChange = vi.fn();
        render(
          <RadioGroup name="group1" onChange={onChange}>
            <Radio disabled value="1">
              Label 1
            </Radio>
            <Radio value="2">Label 2</Radio>
          </RadioGroup>,
        );
        fireEvent.click(screen.getByLabelText('Label 1'));
        expect(screen.getByLabelText('Label 1')).not.toBeChecked();
        expect(onChange).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('Given the RadioGroup component with `readOnly` set to true', () => {
    describe('When it is rendered', () => {
      it('Then all checkboxes should be read-only', () => {
        render(
          <RadioGroup name="group1" readOnly>
            <Radio value="1">Label 1</Radio>
            <Radio value="2">Label 2</Radio>
          </RadioGroup>,
        );
        expect(screen.getByLabelText('Label 1')).toHaveAttribute('readonly');
        expect(screen.getByLabelText('Label 2')).toHaveAttribute('readonly');
      });
    });

    describe('When user clicks on checkbox', () => {
      it("Then the checkbox shouldn't change it's state and onChange shouldn't be called", () => {
        const onChange = vi.fn();
        render(
          <RadioGroup name="group1" readOnly onChange={onChange}>
            <Radio value="1">Label 1</Radio>
            <Radio value="2">Label 2</Radio>
          </RadioGroup>,
        );

        fireEvent.click(screen.getByLabelText('Label 1'));
        expect(screen.getByLabelText('Label 1')).not.toBeChecked();
        expect(onChange).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('Given RadioGroup component with one readonly checkbox', () => {
    describe('When it is rendered', () => {
      it('Then only this checkbox should be readonly', () => {
        render(
          <RadioGroup name="group1">
            <Radio readOnly value="1">
              Label 1
            </Radio>
            <Radio value="2">Label 2</Radio>
          </RadioGroup>,
        );
        expect(screen.getByLabelText('Label 1')).toHaveAttribute('readonly');
        expect(screen.getByLabelText('Label 2')).not.toHaveAttribute(
          'readonly',
        );
      });
    });

    describe('When user clicks on disabled checkbox', () => {
      it("Then the checkbox shouldn't change it's state and onChange shouldn't be called", () => {
        const onChange = vi.fn();
        render(
          <RadioGroup name="group1" onChange={onChange}>
            <Radio readOnly value="1">
              Label 1
            </Radio>
            <Radio value="2">Label 2</Radio>
          </RadioGroup>,
        );
        fireEvent.click(screen.getByLabelText('Label 1'));
        expect(screen.getByLabelText('Label 1')).not.toBeChecked();
        expect(onChange).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('Given the RadioGroup component with `onChange` callback and default value', () => {
    describe('When a checkbox is clicked', () => {
      it('Then it should call the onChange function with the new value', () => {
        const handleChange = vi.fn();
        render(
          <RadioGroup name="group1" onChange={handleChange}>
            <Radio value="1">Label 1</Radio>
            <Radio value="2">Label 2</Radio>
          </RadioGroup>,
        );
        fireEvent.click(screen.getByLabelText('Label 1'));
        expect(handleChange).toHaveBeenCalledWith('1');
      });
    });

    describe('When multiple checkboxes are clicked', () => {
      it('Then it should call the onChange function with the latest selected value', () => {
        const handleChange = vi.fn();
        render(
          <RadioGroup name="group1" onChange={handleChange}>
            <Radio value="1">Label 1</Radio>
            <Radio value="2">Label 2</Radio>
          </RadioGroup>,
        );
        fireEvent.click(screen.getByLabelText('Label 1'));
        fireEvent.click(screen.getByLabelText('Label 2'));
        expect(handleChange).toHaveBeenCalledWith('2');
      });
    });
  });

  describe('Given the RadioGroup component with multiple checkboxes', () => {
    describe('When the value prop is set to an empty array', () => {
      it('Then no checkboxes should be checked initially', () => {
        render(
          <RadioGroup name="group1">
            <Radio value="1">Label 1</Radio>
            <Radio value="2">Label 2</Radio>
            <Radio value="3">Label 3</Radio>
          </RadioGroup>,
        );

        expect(screen.getByLabelText('Label 1')).not.toBeChecked();
        expect(screen.getByLabelText('Label 2')).not.toBeChecked();
        expect(screen.getByLabelText('Label 3')).not.toBeChecked();
      });
    });

    describe('When the value prop is updated to a different selected value', () => {
      it('Then the checkboxes should reflect the updated selected values', () => {
        const { rerender } = render(
          <RadioGroup name="group1" value="1">
            <Radio value="1">Label 1</Radio>
            <Radio value="2">Label 2</Radio>
            <Radio value="3">Label 3</Radio>
          </RadioGroup>,
        );

        const checkbox1 = screen.getByLabelText('Label 1');
        const checkbox2 = screen.getByLabelText('Label 2');
        const checkbox3 = screen.getByLabelText('Label 3');

        expect(checkbox1).toBeChecked();
        expect(checkbox2).not.toBeChecked();
        expect(checkbox3).not.toBeChecked();

        // Update the value prop to select only checkbox 3
        rerender(
          <RadioGroup name="group1" value="3">
            <Radio value="1">Label 1</Radio>
            <Radio value="2">Label 2</Radio>
            <Radio value="3">Label 3</Radio>
          </RadioGroup>,
        );

        expect(checkbox1).not.toBeChecked();
        expect(checkbox2).not.toBeChecked();
        expect(checkbox3).toBeChecked();
      });
    });
  });
});
