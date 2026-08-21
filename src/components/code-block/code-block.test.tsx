import { render } from '../../utils/test-utils';

import { CodeBlock } from './code-block';

describe('CodeBlock', () => {
  describe('Given CodeBlock with code content', () => {
    describe('When component is rendered', () => {
      it('Then provided code should be displayed', () => {
        const code = 'console.log("Hello, World!");';
        const { getByText } = render(<CodeBlock>{code}</CodeBlock>);
        expect(getByText(code)).toBeInTheDocument();
      });
    });
  });

  describe('Given CodeBlock with language prop', () => {
    describe('When component is rendered', () => {
      it('Then data-language attribute should be set', () => {
        const { container } = render(
          <CodeBlock language="javascript">const x = 1;</CodeBlock>,
        );
        const preElement = container.querySelector('pre');
        expect(preElement).toHaveAttribute('data-language', 'javascript');
      });
    });
  });

  describe('Given CodeBlock with showLineNumbers prop', () => {
    describe('When component is rendered with multiline code', () => {
      it('Then line numbers should be displayed', () => {
        const code = 'line 1\nline 2\nline 3';
        const { getByText } = render(
          <CodeBlock showLineNumbers>{code}</CodeBlock>,
        );
        expect(getByText('1')).toBeInTheDocument();
        expect(getByText('2')).toBeInTheDocument();
        expect(getByText('3')).toBeInTheDocument();
      });
    });
  });

  describe('Given CodeBlock with wrap true', () => {
    describe('When component is rendered', () => {
      it('Then should have word wrap classes', () => {
        const { container } = render(<CodeBlock wrap>long code</CodeBlock>);
        const preElement = container.querySelector('pre');
        expect(preElement).toHaveClass('overflow-x-hidden');
        expect(preElement).toHaveClass('whitespace-pre-wrap');
        expect(preElement).toHaveClass('break-words');
      });
    });
  });

  describe('Given CodeBlock with small size', () => {
    describe('When component is rendered', () => {
      it('Then should have small text class', () => {
        const { container } = render(
          <CodeBlock size="sm">small code</CodeBlock>,
        );
        const preElement = container.querySelector('pre');
        expect(preElement).toHaveClass('text-code-sm');
      });
    });
  });

  describe('Given CodeBlock with wrap false', () => {
    describe('When component is rendered', () => {
      it('Then should have scrollbar class', () => {
        const { container } = render(
          <CodeBlock wrap={false}>scrollable code</CodeBlock>,
        );
        const preElement = container.querySelector('pre');
        expect(preElement).toHaveClass('scrollbar');
        expect(preElement).toHaveClass('overflow-x-auto');
      });
    });
  });

  describe('Given CodeBlock with content', () => {
    describe('When component is rendered', () => {
      it('Then should display copy button', () => {
        const { container } = render(<CodeBlock>test code</CodeBlock>);
        const copyButton = container.querySelector(
          '[title="Copy to clipboard"]',
        );
        expect(copyButton).toBeInTheDocument();
      });
    });
  });

  describe('Given CodeBlock with onCopy callback', () => {
    describe('When copy button is clicked', () => {
      it('Then should call onCopy callback', () => {
        const onCopy = vi.fn();
        const { container } = render(
          <CodeBlock onCopy={onCopy}>test code</CodeBlock>,
        );
        const copyButton = container.querySelector(
          '[title="Copy to clipboard"]',
        );
        (copyButton as HTMLElement).click();
        expect(onCopy).toHaveBeenCalled();
      });
    });
  });

  describe('Given CodeBlock with custom copyLabel', () => {
    describe('When component is rendered', () => {
      it('Then should display custom copy button label', () => {
        const customLabel = 'Copy this code';
        const { container } = render(
          <CodeBlock copyLabel={customLabel}>test code</CodeBlock>,
        );
        const copyButton = container.querySelector(`[title="${customLabel}"]`);
        expect(copyButton).toBeInTheDocument();
      });
    });
  });
});
