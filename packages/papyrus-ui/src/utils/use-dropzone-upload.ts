import { useCallback, useEffect, useState } from 'react';
import { ErrorCode, useDropzone } from 'react-dropzone';
import type { Accept, FileError, FileRejection } from 'react-dropzone';

import type { FileOrUrl, FileState, Maybe, MaybeMultiValue } from '../types';

export interface UseDropzoneUploadProps<
  Value = unknown,
  IsMulti extends boolean = false,
> {
  readonly accept?: Accept;
  readonly defaultValue?: MaybeMultiValue<Value, IsMulti>;
  readonly disabled?: boolean;
  readonly editable?: boolean;
  readonly fileInvalidFormatMessage?: string;
  readonly fileTooLargeMessage?: string;
  readonly imageTooSmallMessage?: string;
  readonly getName?: (file: Value) => string;
  readonly getUrl?: (file: Value) => FileOrUrl;
  readonly maxFiles?: number;
  readonly maxSize?: number;
  readonly minSize?: number;
  readonly multiple?: boolean;
  readonly noKeyboard?: boolean;
  readonly tooManyFilesMessage?: string;
  readonly uploadFailedMessage?: string;
  readonly value?: MaybeMultiValue<Value, IsMulti>;
  readonly onUpload?: (files: Blob[]) => Promise<readonly Value[]>;
  readonly onChange?: (value: MaybeMultiValue<Value, IsMulti>) => void;
}

function defaultGetUrl(data: unknown): FileOrUrl {
  return data instanceof File ? data : '';
}

function defaultGetName(data: unknown): string {
  return data instanceof File ? data.name : '';
}

function defaultUploadHandler<T>(files: Blob[]): Promise<T[]> {
  return Promise.resolve(files as unknown as T[]);
}

function getFilesState<Data>(
  val: unknown,
  getName: (data: Data) => string,
  getUrl: (data: Data) => FileOrUrl,
): FileState[] {
  let arr: Data[] = [];

  if (Array.isArray(val)) {
    arr = val as Data[];
  } else if (val != null) {
    arr = [val as Data];
  }

  return arr.map(data => ({
    data,
    file: null,
    invalid: false,
    loading: false,
    name: getName(data),
    url: getUrl(data),
  }));
}

function createLoadingState(file: File): FileState {
  return {
    file,
    name: file.name,
    data: null,
    invalid: false,
    loading: true,
    url: undefined,
  };
}

function createInvalidState({ file }: FileRejection): FileState {
  return {
    file,
    name: file.name,
    data: null,
    invalid: true,
    loading: false,
    url: undefined,
  };
}

export function useDropzoneUpload<
  Value = unknown,
  IsMulti extends boolean = false,
>({
  accept,
  defaultValue,
  disabled,
  editable,
  fileInvalidFormatMessage,
  fileTooLargeMessage,
  imageTooSmallMessage,
  getName = defaultGetName,
  getUrl = defaultGetUrl,
  maxFiles,
  maxSize,
  minSize,
  multiple,
  noKeyboard,
  tooManyFilesMessage,
  uploadFailedMessage,
  value,
  onChange,
  onUpload = defaultUploadHandler,
}: UseDropzoneUploadProps<Value, IsMulti>) {
  const [filesState, setFilesState] = useState<FileState[]>(() =>
    getFilesState(defaultValue, getName, getUrl),
  );

  const [fileToEdit, setFileToEdit] = useState<Maybe<File>>(null);
  const [error, setError] = useState<Maybe<string>>(null);
  const isControlled = typeof value !== 'undefined';

  const updateFilesState = useCallback(
    (data: unknown) => {
      const items = getFilesState(data, getName, getUrl);

      if (multiple) {
        setFilesState(prev => prev.filter(v => v.data == null).concat(items));
      } else {
        setFilesState(items);
      }
    },
    [getName, getUrl, multiple],
  );

  const changeFiles = useCallback(
    (next: unknown): void => {
      // call onChange if controlled input, otherwise change internal state directly
      if (isControlled) {
        onChange?.(next as MaybeMultiValue<Value, IsMulti>);
      } else {
        updateFilesState(next);
      }
    },
    [isControlled, onChange, updateFilesState],
  );

  const uploadFiles = useCallback(
    async (files: Blob[]): Promise<void> => {
      try {
        const data = await onUpload(files);

        setFilesState(prev => {
          // validate next value and call change handler
          if (multiple) {
            const nextData = prev
              .filter(item => item.data != null)
              .map(item => item.data)
              .concat(data);

            changeFiles(nextData);
          } else {
            changeFiles(data[0]);
          }

          // remove intermediate loading state of current media from filesState
          return prev.filter(v => !v.file || !files.includes(v.file));
        });
      } catch (e) {
        // The upload error is otherwise swallowed; consumers only ever see the
        // generic uploadFailedMessage.
        // eslint-disable-next-line no-console
        console.error(e);
        setError(uploadFailedMessage);
        // replace intermediate loading state of current media with invalid state
        setFilesState(prev =>
          prev.map(item =>
            item.file && files.includes(item.file)
              ? { ...item, loading: false, invalid: true }
              : item,
          ),
        );
      }
    },
    [changeFiles, multiple, onUpload, uploadFailedMessage],
  );

  const getMessageByFileError = useCallback(
    (fileError: FileError) => {
      switch (fileError.code as ErrorCode) {
        case ErrorCode.FileInvalidType:
          return fileInvalidFormatMessage;
        case ErrorCode.FileTooSmall:
          return imageTooSmallMessage;
        case ErrorCode.FileTooLarge:
          return fileTooLargeMessage;
        case ErrorCode.TooManyFiles:
          return tooManyFilesMessage;
        default:
          return null;
      }
    },
    [
      fileInvalidFormatMessage,
      fileTooLargeMessage,
      imageTooSmallMessage,
      tooManyFilesMessage,
    ],
  );

  const handleDrop = useCallback(
    (_: File[], rejected: FileRejection[]): void => {
      const firstError = rejected.find(r => r.errors.length > 0)?.errors[0];
      setError(firstError ? getMessageByFileError(firstError) : null);
    },
    [getMessageByFileError],
  );

  const handleDropAccepted = useCallback(
    (dropped: File[]) => {
      // if editable, set editing file
      if (editable) {
        setFileToEdit(dropped[0]);
        return;
      }
      // otherwise, set intermediate loading state for current media to filesState
      // and upload them
      const loadingState = dropped.map(createLoadingState);

      setFilesState(prev => {
        if (maxFiles && prev.length + loadingState.length > maxFiles) {
          setError(tooManyFilesMessage);
          return prev;
        }

        return prev.concat(loadingState);
      });

      void uploadFiles(dropped);
    },
    [editable, maxFiles, tooManyFilesMessage, uploadFiles],
  );

  const handleDropRejected = useCallback(
    (rejected: FileRejection[]): void => {
      const rejectedState: FileState[] = rejected.map(createInvalidState);

      if (multiple) {
        setFilesState(prev => prev.concat(rejectedState));
      } else {
        setFilesState(rejectedState);
      }
    },
    [multiple],
  );

  const { getInputProps, getRootProps } = useDropzone({
    accept,
    disabled,
    maxFiles,
    maxSize,
    minSize,
    multiple: multiple && !editable,
    noKeyboard,
    onDrop: handleDrop,
    onDropAccepted: handleDropAccepted,
    onDropRejected: handleDropRejected,
  });

  const handleCancelEdit = useCallback((): void => {
    setFileToEdit(null);
  }, []);

  const handleSaveEdit = useCallback(
    (file: File) => {
      setFilesState(prev => {
        const loadingState = createLoadingState(file);
        return prev.concat(loadingState);
      });

      setFileToEdit(null);
      void uploadFiles([file]);
    },
    [uploadFiles],
  );

  const handleRemove = useCallback(
    (index: number) => {
      setFilesState(prev => {
        const next = [...prev];
        next.splice(index, 1);

        if (!next.some(item => item.invalid)) {
          setError(null);
        }

        const nextData = multiple
          ? next.filter(item => item.data != null).map(item => item.data)
          : null;

        changeFiles(nextData);
        return next;
      });
    },
    [changeFiles, multiple],
  );

  useEffect(() => {
    if (typeof value !== 'undefined') {
      updateFilesState(value);
    }
  }, [updateFilesState, value]);

  return {
    error,
    fileToEdit,
    filesState,
    getInputProps,
    getRootProps,
    handleCancelEdit,
    handleSaveEdit,
    handleRemove,
  };
}
