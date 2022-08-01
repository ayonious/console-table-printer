import { renderTable } from '../../src/internalTable/internal-table-printer';
import { Table } from '../../index';

describe('Testing Row separator', () => {
  it('Batch Row separator by each row', () => {
    // Create a table
    const p = new Table();

    p.addRow({ index: 3, text: 'row without separator', value: 100 });

    p.addRow(
      { index: 4, text: 'row with separator', value: 300 },
      { separator: true }
    );

    p.addRow({ index: 5, text: 'row without separator', value: 100 });

    // print
    const returned = renderTable(p.table);

    expect(returned).toMatchSnapshot();
    console.log(returned);
    p.printTable();
  });

  it('Batch Row default separator is working', () => {
    // Create a table
    const p = new Table();

    p.addRows([
      // adding multiple rows are possible
      { index: 3, text: 'row default separator', value: 100 },
      { index: 4, text: 'row default separator', value: 300 },
    ]);

    // print
    const returned = renderTable(p.table);
    expect(returned).toMatchSnapshot();
    console.log(returned);
    p.printTable();
  });

  it('Batch Row table separator option is working', () => {
    // Create a table
    const p = new Table({ rowSeparator: true });

    p.addRows([
      // adding multiple rows are possible
      { index: 3, text: 'table row separator', value: 100 },
      { index: 4, text: 'table row separator', value: 300 },
    ]);

    // print
    const returned = renderTable(p.table);

    expect(returned).toMatchSnapshot();
    console.log(returned);
  });

  it('Batch Row table separator override is working', () => {
    // Create a table
    const p = new Table({ rowSeparator: true });

    p.addRows(
      [
        // adding multiple rows are possible
        { index: 3, text: 'override table row separator', value: 100 },
        { index: 4, text: 'override table row separator', value: 300 },
      ],
      { separator: false }
    );

    // print
    const returned = renderTable(p.table);

    expect(returned).toMatchSnapshot();
    console.log(returned);
    p.printTable();
  });

  it('Batch Row separator is working', () => {
    // Create a table
    const p = new Table();

    p.addRows(
      [
        // adding multiple rows are possible
        { index: 3, text: 'row with separator', value: 100 },
        { index: 4, text: 'row with separator', value: 300 },
      ],
      { separator: true }
    );

    // print
    const returned = renderTable(p.table);
    expect(returned).toMatchSnapshot();
    console.log(returned);
  });

  it('Batch Row separator combined with sorting', () => {
    // Create a table and sort by index
    const p = new Table({
      sort: (row1, row2) => row1.index - row2.index,
      rowSeparator: true,
    });

    // Row with index 1 will have separator because it inherits from Table options
    p.addRow({ index: 1, text: 'row inherit separator', value: 100 });
    p.addRow(
      { index: 4, text: 'row without separator', value: 100 },
      { separator: false }
    );
    // Row with index 5 will be last row so separator will be ignored anyway
    p.addRow(
      { index: 5, text: 'row with separator', value: 100 },
      { separator: true }
    );
    p.addRow(
      { index: 2, text: 'row with separator', value: 100 },
      { separator: true }
    );
    p.addRow(
      { index: 3, text: 'row without separator', value: 100 },
      { separator: false }
    );

    // print
    const returned = renderTable(p.table);

    expect(returned).toMatchSnapshot();
    console.log(returned);
    p.printTable();
  });
});
