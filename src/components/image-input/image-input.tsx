/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
'use client';

import { FocusEventHandler, ReactNode } from 'react';
import type { Accept } from 'react-dropzone';

import type { FileOrUrl, MaybeMultiValue } from '../../types';
import { useDropzoneUpload } from '../../utils/use-dropzone-upload';
import { useId } from '../../utils/use-id';
import { InputGroup } from '../input-group';
import { UploadPreview } from '../upload-preview';

export interface ImageInputProps<
  Value = unknown,
  IsMulti extends boolean = false,
> {
  accept?: Accept;
  allowedExtensions?: string[];
  aspectRatio?: number | string;
  className?: string;
  defaultValue?: MaybeMultiValue<Value, IsMulti>;
  description?: ReactNode;
  disabled?: boolean;
  editLabel?: string;
  fileInvalidFormatMessage?: string;
  fileTooLargeMessage?: string;
  imageTooSmallMessage?: string;
  fullWidthPreview?: boolean;
  getName?: (file: Value) => string;
  getUrl?: (file: Value) => FileOrUrl;
  id?: string;
  invalid?: boolean;
  label?: ReactNode;
  loadingText?: string;
  maxFiles?: number;
  message?: ReactNode;
  minSize?: number;
  maxSize?: number;
  multiple?: boolean;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  removeLabel?: string;
  rounded?: boolean;
  tooManyFilesMessage?: string;
  uploadFailedMessage?: string;
  value?: MaybeMultiValue<Value, IsMulti>;
  width?: number | string;
  height?: number | string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onChange?: (value: MaybeMultiValue<Value, IsMulti>) => void;
  onUpload?: (files: Blob[]) => Promise<Value[]>;
}

const DEFAULT_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif'];

export function ImageInput<
  Value extends unknown = unknown,
  IsMulti extends boolean = false,
>({
  accept,
  allowedExtensions = DEFAULT_EXTENSIONS,
  aspectRatio,
  className,
  description,
  disabled,
  editLabel = 'Edit',
  fileInvalidFormatMessage = 'Invalid file format',
  fileTooLargeMessage = 'File is too large',
  imageTooSmallMessage = 'File is too small',
  fullWidthPreview,
  id,
  invalid,
  label,
  loadingText = 'Uploading...',
  maxFiles = 10,
  message,
  multiple,
  name,
  placeholder = 'Upload image',
  readOnly,
  rounded,
  removeLabel = 'Remove',
  tooManyFilesMessage = 'Too many media',
  uploadFailedMessage = 'Failed to upload file',
  width = 112,
  height = 112,
  onFocus,
  onBlur,
  ...dzProps
}: ImageInputProps<Value, IsMulti>) {
  const { error, filesState, getInputProps, getRootProps, handleRemove } =
    useDropzoneUpload<Value, IsMulti>({
      accept: {
        'image/*': allowedExtensions,
        ...accept,
      },
      disabled: disabled || readOnly,
      fileInvalidFormatMessage,
      fileTooLargeMessage,
      imageTooSmallMessage,
      maxFiles,
      multiple,
      tooManyFilesMessage,
      uploadFailedMessage,
      ...dzProps,
    });

  const inputId = useId(id);

  return (
    <InputGroup
      description={description}
      htmlFor={inputId}
      invalid={!!error || invalid}
      label={label}
      message={error ?? message}
    >
      <UploadPreview
        {...getRootProps()}
        aspectRatio={aspectRatio}
        className={className}
        disabled={disabled}
        editLabel={editLabel}
        files={filesState}
        fullWidthPreview={fullWidthPreview}
        height={height}
        id={id}
        invalid={!!error || invalid}
        loadingText={loadingText}
        maxFiles={maxFiles}
        multiple={multiple}
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        removeLabel={removeLabel}
        rounded={rounded}
        width={width}
        onBlur={onBlur}
        onFocus={onFocus}
        onRemove={handleRemove}
      />

      <input {...getInputProps()} />
    </InputGroup>
  );
}

ImageInput.displayName = 'ImageInput';
