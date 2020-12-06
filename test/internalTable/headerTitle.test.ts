import { Table } from '../../index';
import { renderTable } from '../../src/internalTable/internal-table-printer';

describe('Testing Title Of Column', () => {
  it('title is used in table printing', () => {
    // Create a table
    const p = new Table({
      columns: [
        {
          name: 'red_left_align_index',
          alignment: 'left',
          title: 'Red Left Align Index',
        },
        {
          name: 'right_align_text',
          alignment: 'right',
          title: 'Right Align Text',
        },
        {
          name: 'green_value_center',
          alignment: 'center',
          title: 'Big Green Value Center',
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
    p.addRow(
      {
        red_left_align_index: 3,
        right_align_text: 'I would like some red wine please',
        green_value_center: 10.212,
      },
      { color: 'red' }
    );

    // print
    const returned = renderTable(p.table);

    console.log(returned);
    const expected = [
      '┌──────────────────────┬───────────────────────────────────┬────────────────────────┐',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01mRed Left Align Index\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m                 Right Align Text\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01mBig Green Value Center\u001b[0m\u001b[37m │\u001b[0m',
      '├──────────────────────┼───────────────────────────────────┼────────────────────────┤',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[34m2                   \u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[34m                 This row is blue\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[34m        10.212        \u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[31m3                   \u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[31mI would like some red wine please\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[31m        10.212        \u001b[0m\u001b[37m │\u001b[0m',
      '└──────────────────────┴───────────────────────────────────┴────────────────────────┘',
    ];
    expect(returned).toBe(expected.join('\n'));
  });
});
