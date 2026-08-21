import { render, screen, fireEvent } from '../../utils/test-utils';
import { Checkbox } from '../checkbox';

import { CheckboxGroup } from './checkbox-group';

describe('CheckboxGroup', () => {
  describe('Given the CheckboxGroup component with default props', () => {
    describe('When it is rendered', () => {
      it('Then it should render the checkbox items', () => {
        render(
          <CheckboxGroup name="group1">
            <Checkbox value="1">Label 1</Checkbox>
            <Checkbox value="2">Label 2</Checkbox>
          </CheckboxGroup>,
        );
        expect(screen.getByLabelText('Label 1')).toBeInTheDocument();
        expect(screen.getByLabelText('Label 2')).toBeInTheDocument();
      });

      it('Then it should not check any checkbox by default when value is false', () => {
        render(
          <CheckboxGroup name="group1">
            <Checkbox value="1">Label 1</Checkbox>
            <Checkbox value="2">Label 2</Checkbox>
          </CheckboxGroup>,
        );
        expect(screen.getByLabelText('Label 1')).not.toBeChecked();
        expect(screen.getByLabelText('Label 2')).not.toBeChecked();
      });
    });
  });

  describe('Given the CheckboxGroup component with multiple checkboxes and defaultValue', () => {
    describe('When it is rendered', () => {
      it('Then it should render with selected checkboxes based on the defaultValue array', () => {
        render(
          <CheckboxGroup defaultValue={['1']} name="group1">
            <Checkbox value="1">Label 1</Checkbox>
            <Checkbox value="2">Label 2</Checkbox>
          </CheckboxGroup>,
        );
        expect(screen.getByLabelText('Label 1')).toBeChecked();
        expect(screen.getByLabelText('Label 2')).not.toBeChecked();
      });
    });
  });

  describe('Given the CheckboxGroup component with `disabled` set to true', () => {
    describe('When it is rendered', () => {
      it('Then all checkboxes should be disabled', () => {
        render(
          <CheckboxGroup defaultValue={[]} disabled name="group1">
            <Checkbox value="1">Label 1</Checkbox>
            <Checkbox value="2">Label 2</Checkbox>
          </CheckboxGroup>,
        );
        expect(screen.getByLabelText('Label 1')).toBeDisabled();
        expect(screen.getByLabelText('Label 2')).toBeDisabled();
      });
    });

    describe('When user clicks on checkbox', () => {
      it("Then the checkbox shouldn't change it's state and onChange shouldn't called", () => {
        const onChange = vi.fn();

        render(
          <CheckboxGroup
            defaultValue={[]}
            disabled
            name="group1"
            onChange={onChange}
          >
            <Checkbox value="1">Label 1</Checkbox>
            <Checkbox value="2">Label 2</Checkbox>
          </CheckboxGroup>,
        );

        fireEvent.click(screen.getByLabelText('Label 1'));
        expect(screen.getByLabelText('Label 1')).not.toBeChecked();
        expect(onChange).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('Given CheckboxGroup component with one disabled checkbox', () => {
    describe('When it is rendered', () => {
      it('Then only this checkbox should be disabled', () => {
        render(
          <CheckboxGroup defaultValue={[]} name="group1">
            <Checkbox disabled value="1">
              Label 1
            </Checkbox>
            <Checkbox value="2">Label 2</Checkbox>
          </CheckboxGroup>,
        );
        expect(screen.getByLabelText('Label 1')).toBeDisabled();
        expect(screen.getByLabelText('Label 2')).not.toBeDisabled();
      });
    });

    describe('When user clicks on disabled checkbox', () => {
      it("Then the checkbox shouldn't change it's state and onChange shouldn't be called", () => {
        const onChange = vi.fn();
        render(
          <CheckboxGroup defaultValue={[]} name="group1" onChange={onChange}>
            <Checkbox disabled value="1">
              Label 1
            </Checkbox>
            <Checkbox value="2">Label 2</Checkbox>
          </CheckboxGroup>,
        );
        fireEvent.click(screen.getByLabelText('Label 1'));
        expect(screen.getByLabelText('Label 1')).not.toBeChecked();
        expect(onChange).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('Given the CheckboxGroup component with `readOnly` set to true', () => {
    describe('When it is rendered', () => {
      it('Then all checkboxes should be read-only', () => {
        render(
          <CheckboxGroup defaultValue={[]} name="group1" readOnly>
            <Checkbox value="1">Label 1</Checkbox>
            <Checkbox value="2">Label 2</Checkbox>
          </CheckboxGroup>,
        );
        expect(screen.getByLabelText('Label 1')).toHaveAttribute('readonly');
        expect(screen.getByLabelText('Label 2')).toHaveAttribute('readonly');
      });
    });

    describe('When user clicks on checkbox', () => {
      it("Then the checkbox shouldn't change it's state and onChange shouldn't be called", () => {
        const onChange = vi.fn();
        render(
          <CheckboxGroup
            defaultValue={[]}
            name="group1"
            readOnly
            onChange={onChange}
          >
            <Checkbox value="1">Label 1</Checkbox>
            <Checkbox value="2">Label 2</Checkbox>
          </CheckboxGroup>,
        );

        fireEvent.click(screen.getByLabelText('Label 1'));
        expect(screen.getByLabelText('Label 1')).not.toBeChecked();
        expect(onChange).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('Given CheckboxGroup component with one readonly checkbox', () => {
    describe('When it is rendered', () => {
      it('Then only this checkbox should be readonly', () => {
        render(
          <CheckboxGroup defaultValue={[]} name="group1">
            <Checkbox readOnly value="1">
              Label 1
            </Checkbox>
            <Checkbox value="2">Label 2</Checkbox>
          </CheckboxGroup>,
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
          <CheckboxGroup defaultValue={[]} name="group1" onChange={onChange}>
            <Checkbox readOnly value="1">
              Label 1
            </Checkbox>
            <Checkbox value="2">Label 2</Checkbox>
          </CheckboxGroup>,
        );
        fireEvent.click(screen.getByLabelText('Label 1'));
        expect(screen.getByLabelText('Label 1')).not.toBeChecked();
        expect(onChange).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('Given the CheckboxGroup component with `onChange` callback and default value', () => {
    describe('When a checkbox is clicked', () => {
      it('Then it should call the onChange function with the new value', () => {
        const handleChange = vi.fn();
        render(
          <CheckboxGroup
            defaultValue={[]}
            name="group1"
            onChange={handleChange}
          >
            <Checkbox value="1">Label 1</Checkbox>
            <Checkbox value="2">Label 2</Checkbox>
          </CheckboxGroup>,
        );
        fireEvent.click(screen.getByLabelText('Label 1'));
        expect(handleChange).toHaveBeenCalledWith(['1']);
      });
    });

    describe('When multiple checkboxes are clicked', () => {
      it('Then it should call the onChange function with the updated array of selected values', () => {
        const handleChange = vi.fn();
        render(
          <CheckboxGroup
            defaultValue={[]}
            name="group1"
            value={[]}
            onChange={handleChange}
          >
            <Checkbox value="1">Label 1</Checkbox>
            <Checkbox value="2">Label 2</Checkbox>
          </CheckboxGroup>,
        );
        fireEvent.click(screen.getByLabelText('Label 1'));
        fireEvent.click(screen.getByLabelText('Label 2'));
        expect(handleChange).toHaveBeenCalledWith(['1', '2']);
      });
    });
  });

  describe('Given the CheckboxGroup component with multiple checkboxes', () => {
    describe('When the value prop is set to an empty array', () => {
      it('Then no checkboxes should be checked initially', () => {
        render(
          <CheckboxGroup defaultValue={[]} name="group1" value={[]}>
            <Checkbox value="1">Label 1</Checkbox>
            <Checkbox value="2">Label 2</Checkbox>
            <Checkbox value="3">Label 3</Checkbox>
          </CheckboxGroup>,
        );

        expect(screen.getByLabelText('Label 1')).not.toBeChecked();
        expect(screen.getByLabelText('Label 2')).not.toBeChecked();
        expect(screen.getByLabelText('Label 3')).not.toBeChecked();
      });
    });

    describe('When the value prop is updated to an array of selected checkboxes', () => {
      it('Then the correct checkboxes should be checked', () => {
        const { rerender } = render(
          <CheckboxGroup defaultValue={[]} name="group1" value={['1']}>
            <Checkbox value="1">Label 1</Checkbox>
            <Checkbox value="2">Label 2</Checkbox>
            <Checkbox value="3">Label 3</Checkbox>
          </CheckboxGroup>,
        );

        const checkbox1 = screen.getByLabelText('Label 1');
        const checkbox2 = screen.getByLabelText('Label 2');
        const checkbox3 = screen.getByLabelText('Label 3');

        expect(checkbox1).toBeChecked();
        expect(checkbox2).not.toBeChecked();
        expect(checkbox3).not.toBeChecked();

        // Update the value prop to select checkboxes 1 and 3
        rerender(
          <CheckboxGroup defaultValue={[]} name="group1" value={['1', '3']}>
            <Checkbox value="1">Label 1</Checkbox>
            <Checkbox value="2">Label 2</Checkbox>
            <Checkbox value="3">Label 3</Checkbox>
          </CheckboxGroup>,
        );

        expect(checkbox1).toBeChecked();
        expect(checkbox2).not.toBeChecked();
        expect(checkbox3).toBeChecked();
      });
    });

    describe('When the value prop is updated to a different array of selected checkboxes', () => {
      it('Then the checkboxes should reflect the updated selected values', () => {
        const { rerender } = render(
          <CheckboxGroup defaultValue={[]} name="group1" value={['1', '2']}>
            <Checkbox value="1">Label 1</Checkbox>
            <Checkbox value="2">Label 2</Checkbox>
            <Checkbox value="3">Label 3</Checkbox>
          </CheckboxGroup>,
        );

        const checkbox1 = screen.getByLabelText('Label 1');
        const checkbox2 = screen.getByLabelText('Label 2');
        const checkbox3 = screen.getByLabelText('Label 3');

        expect(checkbox1).toBeChecked();
        expect(checkbox2).toBeChecked();
        expect(checkbox3).not.toBeChecked();

        // Update the value prop to select only checkbox 3
        rerender(
          <CheckboxGroup defaultValue={[]} name="group1" value={['3']}>
            <Checkbox value="1">Label 1</Checkbox>
            <Checkbox value="2">Label 2</Checkbox>
            <Checkbox value="3">Label 3</Checkbox>
          </CheckboxGroup>,
        );

        expect(checkbox1).not.toBeChecked();
        expect(checkbox2).not.toBeChecked();
        expect(checkbox3).toBeChecked();
      });
    });
  });

  describe('Given the CheckboxGroup component with a single checkbox and a boolean default value', () => {
    describe('When a checkbox is clicked', () => {
      it('Then the onChange callback should be triggered when the checkbox is clicked', () => {
        const handleChange = vi.fn();

        // Render the CheckboxGroup with a single checkbox
        render(
          <CheckboxGroup
            defaultValue={false} // Boolean default value
            name="group1"
            onChange={handleChange}
          >
            <Checkbox value="1">Label 1</Checkbox>
          </CheckboxGroup>,
        );

        const checkbox = screen.getByLabelText('Label 1');
        fireEvent.click(checkbox);
        expect(handleChange).toHaveBeenCalledWith(true);
        fireEvent.click(checkbox);
        expect(handleChange).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('Given the CheckboxGroup component with a single checkbox and boolean value', () => {
    describe('When the value prop is set to false', () => {
      it('Then the checkbox should be unchecked initially', () => {
        render(
          <CheckboxGroup defaultValue={false} name="group1" value={false}>
            <Checkbox value="1">Label 1</Checkbox>
          </CheckboxGroup>,
        );
        expect(screen.getByLabelText('Label 1')).not.toBeChecked();
      });
    });

    describe('When the value prop is changed to true', () => {
      it('Then the checkbox should be checked', () => {
        const { rerender } = render(
          <CheckboxGroup defaultValue={false} name="group1" value={false}>
            <Checkbox value="1">Label 1</Checkbox>
          </CheckboxGroup>,
        );

        const checkbox = screen.getByLabelText('Label 1');
        expect(checkbox).not.toBeChecked();

        // Change the value prop to true
        rerender(
          <CheckboxGroup defaultValue={false} name="group1" value>
            <Checkbox value="1">Label 1</Checkbox>
          </CheckboxGroup>,
        );

        expect(checkbox).toBeChecked();
      });
    });

    describe('When the value prop is changed to false again', () => {
      it('Then the checkbox should be unchecked', () => {
        const { rerender } = render(
          <CheckboxGroup defaultValue={false} name="group1" value={false}>
            <Checkbox value="1">Label 1</Checkbox>
          </CheckboxGroup>,
        );

        const checkbox = screen.getByLabelText('Label 1');
        expect(checkbox).not.toBeChecked();

        // Change the value prop to true
        rerender(
          <CheckboxGroup defaultValue={false} name="group1" value>
            <Checkbox value="1">Label 1</Checkbox>
          </CheckboxGroup>,
        );
        expect(checkbox).toBeChecked();

        // Change the value prop back to false
        rerender(
          <CheckboxGroup defaultValue={false} name="group1" value={false}>
            <Checkbox value="1">Label 1</Checkbox>
          </CheckboxGroup>,
        );
        expect(checkbox).not.toBeChecked();
      });
    });
  });
});
