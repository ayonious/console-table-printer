import { renderTable } from '../../src/internalTable/internal-table-printer';
import { Table } from '../../index';

describe('Testing Computed Column', () => {
  it('all kind of computedColumns are working', () => {
    // Create a table
    const p = new Table({
      columns: [
        { name: 'red_amount', color: 'red' },
        { name: 'blue_amount', alignment: 'right' },
      ],
      computedColumns: [
        {
          name: 'sum',
          function: (row) => row.red_amount + row.blue_amount,
        },
        {
          name: 'red_percent',
          function: (row) => ((row.red_amount / row.sum) * 100).toFixed(2),
        },
        {
          name: 'blue_percent',
          function: (row) => ((row.blue_amount / row.sum) * 100).toFixed(2),
        },
      ],
    });

    // add rows with color
    p.addRow({
      red_amount: 2,
      blue_amount: 3,
    });
    p.addRow({
      red_amount: 1,
      blue_amount: 1,
    });
    p.addRow({
      red_amount: 5,
      blue_amount: 6,
    });

    // print
    const returned = renderTable(p.table);
    expect(returned).toMatchSnapshot();
    console.log(returned);
  });
});
