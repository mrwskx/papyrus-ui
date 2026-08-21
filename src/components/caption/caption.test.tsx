import { render } from '../../utils/test-utils';

import { Caption } from './caption';

describe('Caption', () => {
  describe('Given text with text content', () => {
    describe('When component is rendered', () => {
      it('Then provided text should be displayed', () => {
        const { getByText } = render(<Caption>Text</Caption>);
        expect(getByText('Text')).toBeInTheDocument();
      });
    });
  });
});
