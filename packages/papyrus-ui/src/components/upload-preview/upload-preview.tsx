import { forwardRef, HTMLAttributes } from 'react';
import type { Accept } from 'react-dropzone';
import { BiImage, BiPlus } from 'react-icons/bi';

import type { FileState } from '../../types';

import { SingleUploadPreview } from './single-upload-preview';

export interface UploadPreviewProps extends HTMLAttributes<HTMLDivElement> {
  accept?: Accept;
  aspectRatio?: number | string;
  className?: string;
  disabled?: boolean;
  editLabel?: string;
  fullWidthPreview?: boolean;
  files: FileState[];
  width?: number | string;
  height?: number | string;
  id?: string;
  invalid?: boolean;
  loadingText?: string;
  maxFiles?: number;
  maxSize?: number;
  minSize?: number;
  multiple?: boolean;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  removeLabel?: string;
  rounded?: boolean;
  onRemove?: (index: number) => void;
}

export const UploadPreview = forwardRef<HTMLDivElement, UploadPreviewProps>(
  (
    {
      aspectRatio,
      className,
      disabled,
      editLabel = 'Edit',
      files,
      fullWidthPreview,
      invalid,
      loadingText = 'Uploading...',
      maxFiles = 10,
      multiple,
      placeholder = 'Upload image',
      readOnly,
      removeLabel = 'Remove',
      rounded,
      width = 112,
      height = 112,
      onRemove,
      ...props
    },
    ref,
  ) => (
    <>
      {multiple && files.length > 0 ? (
        <div className="flex -mt-2 -mx-1 w-full flex-wrap">
          {files.map((file, idx) => (
            <div key={file.name} className="mt-2 px-1">
              <SingleUploadPreview
                aspectRatio={aspectRatio}
                className={className}
                disabled={disabled}
                editLabel={editLabel}
                fileName={file.name}
                height={height}
                icon={<BiImage />}
                index={idx}
                invalid={file.invalid}
                loading={file.loading}
                loadingText={loadingText}
                readOnly={readOnly}
                removeLabel={removeLabel}
                rounded={rounded}
                url={file.url}
                width={width}
                onRemove={onRemove}
              />
            </div>
          ))}

          {files.length < maxFiles && (
            <div className="mt-2 px-1">
              <SingleUploadPreview
                ref={ref}
                aspectRatio={aspectRatio}
                className={className}
                disabled={disabled}
                droppable
                editLabel={editLabel}
                fileName={placeholder}
                height={height}
                icon={<BiPlus />}
                invalid={invalid && !files.length}
                loadingText={loadingText}
                readOnly={readOnly}
                removeLabel={removeLabel}
                rounded={rounded}
                width={width}
                {...props}
              />
            </div>
          )}
        </div>
      ) : (
        <SingleUploadPreview
          ref={ref}
          aspectRatio={
            files.length === 0 && fullWidthPreview && !aspectRatio
              ? 1
              : aspectRatio
          }
          className={className}
          disabled={disabled}
          droppable
          editLabel={editLabel}
          fileName={files[0]?.name || placeholder}
          height={files.length === 0 && fullWidthPreview ? 'auto' : height}
          index={0}
          invalid={invalid || files[0]?.invalid}
          loading={files[0]?.loading}
          loadingText={loadingText}
          readOnly={readOnly}
          removeLabel={removeLabel}
          rounded={rounded}
          url={files[0]?.url}
          width={files.length === 0 && fullWidthPreview ? '100%' : width}
          onRemove={onRemove}
          {...props}
        />
      )}
    </>
  ),
);

UploadPreview.displayName = 'UploadPreview';
