import { render } from '../../utils/test-utils';

import { Code } from './code';

describe('Code', () => {
  describe('Given Code with code content', () => {
    describe('When component is rendered', () => {
      it('Then provided code should be displayed', () => {
        const code = 'console.log("Hello, World!");';
        const { getByText } = render(<Code>{code}</Code>);
        expect(getByText(code)).toBeInTheDocument();
      });
    });
  });

  describe('Given Code with small size', () => {
    describe('When component is rendered', () => {
      it('Then should have small text class', () => {
        const { container } = render(<Code size="sm">small code</Code>);
        const codeElement = container.querySelector('code');
        expect(codeElement).toHaveClass('text-code-sm');
      });
    });
  });

  describe('Given Code with medium size', () => {
    describe('When component is rendered', () => {
      it('Then should have medium text class', () => {
        const { container } = render(<Code size="md">medium code</Code>);
        const codeElement = container.querySelector('code');
        expect(codeElement).toHaveClass('text-code-md');
      });
    });
  });

  describe('Given Code with custom className', () => {
    describe('When component is rendered', () => {
      it('Then should include custom className', () => {
        const customClass = 'custom-code-class';
        const { container } = render(
          <Code className={customClass}>code with custom class</Code>,
        );
        const codeElement = container.querySelector('code');
        expect(codeElement).toHaveClass(customClass);
      });
    });
  });
});
