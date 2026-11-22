import cn from 'classnames';
import {
  cloneElement,
  forwardRef,
  HTMLAttributes,
  isValidElement,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import type { IconBaseProps } from 'react-icons';
import { BiEdit, BiTrash, BiUpload } from 'react-icons/bi';

import type { FileOrUrl, Maybe } from '../../../types';
import { Caption } from '../../caption';
import { Icon } from '../../icon';
import { IconButton } from '../../icon-button';
import { Loader } from '../../loader';

const rootBaseClasses = [
  'relative',
  'flex flex-col items-center justify-center',
  'border',
  'bg-sunken',
  'leading-none',
  'transition-all',
  'overflow-hidden',
  'focus:outline-none',
  'focus-visible:ring',
  'focus-visible:ring-offset-0',
];

const rootValidClasses = [
  'focus-visible:border-primary',
  'focus-visible:text-primary',
  'focus-visible:ring-focus',
];

// Rest and active are exclusive: token names, unlike scale steps, do not sort
// so that the active class wins the cascade.
const rootRestClasses = ['border-control', 'text-subtle'];

const rootDroppableClasses = [
  'border-dashed',
  'hover:border-primary',
  'hover:text-primary',
];

const rootActiveClasses = ['border-primary', 'text-primary'];

// The full-strength border, as on InputBox: the tint's border is too faint to
// mark a control's boundary (3:1). It cannot get stronger, so hover tints.
const rootInvalidClasses = [
  'border-danger',
  'text-danger',
  'focus:outline-none',
  'focus-visible:ring',
  'focus-visible:ring-offset-0',
  'focus-visible:ring-danger',
];

const rootInvalidDroppableClasses = ['border-dashed', 'hover:bg-danger-muted'];

const rootReadOnlyClasses = [
  ...rootRestClasses,
  'cursor-default',
  'focus-visible:ring-focus',
];

const rootDisabledClasses = [
  'border-default',
  'text-default',
  'cursor-default',
  'focus-visible:ring-focus',
];

const placeholderClasses = [
  'absolute inset-0',
  'flex flex-col items-center justify-center',
  'w-full h-full',
  'p-2',
];

const imageClasses = ['block', 'w-full h-full', 'object-cover'];

const overlayClasses = [
  'absolute inset-0',
  'flex items-center justify-center',
  'w-full h-full',
  'bg-backdrop',
  'opacity-0',
  'transition-opacity',
  'p-1',
  'hover:opacity-100',
  'focus-within:opacity-100',
];

export type SingleUploadPreviewProps = {
  active?: boolean;
  aspectRatio?: number | string;
  className?: string;
  disabled?: boolean;
  droppable?: boolean;
  editLabel?: string;
  fileName: string;
  height?: number | string;
  icon?: ReactElement;
  index?: number;
  invalid?: boolean;
  loading?: boolean;
  loadingText: string;
  readOnly?: boolean;
  removeLabel: string;
  rounded?: boolean;
  url?: Maybe<FileOrUrl>;
  width?: number | string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onRemove?: (index: number) => void;
} & HTMLAttributes<HTMLDivElement>;

export const SingleUploadPreview = forwardRef<
  HTMLDivElement,
  SingleUploadPreviewProps
>(
  (
    {
      active,
      aspectRatio,
      className,
      disabled,
      droppable,
      editLabel,
      fileName,
      height,
      icon,
      index,
      invalid,
      loading,
      loadingText,
      readOnly,
      removeLabel,
      rounded,
      url,
      width,
      onRemove,
      ...elementProps
    },
    ref,
  ) => {
    const [src, setSrc] = useState<string | undefined>(
      typeof url === 'string' ? url : undefined,
    );

    useEffect(() => {
      const objUrl = url instanceof Blob ? URL.createObjectURL(url) : undefined;
      setSrc(typeof url === 'string' ? url : objUrl);

      return (): void => {
        if (objUrl) {
          URL.revokeObjectURL(objUrl);
        }
      };
    }, [url]);

    const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (index != null && onRemove) {
        onRemove(index);
      }
    };

    return (
      <div
        {...elementProps}
        ref={ref}
        className={cn(
          rootBaseClasses,
          rounded ? 'rounded-pill' : 'rounded-control',
          !disabled &&
            !readOnly && [
              'cursor-pointer',
              invalid
                ? [rootInvalidClasses, droppable && rootInvalidDroppableClasses]
                : [
                    rootValidClasses,
                    droppable && rootDroppableClasses,
                    active ? rootActiveClasses : rootRestClasses,
                  ],
            ],
          disabled && rootDisabledClasses,
          !disabled && readOnly && rootReadOnlyClasses,
          className,
        )}
        style={{
          width,
          height,
          aspectRatio,
        }}
      >
        {src ? (
          <img
            alt={fileName}
            className={cn(imageClasses)}
            height={height}
            src={src}
            width={width}
          />
        ) : (
          <div
            className={cn(placeholderClasses, disabled && 'opacity-disabled')}
          >
            {loading ? (
              <>
                <Loader className="text-lg" />
                <Caption className="mt-1 text-center truncate">
                  {loadingText}
                </Caption>
              </>
            ) : (
              <>
                {isValidElement<IconBaseProps>(icon) ? (
                  cloneElement(icon, {
                    className: 'text-lg',
                  })
                ) : (
                  <Icon className="text-lg">
                    <BiUpload />
                  </Icon>
                )}

                <Caption className="mt-1 text-center truncate">
                  {fileName}
                </Caption>
              </>
            )}
          </div>
        )}

        {src && !disabled && !readOnly && (
          <div className={cn(overlayClasses)}>
            <div className="flex">
              {droppable && (
                <div className="mr-2">
                  <IconButton
                    rounded
                    size="sm"
                    title={editLabel}
                    variant="ghost"
                  >
                    <BiEdit />
                  </IconButton>
                </div>
              )}

              <div>
                <IconButton
                  data-index={index}
                  rounded
                  size="sm"
                  title={removeLabel}
                  variant="ghost"
                  onClick={handleRemove}
                >
                  <BiTrash />
                </IconButton>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);

SingleUploadPreview.displayName = 'SingleUploadPreview';
