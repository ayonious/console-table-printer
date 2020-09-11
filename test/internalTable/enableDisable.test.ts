import { renderTable } from '../../src/internalTable/internal-table-printer';
import { Table } from '../../index';

describe('Testing column Enable and Disable', () => {
  it('enable basic example', () => {
    // Create a table
    const p = new Table({
      enabledColumns: ['red_left_align_index', 'right_align_text'],
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
    p.addRow(
      {
        red_left_align_index: 4,
        right_align_text: 'I would like some cyan wine please',
        green_value_center: 10.212,
      },
      { color: 'cyan' }
    );
    p.addRow(
      {
        red_left_align_index: 5,
        right_align_text: 'I would like some white_bold wine please',
        green_value_center: 10.212,
      },
      { color: 'white_bold' }
    );
    p.addRow(
      {
        red_left_align_index: 6,
        right_align_text: 'I would like some crimson sky please',
        green_value_center: 10.212,
      },
      { color: 'crimson' }
    );
    p.addRow(
      {
        red_left_align_index: 7,
        right_align_text: 'I would like some green gemuse please',
        green_value_center: 20.0,
      },
      { color: 'green' }
    );
    p.addRow(
      {
        red_left_align_index: 8,
        right_align_text: 'I would like some gelb bananen bitte',
        green_value_center: 100,
      },
      { color: 'yellow' }
    );

    // print
    const returned = renderTable(p.table);

    console.log(returned);
    const expected = [
      '┌──────────────────────┬──────────────────────────────────────────┐',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01mred_left_align_index\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m                        right_align_text\u001b[0m\u001b[37m │\u001b[0m',
      '├──────────────────────┼──────────────────────────────────────────┤',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[34m                   2\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[34m                        This row is blue\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[31m                   3\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[31m       I would like some red wine please\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[36m                   4\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[36m      I would like some cyan wine please\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01m                   5\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01mI would like some white_bold wine please\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[38m                   6\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[38m    I would like some crimson sky please\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[32m                   7\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[32m   I would like some green gemuse please\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[33m                   8\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[33m    I would like some gelb bananen bitte\u001b[0m\u001b[37m │\u001b[0m',
      '└──────────────────────┴──────────────────────────────────────────┘',
    ];
    expect(JSON.stringify(returned)).toBe(JSON.stringify(expected));
  });

  it('disable basic example', () => {
    // Create a table
    const p = new Table({
      disabledColumns: ['red_left_align_index', 'right_align_text'],
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
    p.addRow(
      {
        red_left_align_index: 4,
        right_align_text: 'I would like some cyan wine please',
        green_value_center: 10.212,
      },
      { color: 'cyan' }
    );
    p.addRow(
      {
        red_left_align_index: 5,
        right_align_text: 'I would like some white_bold wine please',
        green_value_center: 10.212,
      },
      { color: 'white_bold' }
    );
    p.addRow(
      {
        red_left_align_index: 6,
        right_align_text: 'I would like some crimson sky please',
        green_value_center: 10.212,
      },
      { color: 'crimson' }
    );
    p.addRow(
      {
        red_left_align_index: 7,
        right_align_text: 'I would like some green gemuse please',
        green_value_center: 20.0,
      },
      { color: 'green' }
    );
    p.addRow(
      {
        red_left_align_index: 8,
        right_align_text: 'I would like some gelb bananen bitte',
        green_value_center: 100,
      },
      { color: 'yellow' }
    );

    // print
    const returned = renderTable(p.table);

    console.log(returned);
    const expected = [
      '┌────────────────────┐',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01mgreen_value_center\u001b[0m\u001b[37m │\u001b[0m',
      '├────────────────────┤',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[34m            10.212\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[31m            10.212\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[36m            10.212\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01m            10.212\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[38m            10.212\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[32m                20\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[33m               100\u001b[0m\u001b[37m │\u001b[0m',
      '└────────────────────┘',
    ];
    expect(JSON.stringify(returned)).toBe(JSON.stringify(expected));
  });
});
