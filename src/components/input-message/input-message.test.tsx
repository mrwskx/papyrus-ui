import { render } from '../../utils/test-utils';

import { InputMessage } from './input-message';

describe('InputMessage', () => {
  describe('Given InputMessage with text content and default props', () => {
    describe('When component is rendered', () => {
      it('Then an element with role="status" with provided text should be in the document', () => {
        const { getByRole } = render(<InputMessage>Text</InputMessage>);
        const element = getByRole('status');
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent('Text');
      });
    });
  });

  describe('Given InputMessage with text content and invalid property set to `true`', () => {
    describe('When component is rendered', () => {
      it('Then an element with role="alert" with provided text should be in the document', () => {
        const { getByRole } = render(<InputMessage invalid>Text</InputMessage>);
        const element = getByRole('alert');
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent('Text');
      });
    });
  });
});
