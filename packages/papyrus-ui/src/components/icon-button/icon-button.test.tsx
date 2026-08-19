import { BiSolidLike } from 'react-icons/bi';

import { render, screen, userEvent } from '../../utils/test-utils';
import { Avatar } from '../avatar';

import { IconButton } from './icon-button';

describe('IconButton', () => {
  describe('Given that the button component is rendered with an onClick callback', () => {
    describe('When the close button is clicked', () => {
      it('Then the onClick callback should be triggered', async () => {
        const onClickMock = vi.fn();

        render(
          <IconButton onClick={onClickMock}>
            <BiSolidLike />
          </IconButton>,
        );

        const buttonElement = screen.getByRole('button');
        await userEvent.click(buttonElement);
        expect(onClickMock).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Given an icon-button component with a specific icon', () => {
    describe('When the component is rendered', () => {
      it('Then it should render the icon element', () => {
        const testId = 'icon-button-icon';

        render(
          <IconButton>
            <BiSolidLike data-testid={testId} />
          </IconButton>,
        );

        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });
    });
  });

  describe('Given an icon-button component with a valid avatar component', () => {
    describe('When the component is rendered', () => {
      it('Then it should render the avatar element', () => {
        const testId = 'icon-button-avatar';

        render(
          <IconButton
            avatar={
              <Avatar data-testid={testId}>
                <img alt='Profile' src='https://i.pravatar.cc/300' />
              </Avatar>
            }
          />,
        );

        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });
    });
  });

  describe('Given an icon-button component used as a link (with an "as" prop as "a")', () => {
    describe('When the component is rendered', () => {
      it('Then it should render the link element', () => {
        const testId = 'icon-button-link';

        render(
          <IconButton as='a' data-testid={testId} href='#'>
            <BiSolidLike />
          </IconButton>,
        );

        const link = screen.getByRole('link');

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('data-testid', testId);
      });
    });
  });
});
