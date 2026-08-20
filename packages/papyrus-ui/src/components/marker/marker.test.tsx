import { BiCheck } from 'react-icons/bi';

import { render } from '../../utils/test-utils';

import { Marker } from './marker';

describe('Marker', () => {
  describe('Given marker with icon child component', () => {
    describe('When component is rendered', () => {
      it('Then the correct icon should be rendered', () => {
        const { getByTestId } = render(
          <Marker>
            <BiCheck data-testid="icon" />
          </Marker>,
        );

        expect(getByTestId('icon')).toBeInTheDocument();
      });
    });
  });
});
