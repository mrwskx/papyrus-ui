import { render } from '../../utils/test-utils';

import { Label } from '.';

describe('Label', () => {
  describe('Given text with text content', () => {
    describe('When component is rendered', () => {
      it('Then provided text should be displayed', () => {
        const { getByText } = render(<Label>Text</Label>);
        expect(getByText('Text')).toBeInTheDocument();
      });
    });
  });
});
