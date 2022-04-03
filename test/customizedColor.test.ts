import { Table } from '../index';

describe('Example: Print a simple Table with Custom column colors', () => {
  it('Custom column colors are working', () => {
    // Create a table
    const p = new Table({
      columns: [
        { name: 'red_left_align_index', alignment: 'left', color: 'red' },
        { name: 'right_align_text', alignment: 'right' },
        { name: 'green_value', color: 'green' },
      ],
      colorMap: {
        red: '\x1b[32m', // actually its green
      },
    });

    // add rows with color
    p.addRow(
      {
        red_left_align_index: 2,
        right_align_text: 'This is looking green, but thats what I call red',
        green_value: 10.212,
      },
      { color: 'red' }
    );
    p.addRow(
      {
        red_left_align_index: 3,
        right_align_text: 'This row is blue as well',
        green_value: 10.212,
      },
      { color: 'blue' }
    );
    p.addRow(
      {
        red_left_align_index: 4,
        right_align_text: 'This row is green',
        green_value: 10.212,
      },
      { color: 'green' }
    );

    // print
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });
});
