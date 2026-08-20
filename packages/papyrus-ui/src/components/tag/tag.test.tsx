import { BiCheck } from 'react-icons/bi';

import { render, screen, userEvent } from '../../utils/test-utils';

import { Tag } from './tag';

describe('Tag', () => {
  describe('Given a tag component with child content', () => {
    describe('When the component is rendered', () => {
      it('Then it should render the child content', () => {
        const { getByText } = render(<Tag>Tag</Tag>);
        expect(getByText('Tag')).toBeInTheDocument();
      });
    });
  });

  describe('Given a tag component with an onClick handler', () => {
    describe('When the component is rendered', () => {
      it('Then the tag should have a role of button', () => {
        render(<Tag onClick={() => {}}>Tag</Tag>);
        expect(screen.getByRole('button')).toBeInTheDocument();
      });

      it('Then the tag should have a tabIndex of 0', () => {
        render(<Tag onClick={() => {}}>Tag</Tag>);
        expect(screen.getByRole('button')).toHaveAttribute('tabIndex', '0');
      });
    });

    describe('When a user clicks on the tag', () => {
      it('Then the onClick handler should be called', () => {
        const onClickMock = vi.fn();
        render(<Tag onClick={onClickMock}>Tag</Tag>);
        screen.getByRole('button').click();
        expect(onClickMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('When a user presses the Enter key on the tag', () => {
      it('Then the onClick handler should be called', async () => {
        const onClickMock = vi.fn();
        render(<Tag onClick={onClickMock}>Tag</Tag>);
        screen.getByRole('button').focus();
        await userEvent.keyboard('{enter}');
        expect(onClickMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('When a user presses the Space key on the tag', () => {
      it('Then the onClick handler should be called', async () => {
        const onClickMock = vi.fn();
        render(<Tag onClick={onClickMock}>Tag</Tag>);
        screen.getByRole('button').focus();
        await userEvent.keyboard('{ }');
        expect(onClickMock).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Given a tag component with disabled prop set to true and an onClick handler', () => {
    describe('When a user clicks on the tag', () => {
      it('Then the onClick handler should not be called', () => {
        const onClickMock = vi.fn();
        render(
          <Tag disabled onClick={onClickMock}>
            Tag
          </Tag>,
        );
        screen.getByRole('button').click();
        expect(onClickMock).not.toHaveBeenCalled();
      });
    });

    describe('When a user presses the Enter key on the tag', () => {
      it('Then the onClick handler should not be called', async () => {
        const onClickMock = vi.fn();
        render(
          <Tag disabled onClick={onClickMock}>
            Tag
          </Tag>,
        );
        screen.getByRole('button').focus();
        await userEvent.keyboard('{enter}');
        expect(onClickMock).not.toHaveBeenCalled();
      });
    });

    describe('When a user presses the Space key on the tag', () => {
      it('Then the onClick handler should not be called', async () => {
        const onClickMock = vi.fn();
        render(
          <Tag disabled onClick={onClickMock}>
            Tag
          </Tag>,
        );
        screen.getByRole('button').focus();
        await userEvent.keyboard('{ }');
        expect(onClickMock).not.toHaveBeenCalled();
      });
    });
  });

  describe('Given a tag component with an icon', () => {
    describe('When the component is rendered', () => {
      it('Then it should render the icon', () => {
        const { container } = render(
          <Tag icon={<BiCheck />}>Tag with icon</Tag>,
        );
        expect(screen.getByText('Tag with icon')).toBeInTheDocument();
        // Icon should be present as an SVG element
        expect(container.querySelector('svg')).toBeInTheDocument();
      });
    });
  });

  describe('Given a tag component with onRemove handler', () => {
    describe('When the component is rendered', () => {
      it('Then it should render the clear-icon component', () => {
        const testId = 'clear-icon';
        render(<Tag onRemove={() => {}}>Tag</Tag>);
        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });

      it('Then the tag should have a role of button', () => {
        render(<Tag onRemove={() => {}}>Tag</Tag>);
        expect(screen.getByRole('button')).toBeInTheDocument();
      });

      it('Then the tag should not have a tabIndex when only onRemove is provided', () => {
        render(<Tag onRemove={() => {}}>Tag</Tag>);
        const button = screen.getByRole('button');
        expect(button).not.toHaveAttribute('tabIndex', '0');
      });
    });
    describe("When a user clicks on the tag's clear-icon", () => {
      it('Then the onRemove handler should be called', () => {
        const onRemoveMock = vi.fn();

        render(<Tag onRemove={onRemoveMock}>Tag</Tag>);

        const clearIcon = screen.getByTestId('clear-icon');
        // The clear icon uses onMouseDown, so we need to trigger that event
        clearIcon.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        expect(onRemoveMock).toHaveBeenCalledTimes(1);
      });
    });

    describe('When a user presses the Del key on the tag', () => {
      it('Then the onRemove handler should be called when tag is focusable', async () => {
        const onRemoveMock = vi.fn();

        render(
          <Tag onClick={() => {}} onRemove={onRemoveMock}>
            Tag
          </Tag>,
        );

        screen.getByRole('button').focus();
        await userEvent.keyboard('{delete}');
        expect(onRemoveMock).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Given a tag component with onRemove handler and disabled prop set to true', () => {
    describe('When the component is rendered', () => {
      it('Then the clear-icon should not be rendered', () => {
        render(
          <Tag disabled onRemove={() => {}}>
            Tag
          </Tag>,
        );

        expect(screen.queryByTestId('clear-icon')).not.toBeInTheDocument();
      });
    });

    describe('When a user presses the Del key on the tag', () => {
      it('Then the onRemove handler should not be called', async () => {
        const onRemoveMock = vi.fn();

        render(
          <Tag disabled onRemove={onRemoveMock}>
            Tag
          </Tag>,
        );

        screen.getByRole('button').focus();
        await userEvent.keyboard('{delete}');
        expect(onRemoveMock).not.toHaveBeenCalled();
      });
    });
  });
});
