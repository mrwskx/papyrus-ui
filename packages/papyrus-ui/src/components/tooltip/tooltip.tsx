import type { OffsetOptions, Placement } from '@floating-ui/react';
import type { ReactElement, ReactNode } from 'react';

import { Popover } from '../popover';
import type { PopoverTrigger } from '../popover';
import { Text } from '../text';

export interface TooltipProps {
  /**
   * If `true`, the tooltip will be open by default when the component is rendered.
   *
   * @default false
   */
  initialOpen?: boolean;

  /**
   * The offset of the tooltip relative to its target element. It can be used to adjust the positioning of the tooltip.
   * The `OffsetOptions` allows you to specify the distance from the target element in pixels.
   *
   * @default { mainAxis: 10, alignAxis: 4 }
   */
  offset?: OffsetOptions;

  /**
   * If `true`, the tooltip will be open. It can be controlled programmatically by passing the `open` prop.
   */
  open?: boolean;

  /**
   * Adjusts the padding around the tooltip relative to the viewport's edges.
   * This ensures that the tooltip content is spaced away from the edges of the viewport
   * and prevents it from getting clipped when the tooltip is near the edges of the screen.
   *
   * @default 4
   */
  padding?: number;

  /**
   * The placement of the tooltip relative to the target element.
   *
   * @default 'top'
   */
  placement?: Placement;

  /**
   * The content to display inside the tooltip. Typically used for displaying short informational text.
   */
  title: ReactNode;

  /**
   * The trigger event for showing the tooltip. This controls how and when the tooltip is shown.
   * The `PopoverTrigger` type allows options like hover, focus, and click.
   *
   * @default ['focus', 'hover']
   */
  trigger?: PopoverTrigger | PopoverTrigger[];

  /**
   * Callback function that is triggered when the tooltip's visibility changes.
   * This function is called with the new `open` state, allowing you to manage the visibility of the tooltip externally.
   *
   * @param {boolean} open - The new visibility state of the tooltip. `true` means the tooltip is open, and `false` means it is closed.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * The child element that the tooltip is attached to. The tooltip will be displayed in relation to this element.
   */
  children: ReactElement;
}

const ARROW_WIDTH = 12;
const ARROW_HEIGHT = 6;
const ARROW_PADDING = 4;

const DEFAULT_OFFSET = {
  mainAxis: 10,
  alignAxis: 4,
};

const DEFAULT_TRIGGER: PopoverTrigger[] = ['focus', 'hover'];

export function Tooltip({
  offset = DEFAULT_OFFSET,
  padding = 4,
  placement = 'top',
  title,
  trigger = DEFAULT_TRIGGER,
  children,
  ...props
}: TooltipProps) {
  return (
    <Popover
      {...props}
      arrowPadding={ARROW_PADDING}
      modal={false}
      offset={offset}
      overflowPadding={padding}
      placement={placement}
      role="tooltip"
      trigger={trigger}
    >
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content className="min-h-7 max-w-80 rounded-md bg-black/80 px-2 py-1 shadow-md">
        <Text as="div" className="text-white" size="sm">
          {title}
        </Text>
        <Popover.Arrow
          className="fill-black/80"
          height={ARROW_HEIGHT}
          width={ARROW_WIDTH}
        />
      </Popover.Content>
    </Popover>
  );
}
