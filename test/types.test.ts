import { COLOR, Table } from '../index';

describe('Testing column alignment', () => {
  it('all kind of alignments are working', () => {
    // Create a table

    const red_color: COLOR = 'red';

    const p = new Table({
      columns: [
        {
          name: 'red_left_align_index',
          alignment: 'left',
          color: red_color,
        },
        { name: 'right_align_text', alignment: 'right' },
        {
          name: 'green_value_center',
          alignment: 'center',
          color: 'green',
        },
      ],
    });

    // add rows with color
    p.addRow(
      {
        red_left_align_index: 2,
        right_align_text: 'This row is blue',
        green_value_center: 10.212,
      },
      { color: 'blue' }
    );
    // print
    const returned = p.printTable();
  });
});
