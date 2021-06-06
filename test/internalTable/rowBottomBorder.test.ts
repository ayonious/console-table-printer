import { renderTable } from '../../src/internalTable/internal-table-printer';
import { Table } from '../../index';

describe('Testing Row bottom border', () => {
  it('Batch Row bottom border by each row', () => {
    // Create a table
    const p = new Table();

    p.addRow({ index: 3, text: 'row without bottom border', value: 100 });

    p.addRow(
      { index: 4, text: 'row with bottom border', value: 300 },
      { bottomBorder: true }
    );

    p.addRow({ index: 5, text: 'row without bottom border', value: 100 });

    // print
    const returned = renderTable(p.table);

    const expected = [
      '┌───────┬───────────────────────────┬───────┐',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01mindex\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m                     text\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01mvalue\u001b[0m\u001b[37m │\u001b[0m',
      '├───────┼───────────────────────────┼───────┤',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    3\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37mrow without bottom border\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m  100\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    4\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m   row with bottom border\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m  300\u001b[0m\u001b[37m │\u001b[0m',
      '├───────┼───────────────────────────┼───────┤',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    5\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37mrow without bottom border\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m  100\u001b[0m\u001b[37m │\u001b[0m',
      '└───────┴───────────────────────────┴───────┘',
    ];
    expect(returned).toBe(expected.join('\n'));
  });

  it('Batch Row default bottom border is working', () => {
    // Create a table
    const p = new Table();

    p.addRows([
      // adding multiple rows are possible
      { index: 3, text: 'row default bottom border', value: 100 },
      { index: 4, text: 'row default bottom border', value: 300 },
    ]);

    // print
    const returned = renderTable(p.table);

    const expected = [
      '┌───────┬───────────────────────────┬───────┐',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01mindex\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m                     text\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01mvalue\u001b[0m\u001b[37m │\u001b[0m',
      '├───────┼───────────────────────────┼───────┤',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    3\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37mrow default bottom border\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m  100\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    4\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37mrow default bottom border\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m  300\u001b[0m\u001b[37m │\u001b[0m',
      '└───────┴───────────────────────────┴───────┘',
    ];
    expect(returned).toBe(expected.join('\n'));
  });

  it('Batch Row bottom border is working', () => {
    // Create a table
    const p = new Table();

    p.addRows(
      [
        // adding multiple rows are possible
        { index: 3, text: 'row with bottom border', value: 100 },
        { index: 4, text: 'row with bottom border', value: 300 },
      ],
      { bottomBorder: true }
    );

    // print
    const returned = renderTable(p.table);

    const expected = [
      '┌───────┬────────────────────────┬───────┐',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01mindex\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m                  text\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01mvalue\u001b[0m\u001b[37m │\u001b[0m',
      '├───────┼────────────────────────┼───────┤',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    3\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37mrow with bottom border\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m  100\u001b[0m\u001b[37m │\u001b[0m',
      '├───────┼────────────────────────┼───────┤',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    4\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37mrow with bottom border\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m  300\u001b[0m\u001b[37m │\u001b[0m',
      '└───────┴────────────────────────┴───────┘',
    ];
    expect(returned).toBe(expected.join('\n'));
  });
});
