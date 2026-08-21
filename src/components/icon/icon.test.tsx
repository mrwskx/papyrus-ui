import { BiCheck } from 'react-icons/bi';

import { render, screen } from '../../utils/test-utils';
import { IconButton } from '../icon-button';

import { Icon } from './icon';

describe('Icon', () => {
  describe('Given check icon', () => {
    describe('When component is rendered', () => {
      it('Then the `<span>` tag should be rendered', () => {
        const { container } = render(
          <Icon>
            <BiCheck />
          </Icon>,
        );
        expect(container.querySelector('span')).toBeInTheDocument();
      });
    });
  });

  describe('Given an icon component with a specific icon', () => {
    describe('When the component is rendered', () => {
      it('Then it should render the icon element', () => {
        const testId = 'icon';

        render(
          <IconButton>
            <BiCheck data-testid={testId} />
          </IconButton>,
        );

        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });
    });
  });
});
