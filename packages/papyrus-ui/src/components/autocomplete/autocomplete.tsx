/* eslint-disable jsx-a11y/no-autofocus */

'use client';

import {
  autoUpdate,
  size as sizeFn,
  flip,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  FloatingFocusManager,
  useClick,
  offset,
} from '@floating-ui/react';
import { useDebounceCallback } from '@react-hook/debounce';
import {
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type {
  ChangeEvent,
  FC,
  FocusEvent,
  FocusEventHandler,
  ForwardedRef,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  RefAttributes,
} from 'react';
import type { IconBaseProps } from 'react-icons';
import { BiCheck, BiX } from 'react-icons/bi';
import { Transition } from 'react-transition-group';

import type { Maybe, MaybeMultiValue } from '../../types';
import { slug } from '../../utils/slug';
import { useId } from '../../utils/use-id';
import { useMergeRefs } from '../../utils/use-merge-refs';
import { Icon } from '../icon';
import { InputAction } from '../input-action';
import { InputBox } from '../input-box';
import type { InputBoxSize } from '../input-box';
import { InputGroup } from '../input-group';
import { Listbox } from '../listbox/listbox';
import { Option } from '../option';
import type { OptionProps } from '../option';
import { Tag } from '../tag';

export interface OptionComponentProps<OptionType> extends OptionProps {
  option: OptionType;
}

// unified in ../../types

export interface AutocompleteProps<
  Value = unknown,
  IsMulti extends boolean = false,
> {
  /**
   * If `true`, the input element will be isFocused when the component is mounted.
   */
  autoFocus?: boolean;

  /**
   * Aria label for clear button.
   */
  clearLabel?: string;

  /**
   * The default value of the uncontrolled input.
   * This is used when the component is uncontrolled and does not have a `value` prop.
   */
  defaultValue?: MaybeMultiValue<Value, IsMulti>;

  /**
   * Optional description text for the input field, providing additional context or instructions for the user.
   * Appears above the input field to guide the user on the expected input.
   */
  description?: ReactNode;

  /**
   * If `true`, the input element is disabled and can't be interacted with.
   */
  disabled?: boolean;

  /**
   * A function that takes an `option` and returns a string to use as the label
   * for that option.
   */
  getLabel?: (option: Value) => string;

  /**
   * ID attribute for the input element.
   */
  id?: string;

  /**
   * If `true`, the input element will have a validation error style.
   *
   * @default false
   */
  invalid?: boolean;

  /**
   * The label text for the input field. It is essential for accessibility to link the label with the input.
   */
  label?: ReactNode;

  /**
   * If `true`, the loading label will be shown.
   */
  loading?: boolean;

  /**
   * Label to display when data is being loaded.
   */
  loadingLabel?: string;

  /**
   * Message to display under the input, such as validation errors or hints.
   */
  message?: ReactNode;

  /**
   * If `true`, the component allows multiple values to be selected.
   */
  multiple?: IsMulti;

  /**
   * Name attribute for input element.
   */
  name?: string;

  /**
   * Feedback text shown when no options were provided.
   */
  noResultLabel?: string;

  /**
   * A component to render each option in the dropdown list.
   */
  OptionComponent?: FC<OptionComponentProps<Value>>;

  /**
   * Array of options to display in the dropdown list.
   */
  options?: Maybe<readonly Value[]>;

  /**
   * Placeholder text to display in input element.
   */
  placeholder?: string;

  /**
   * If `true`, the input element is read-only and can't be interacted with.
   */
  readOnly?: boolean;

  /**
   * The amount of time to wait after the user stops typing before triggering
   * a search.
   */
  searchTimeout?: number;

  /**
   * The size of the autocomplete component.
   */
  size?: InputBoxSize;

  /**
   * icon to display at the start of the input element.
   */
  startIcon?: ReactElement;

  /**
   * icon to display at the end of the input element.
   */
  endIcon?: ReactElement;

  /**
   * The current value of the input. This prop is used to control the value of the input.
   * Use `onChange` to capture changes to the value.
   */
  value?: MaybeMultiValue<Value, IsMulti>;

  /**
   * Callback function fired when the input element loses focus.
   */
  onBlur?: FocusEventHandler<HTMLInputElement>;

  /**
   * Callback function fired when the value of autocomplete component changes.
   * The function receives the new value as its argument.
   */
  onChange?: (value: MaybeMultiValue<Value, IsMulti>) => void;

  /**
   * Callback function fired when the input element receives focus.
   */
  onFocus?: FocusEventHandler<HTMLInputElement>;

  /**
   * Callback function fired when the search query changes.
   */
  onSearch?: (query: string) => void | Promise<void>;
}

interface AutocompleteFn {
  <Value = unknown, IsMulti extends boolean = false>(
    props: AutocompleteProps<Value, IsMulti> & RefAttributes<HTMLInputElement>,
  ): ReactElement;
  displayName: 'Autocomplete';
}

export const LISTBOX_ID = 'listbox';

export const OPTION_ID = 'option';

const TRANSITION_TIMEOUT = {
  appear: 0,
  enter: 200,
  exit: 200,
};

const INITIAL_OFFSET_X = 7;

const INITIAL_OFFSET_Y = 7;

const ICON_OFFSET = 28;

const OPTION_HEIGHT = 2.5;

const LIST_PY = 0.25;

const MAX_OPTIONS = 10;

const offsetXBySizeMap: Record<InputBoxSize, number> = {
  sm: -6 - INITIAL_OFFSET_X,
  md: -8 - INITIAL_OFFSET_X,
  lg: -10 - INITIAL_OFFSET_X,
};

const offsetYBySizeMap: Record<InputBoxSize, number> = {
  sm: INITIAL_OFFSET_Y,
  md: 4 + INITIAL_OFFSET_Y,
  lg: 10 + INITIAL_OFFSET_Y,
};

function toInputValue<Value, IsMulti extends boolean>(
  value: Maybe<MaybeMultiValue<Value, IsMulti>>,
  getLabel: (value: Value) => string,
): string {
  if (value == null || Array.isArray(value)) {
    return '';
  }

  return getLabel(value as Value);
}

function toSelectedOptions<Value, IsMulti extends boolean>(
  value: MaybeMultiValue<Value, IsMulti> | undefined,
): Value[] {
  if (value == null) {
    return [];
  }

  if (Array.isArray(value)) {
    return value as Value[];
  }

  return [value] as Value[];
}

function toValue<Value, IsMulti extends boolean>(
  selectedOptions: Value[],
  multiple: IsMulti,
): MaybeMultiValue<Value, IsMulti> {
  return (
    multiple ? selectedOptions : (selectedOptions[0] ?? null)
  ) as MaybeMultiValue<Value, IsMulti>;
}

function toggleOption<Value>(value: Value, items: Value[]): Value[] {
  return items.includes(value)
    ? items.filter(item => item !== value)
    : [...items, value];
}

export const Autocomplete = forwardRef(
  <Value = unknown, IsMulti extends boolean = false>(
    {
      autoFocus,
      clearLabel = 'Clear',
      defaultValue,
      description,
      disabled,
      getLabel = String,
      id,
      invalid,
      label,
      loading,
      loadingLabel = 'Loading...',
      message,
      multiple = false as IsMulti,
      name,
      noResultLabel = 'No result',
      OptionComponent = Option as FC<OptionComponentProps<Value>>,
      options,
      placeholder,
      readOnly,
      searchTimeout = 500,
      size = 'md',
      startIcon,
      endIcon,
      value,
      onBlur,
      onChange,
      onFocus,
      onSearch,
    }: AutocompleteProps<Value, IsMulti>,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isFocused, setIsFocused] = useState(false);

    const [inputValue, setInputValue] = useState(() =>
      toInputValue(value ?? defaultValue, getLabel),
    );

    const [optionsState, setOptionsState] = useState<Maybe<readonly Value[]>>(
      () => options,
    );

    const [selectedOptions, setSelectedOptions] = useState<Value[]>(() =>
      toSelectedOptions(value ?? defaultValue),
    );

    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<Array<HTMLElement | null>>([]);
    const isControlled = typeof value !== 'undefined';
    const inputId = useId(id);

    const { refs, floatingStyles, context } = useFloating<HTMLInputElement>({
      middleware: [
        flip({ padding: 4 }),
        offset({
          mainAxis: offsetYBySizeMap[size],
          alignmentAxis: startIcon
            ? offsetXBySizeMap[size] - ICON_OFFSET
            : offsetXBySizeMap[size],
        }),
        sizeFn({
          apply({ availableHeight, elements }) {
            const { offsetWidth = 0 } = containerRef.current ?? {};
            const docCss = getComputedStyle(document.documentElement);
            const pxInRem = Number.parseFloat(docCss.fontSize);

            const defaultMaxHeight =
              (OPTION_HEIGHT * MAX_OPTIONS + LIST_PY) * pxInRem;

            const maxHeight = Math.min(defaultMaxHeight, availableHeight - 4);

            Object.assign(elements.floating.style, {
              width: `${offsetWidth + 14}px`,
              maxHeight: `${maxHeight}px`,
            });
          },
          padding: 4,
        }),
      ],
      open: isOpen,
      placement: 'bottom-start',
      strategy: 'fixed',
      transform: false,
      whileElementsMounted: autoUpdate,
      onOpenChange: setIsOpen,
    });

    const role = useRole(context, { role: 'listbox' });

    const click = useClick(context, {
      enabled: !disabled && !readOnly,
    });

    const dismiss = useDismiss(context);

    const listNav = useListNavigation(context, {
      enabled: !disabled && !readOnly,
      listRef,
      activeIndex,
      onNavigate: setActiveIndex,
      virtual: true,
      loop: true,
    });

    const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([role, click, dismiss, listNav]);

    const mergedRefs = useMergeRefs(refs.setReference, ref);

    const resetInputValue = useCallback(() => {
      const selectedValue = multiple ? selectedOptions : selectedOptions[0];
      const nextValue = toInputValue(selectedValue, getLabel);
      setInputValue(nextValue);
    }, [getLabel, multiple, selectedOptions]);

    const filterOptions = useCallback(
      (nextQuery: string) => {
        if (!options) {
          return;
        }

        const filtered = nextQuery
          ? options.filter(item =>
              getLabel(item).toLowerCase().includes(nextQuery.toLowerCase()),
            )
          : options;

        setOptionsState(filtered);
      },
      [getLabel, options],
    );

    const updateOptions = useDebounceCallback(async (nextQuery: string) => {
      if (onSearch) {
        await onSearch(nextQuery);
      } else {
        filterOptions(nextQuery);
      }
    }, searchTimeout);

    useEffect(() => {
      if (value !== undefined) {
        const nextOptions = toSelectedOptions<Value, IsMulti>(value);
        setSelectedOptions(nextOptions);
      }
    }, [value]);

    useEffect(() => {
      if (options) {
        setOptionsState(options);
      }
    }, [options]);

    useEffect(() => {
      updateOptions(inputValue);
    }, [inputValue, updateOptions]);

    useEffect(() => {
      resetInputValue();
    }, [resetInputValue]);

    const changeValue = (options: Value[]) => {
      if (isControlled) {
        const nextOptions = toValue(options, multiple);
        onChange?.(nextOptions);
      } else {
        setSelectedOptions(options);
      }
    };

    const selectOption = (index: number): void => {
      const option = optionsState?.[index];

      if (!option) {
        return;
      }

      const nextOptions = multiple
        ? toggleOption(option, selectedOptions)
        : [option];

      changeValue(nextOptions);
      setIsOpen(false);

      const element = refs.domReference.current;

      if (element) {
        element.focus();
        element.setSelectionRange(element.value.length, element.value.length);
      }
    };

    const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const nextValue = e.target.value;
      setInputValue(nextValue);

      if (nextValue) {
        setIsOpen(true);
        setActiveIndex(0);
      } else if (!multiple) {
        changeValue([]);
      }
    };

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (
        e.key === 'Enter' &&
        activeIndex != null &&
        optionsState?.[activeIndex]
      ) {
        e.preventDefault();
        e.stopPropagation();
        selectOption(activeIndex);
        setActiveIndex(null);
      }
    };

    const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      resetInputValue();
      onBlur?.(e);
    };

    const handleOptionClick = (e: MouseEvent<HTMLLIElement>) => {
      e.preventDefault();
      const index = Number(e.currentTarget.dataset.index);

      if (!Number.isNaN(index)) {
        selectOption(index);
      }
    };

    const handleClearMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      changeValue([]);
      setInputValue('');
    };

    const handleRemoveMouseDown = (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const index = Number(e.currentTarget.dataset.index);

      if (Number.isNaN(index)) {
        return;
      }

      const nextVal = [...selectedOptions];
      nextVal.splice(index, 1);
      changeValue(nextVal);
    };

    return (
      <InputGroup
        description={description}
        htmlFor={inputId}
        invalid={invalid}
        label={label}
        message={message}
      >
        <InputBox
          ref={containerRef}
          disabled={disabled}
          invalid={invalid}
          size={size}
        >
          {isValidElement<IconBaseProps>(startIcon) && (
            <InputAction className="me-1">{startIcon}</InputAction>
          )}

          <span className="flex flex-1 -mt-1 -mx-0.5 flex-wrap">
            {multiple &&
              selectedOptions.map((item, idx) => (
                <span key={idx} className="block mt-1 px-0.5">
                  <Tag
                    data-index={idx}
                    disabled={disabled}
                    rounded
                    tabIndex={-1}
                    variant="tertiary"
                    onMouseDown={handleRemoveMouseDown}
                    onRemove={() => {
                      if (onChange) {
                        const newValue = selectedOptions.filter(
                          (_, i) => i !== idx,
                        );
                        onChange(newValue as MaybeMultiValue<Value, IsMulti>);
                      }
                    }}
                  >
                    {getLabel(item)}
                  </Tag>
                </span>
              ))}

            {(!multiple ||
              selectedOptions.length === 0 ||
              (!disabled && !readOnly)) && (
              <span className="block mt-1 px-0.5 w-full">
                <input
                  aria-activedescendant={
                    activeIndex != null
                      ? slug(inputId, OPTION_ID, activeIndex)
                      : ''
                  }
                  aria-autocomplete="list"
                  aria-controls={isOpen ? slug(inputId, LISTBOX_ID) : ''}
                  aria-invalid={invalid}
                  aria-owns={isOpen ? slug(inputId, LISTBOX_ID) : ''}
                  autoComplete="off"
                  autoFocus={autoFocus}
                  className="input-base"
                  disabled={disabled}
                  id={inputId}
                  name={name}
                  placeholder={placeholder}
                  readOnly={readOnly}
                  type="text"
                  {...getReferenceProps({
                    ref: mergedRefs,
                    value: inputValue,
                    onFocus: handleInputFocus,
                    onBlur: handleInputBlur,
                    onChange: handleInputChange,
                    onKeyDown: handleInputKeyDown,
                  })}
                />
              </span>
            )}
          </span>

          {!disabled &&
            !readOnly &&
            isFocused &&
            (inputValue.length > 0 || selectedOptions.length > 0) && (
              <InputAction className="ms-1">
                <Icon
                  aria-label={clearLabel}
                  className="text-lg color-neutral-950 hover:opacity-60"
                  role="button"
                  tabIndex={-1}
                  onMouseDown={handleClearMouseDown}
                >
                  <BiX />
                </Icon>
              </InputAction>
            )}

          {isValidElement(endIcon) && (
            <InputAction className="ms-1">{endIcon}</InputAction>
          )}
        </InputBox>

        <Transition
          in={isOpen}
          mountOnEnter
          nodeRef={refs.floating}
          timeout={TRANSITION_TIMEOUT}
          unmountOnExit
        >
          {status => (
            <FloatingFocusManager
              context={context}
              initialFocus={-1}
              modal={false}
            >
              <Listbox
                ref={refs.setFloating}
                id={slug(inputId, LISTBOX_ID)}
                style={floatingStyles}
                visible={status === 'entered'}
                {...getFloatingProps()}
              >
                {(loading || !optionsState) && (
                  <Option disabled role="none">
                    {loadingLabel}
                  </Option>
                )}

                {!loading && optionsState && optionsState.length === 0 && (
                  <Option disabled role="none">
                    {noResultLabel}
                  </Option>
                )}

                {!loading &&
                  optionsState?.map((item, idx) => {
                    const isSelected = selectedOptions.includes(item);

                    return (
                      <OptionComponent
                        key={idx}
                        active={idx === activeIndex}
                        data-index={idx}
                        endIcon={
                          isSelected ? (
                            <BiCheck className="text-primary-600" />
                          ) : undefined
                        }
                        id={slug(inputId, OPTION_ID, idx)}
                        option={item}
                        selected={isSelected}
                        {...getItemProps({
                          ref: node => {
                            listRef.current[idx] = node;
                          },
                          onClick: handleOptionClick,
                        })}
                      >
                        {getLabel(item)}
                      </OptionComponent>
                    );
                  })}
              </Listbox>
            </FloatingFocusManager>
          )}
        </Transition>
      </InputGroup>
    );
  },
) as AutocompleteFn;

Autocomplete.displayName = 'Autocomplete';
