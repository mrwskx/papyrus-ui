import { render } from '../../utils/test-utils';

import { OList } from './o-list';

describe('OList', () => {
  describe('Given o-list with default props', () => {
    describe('When component is rendered', () => {
      it('Then `<ol>` element should be in the document', () => {
        const { container } = render(<OList />);
        expect(container.querySelector('ol')).toBeInTheDocument();
      });

      it('Then should have list class for consistent spacing', () => {
        const { container } = render(<OList />);
        const olElement = container.querySelector('ol');
        expect(olElement).toHaveClass('list');
      });

      it('Then should have list-decimal class by default', () => {
        const { container } = render(<OList />);
        const olElement = container.querySelector('ol');
        expect(olElement).toHaveClass('list-decimal');
      });
    });
  });

  describe('Given o-list with list items', () => {
    describe('When component is rendered', () => {
      it('Then provided children should be displayed', () => {
        const { getByText } = render(
          <OList>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </OList>,
        );

        expect(getByText('Item 1')).toBeInTheDocument();
        expect(getByText('Item 2')).toBeInTheDocument();
        expect(getByText('Item 3')).toBeInTheDocument();
      });
    });
  });

  describe('Given o-list with custom className', () => {
    describe('When component is rendered with Tailwind list utilities', () => {
      it('Then should apply custom className', () => {
        const { container } = render(
          <OList className="list-decimal">
            <li>Item 1</li>
          </OList>,
        );

        const olElement = container.querySelector('ol');
        expect(olElement).toHaveClass('list');
        expect(olElement).toHaveClass('list-decimal');
      });

      it('Then should support list-none className', () => {
        const { container } = render(
          <OList className="list-none">
            <li>Item 1</li>
          </OList>,
        );

        const olElement = container.querySelector('ol');
        expect(olElement).toHaveClass('list');
        expect(olElement).toHaveClass('list-none');
      });
    });
  });

  describe('Given o-list with HTML ol attributes', () => {
    describe('When component receives type attribute', () => {
      it.each([
        ['1', '1'],
        ['a', 'a'],
        ['A', 'A'],
        ['i', 'i'],
        ['I', 'I'],
      ])('Then should pass type="%s" to ol element', (typeLabel, type) => {
        const { container } = render(
          <OList type={type as '1' | 'a' | 'A' | 'i' | 'I'}>
            <li>Item 1</li>
          </OList>,
        );

        const olElement = container.querySelector('ol');
        expect(olElement).toHaveAttribute('type', type);
      });
    });

    describe('When component receives start attribute', () => {
      it('Then should pass start attribute to ol element', () => {
        const { container } = render(
          <OList start={5}>
            <li>Item 1</li>
            <li>Item 2</li>
          </OList>,
        );

        const olElement = container.querySelector('ol');
        expect(olElement).toHaveAttribute('start', '5');
      });
    });

    describe('When component receives reversed attribute', () => {
      it('Then should pass reversed attribute to ol element', () => {
        const { container } = render(
          <OList reversed>
            <li>Item 1</li>
            <li>Item 2</li>
          </OList>,
        );

        const olElement = container.querySelector('ol');
        expect(olElement).toHaveAttribute('reversed');
      });
    });

    describe('When component receives multiple ol attributes', () => {
      it('Then should pass all attributes to ol element', () => {
        const { container } = render(
          <OList reversed start={3} type="a">
            <li>Item 1</li>
            <li>Item 2</li>
          </OList>,
        );

        const olElement = container.querySelector('ol');
        expect(olElement).toHaveAttribute('type', 'a');
        expect(olElement).toHaveAttribute('start', '3');
        expect(olElement).toHaveAttribute('reversed');
      });
    });
  });
});
