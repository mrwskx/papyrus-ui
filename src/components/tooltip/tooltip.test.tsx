import { render, screen, userEvent, waitFor } from '../../utils/test-utils';

import { Tooltip } from './tooltip';

describe('Tooltip', () => {
  describe('Given a tooltip component with valid title and child element', () => {
    describe('When interacting with the child element', () => {
      it('Then the title should be displayed on hover', async () => {
        render(
          <Tooltip title="This is a tooltip">
            <button type="button">Hover me</button>
          </Tooltip>,
        );

        const button = screen.getByRole('button');
        await userEvent.hover(button);

        await waitFor(() => {
          expect(screen.getByText('This is a tooltip')).toBeVisible();
        });
      });
    });

    describe('When the tooltip is open and user clicks outside the tooltip content', () => {
      it('Then the tooltip.Content should be hidden', async () => {
        render(
          <>
            <button type="button">Outside</button>
            <Tooltip title="This is a tooltip">
              <button type="button">Hover me</button>
            </Tooltip>
          </>,
        );

        await userEvent.hover(screen.getByText('Hover me'));

        await waitFor(() => {
          expect(screen.getByText('This is a tooltip')).toBeVisible();
        });

        await userEvent.click(screen.getByText('Outside'));

        await waitFor(() => {
          expect(
            screen.queryByText('This is a tooltip'),
          ).not.toBeInTheDocument();
        });
      });
    });
  });

  describe('Given a tooltip component with `initialOpen` prop set to true', () => {
    describe("When it's rendered", () => {
      it('Then the tooltip content is visible initially', () => {
        render(
          <Tooltip initialOpen title="This is a tooltip">
            <button type="button">Hover me</button>
          </Tooltip>,
        );

        expect(screen.getByText('This is a tooltip')).toBeVisible();
      });
    });
  });

  describe('Given a tooltip component with `open` prop', () => {
    describe('When the open prop is toggled from false to true', () => {
      it('Then the tooltip should become visible', async () => {
        const { rerender } = render(
          <Tooltip open={false} title="This is a tooltip">
            <button type="button">Hover me</button>
          </Tooltip>,
        );

        expect(screen.queryByText('This is a tooltip')).not.toBeInTheDocument();

        rerender(
          <Tooltip open title="This is a tooltip">
            <button type="button">Hover me</button>
          </Tooltip>,
        );

        await waitFor(() => {
          expect(screen.getByText('This is a tooltip')).toBeVisible();
        });
      });
    });

    describe('When the open prop is toggled from true to false', () => {
      it('Then the tooltip should become hidden', async () => {
        const { rerender } = render(
          <Tooltip open title="This is a tooltip">
            <button type="button">Hover me</button>
          </Tooltip>,
        );

        expect(screen.getByText('This is a tooltip')).toBeVisible();

        rerender(
          <Tooltip open={false} title="This is a tooltip">
            <button type="button">Hover me</button>
          </Tooltip>,
        );

        await waitFor(() => {
          expect(
            screen.queryByText('This is a tooltip'),
          ).not.toBeInTheDocument();
        });
      });
    });
  });

  describe('Given a tooltip component with open and onOpenChange props', () => {
    describe('When the tooltip is triggered and user clicks outside the tooltip content', () => {
      it('Then the onOpenChange callback should be called with the new open state', async () => {
        const onOpenChange = vi.fn();

        render(
          <>
            <button type="button">Outside</button>
            <Tooltip open title="This is a tooltip" onOpenChange={onOpenChange}>
              <button type="button">Hover me</button>
            </Tooltip>
          </>,
        );

        await userEvent.click(screen.getByText('Outside'));

        await waitFor(() => {
          expect(onOpenChange).toHaveBeenCalledWith(false);
        });
      });
    });
  });

  describe('Given a tooltip component with `trigger` set to "focus"', () => {
    describe('When the target element receives focus', () => {
      it('Then the tooltip should be displayed', async () => {
        render(
          <Tooltip title="This is a tooltip" trigger="focus">
            <button type="button">Focus me</button>
          </Tooltip>,
        );

        await userEvent.tab(); // Focus the button

        await waitFor(() => {
          expect(screen.getByText('This is a tooltip')).toBeVisible();
        });
      });
    });

    describe('When the target element loses focus', () => {
      it('Then the tooltip should be hidden', async () => {
        render(
          <Tooltip title="This is a tooltip" trigger="focus">
            <button type="button">Focus me</button>
          </Tooltip>,
        );

        await userEvent.tab(); // Focus the button

        await waitFor(() => {
          expect(screen.getByText('This is a tooltip')).toBeVisible();
        });

        await userEvent.tab(); // Move focus out of the button (blur)

        await waitFor(() => {
          expect(
            screen.queryByText('This is a tooltip'),
          ).not.toBeInTheDocument();
        });
      });
    });
  });

  describe('Given a tooltip component with `trigger` set to "click"', () => {
    describe('When the tooltip trigger is clicked', () => {
      it('Then the tooltip should be displayed', async () => {
        render(
          <Tooltip title="This is a tooltip" trigger="click">
            <button type="button">Click me</button>
          </Tooltip>,
        );

        const button = screen.getByRole('button');
        await userEvent.click(button);

        await waitFor(() => {
          expect(screen.getByText('This is a tooltip')).toBeVisible();
        });
      });
    });

    describe('When the tooltip trigger is clicked again', () => {
      it('Then the tooltip should be hidden', async () => {
        render(
          <Tooltip title="This is a tooltip" trigger="click">
            <button type="button">Click me</button>
          </Tooltip>,
        );

        await userEvent.click(screen.getByText('Click me'));

        await waitFor(() => {
          expect(screen.queryByText('This is a tooltip')).toBeInTheDocument();
        });

        await userEvent.click(screen.getByText('Click me'));

        await waitFor(() => {
          expect(
            screen.queryByText('This is a tooltip'),
          ).not.toBeInTheDocument();
        });
      });
    });
  });
});
