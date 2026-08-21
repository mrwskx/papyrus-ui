import { render } from '../../utils/test-utils';

import { UList } from './u-list';

describe('UList', () => {
  describe('Given u-list with default props', () => {
    describe('When component is rendered', () => {
      it('Then `<ul>` element should be in the document', () => {
        const { container } = render(<UList />);
        expect(container.querySelector('ul')).toBeInTheDocument();
      });

      it('Then should have list class for consistent spacing', () => {
        const { container } = render(<UList />);
        const ulElement = container.querySelector('ul');
        expect(ulElement).toHaveClass('list');
      });

      it('Then should have list-disc class by default', () => {
        const { container } = render(<UList />);
        const ulElement = container.querySelector('ul');
        expect(ulElement).toHaveClass('list-disc');
      });
    });
  });

  describe('Given u-list with list items', () => {
    describe('When component is rendered', () => {
      it('Then provided children should be displayed', () => {
        const { getByText } = render(
          <UList>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </UList>,
        );

        expect(getByText('Item 1')).toBeInTheDocument();
        expect(getByText('Item 2')).toBeInTheDocument();
        expect(getByText('Item 3')).toBeInTheDocument();
      });
    });
  });

  describe('Given u-list with custom className', () => {
    describe('When component is rendered with Tailwind list utilities', () => {
      it('Then should apply custom className', () => {
        const { container } = render(
          <UList className="list-disc">
            <li>Item 1</li>
          </UList>,
        );

        const ulElement = container.querySelector('ul');
        expect(ulElement).toHaveClass('list');
        expect(ulElement).toHaveClass('list-disc');
      });

      it('Then should support list-none className', () => {
        const { container } = render(
          <UList className="list-none">
            <li>Item 1</li>
          </UList>,
        );

        const ulElement = container.querySelector('ul');
        expect(ulElement).toHaveClass('list');
        expect(ulElement).toHaveClass('list-none');
      });
    });
  });
});
