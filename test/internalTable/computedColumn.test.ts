import { printTableAndGetConsoleOutput } from '../../src/internalTable/internal-table-printer';
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
    const returned = printTableAndGetConsoleOutput(p.table);
    const expected = [
      '┌────────────┬─────────────┬─────┬─────────────┬──────────────┐',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01mred_amount\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01mblue_amount\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01msum\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01mred_percent\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01mblue_percent\u001b[0m\u001b[37m │\u001b[0m',
      '├────────────┼─────────────┼─────┼─────────────┼──────────────┤',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[31m         2\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m          3\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m  5\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m      40.00\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m       60.00\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[31m         1\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m          1\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m  2\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m      50.00\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m       50.00\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[31m         5\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m          6\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m 11\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m      45.45\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m       54.55\u001b[0m\u001b[37m │\u001b[0m',
      '└────────────┴─────────────┴─────┴─────────────┴──────────────┘',
    ];
    expect(JSON.stringify(returned)).toBe(JSON.stringify(expected));
  });
});
