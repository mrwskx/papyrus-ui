import cn from 'classnames';
import copy from 'copy-to-clipboard';
import { forwardRef } from 'react';
import type { AllHTMLAttributes } from 'react';
import { BiCopy } from 'react-icons/bi';

import { Icon } from '../icon';

export type CodeBlockSize = 'sm' | 'md';

export interface CodeBlockProps extends Omit<
  AllHTMLAttributes<HTMLPreElement>,
  'size' | 'wrap'
> {
  /**
   * The code content to display.
   */
  children?: string;

  /**
   * Specifies the programming language for syntax highlighting context.
   * This is mainly for semantic purposes and accessibility.
   */
  language?: string;

  /**
   * Defines the size of the code block text.
   *
   * @default 'md'
   */
  size?: CodeBlockSize;

  /**
   * Whether to show line numbers.
   *
   * @default false
   */
  showLineNumbers?: boolean;

  /**
   * Whether to wrap the code block.
   *
   * @default false
   */
  wrap?: boolean;

  /**
   * Custom label for the copy button.
   *
   * @default 'Copy to clipboard'
   */
  copyLabel?: string;

  /**
   * Callback function that is called when the code is copied to the clipboard.
   */
  onCopy?: () => void;
}

export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(
  (
    {
      copyLabel = 'Copy to clipboard',
      className,
      children,
      language,
      size = 'md',
      showLineNumbers = false,
      wrap = false,
      onCopy,
      ...props
    },
    ref,
  ) => {
    const lines = children ? children.split('\n') : [];
    const hasContent = children && children.trim().length > 0;

    return (
      <div className={cn('relative', className)}>
        <pre
          ref={ref}
          className={cn(
            'rounded-lg border border-neutral-200 bg-neutral-50 font-mono text-neutral-950 ps-4 pe-8 py-4',
            size === 'sm' && 'text-code-sm',
            size === 'md' && 'text-code-md',
            wrap && 'overflow-x-hidden whitespace-pre-wrap break-words',
            !wrap && 'overflow-x-auto scrollbar',
          )}
          {...(language && { 'data-language': language })}
          {...props}
        >
          {hasContent && showLineNumbers ? (
            <div className="flex max-w-full">
              <div className="select-none text-neutral-500 pr-4 border-r border-neutral-200 mr-4 text-right min-w-[2.5rem]">
                {lines.map((_, index) => (
                  <div key={index + 1}>{index + 1}</div>
                ))}
              </div>
              <code className="flex-1 block">{children}</code>
            </div>
          ) : (
            <code className="block max-w-full">{children}</code>
          )}
        </pre>

        {children && (
          <div className="absolute flex items-center justify-center top-0 end-0 p-2">
            <Icon
              className="text-sm text-neutral-500 hover:text-neutral-950 cursor-pointer transition-colors duration-200"
              role="button"
              tabIndex={0}
              title={copyLabel}
              onClick={() => {
                copy(children);
                onCopy?.();
              }}
            >
              <BiCopy />
            </Icon>
          </div>
        )}
      </div>
    );
  },
);

CodeBlock.displayName = 'CodeBlock';
