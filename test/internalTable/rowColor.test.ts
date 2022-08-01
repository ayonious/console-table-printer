import { renderTable } from '../../src/internalTable/internal-table-printer';
import { Table } from '../../index';

describe('Testing Row coloring', () => {
  it('Batch Row coloring by each row', () => {
    // Create a table
    const p = new Table();

    p.addRow(
      { index: 3, text: 'green color text1', value: 100 },
      { color: 'green' }
    );

    p.addRow(
      { index: 4, text: 'green color text2', value: 300 },
      { color: 'green' }
    );

    // print
    const returned = renderTable(p.table);
    expect(returned).toMatchSnapshot();
  });

  it('Batch Row default coloring is working', () => {
    // Create a table
    const p = new Table();

    p.addRows([
      // adding multiple rows are possible
      { index: 3, text: 'green color text1', value: 100 },
      { index: 4, text: 'green color text2', value: 300 },
    ]);

    // print
    const returned = renderTable(p.table);
    expect(returned).toMatchSnapshot();
  });

  it('Batch Row coloring is working', () => {
    // Create a table
    const p = new Table();

    p.addRows(
      [
        // adding multiple rows are possible
        { index: 3, text: 'green color text1', value: 100 },
        { index: 4, text: 'green color text2', value: 300 },
      ],
      { color: 'green' }
    );

    // print
    const returned = renderTable(p.table);
    expect(returned).toMatchSnapshot();
  });
});
