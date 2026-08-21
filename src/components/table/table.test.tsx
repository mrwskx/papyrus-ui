import { render, screen } from '../../utils/test-utils';

import { Table } from './table';

describe('Table', () => {
  describe('Given a table with default props', () => {
    describe('When component is rendered', () => {
      it('Then a <table> element should be in the document', () => {
        render(<Table />);
        expect(screen.queryByRole('table')).toBeInTheDocument();
      });
    });
  });

  describe('Given a table with children', () => {
    describe('When component is rendered', () => {
      it('Then provided children should be displayed inside the table', () => {
        render(
          <Table>
            <thead>
              <tr>
                <th>Header 1</th>
                <th>Header 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Data 1</td>
                <td>Data 2</td>
              </tr>
            </tbody>
          </Table>,
        );
        expect(screen.getByText('Header 1')).toBeInTheDocument();
        expect(screen.getByText('Header 2')).toBeInTheDocument();
        expect(screen.getByText('Data 1')).toBeInTheDocument();
        expect(screen.getByText('Data 2')).toBeInTheDocument();
      });
    });
  });
});
