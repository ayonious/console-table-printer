import { printTableAndGetConsoleOutput } from '../../src/internalTable/internal-table-printer';
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
    const returned = printTableAndGetConsoleOutput(p.table);

    const expected = [
      '┌───────┬───────────────────┬───────┐',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01mindex\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m             text\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01mvalue\u001b[0m\u001b[37m │\u001b[0m',
      '├───────┼───────────────────┼───────┤',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[32m    3\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[32mgreen color text1\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[32m  100\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[32m    4\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[32mgreen color text2\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[32m  300\u001b[0m\u001b[37m │\u001b[0m',
      '└───────┴───────────────────┴───────┘',
    ];
    expect(JSON.stringify(returned)).toBe(JSON.stringify(expected));
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
    const returned = printTableAndGetConsoleOutput(p.table);

    const expected = [
      '┌───────┬───────────────────┬───────┐',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01mindex\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m             text\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01mvalue\u001b[0m\u001b[37m │\u001b[0m',
      '├───────┼───────────────────┼───────┤',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    3\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37mgreen color text1\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m  100\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    4\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37mgreen color text2\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m  300\u001b[0m\u001b[37m │\u001b[0m',
      '└───────┴───────────────────┴───────┘',
    ];
    expect(JSON.stringify(returned)).toBe(JSON.stringify(expected));
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
    const returned = printTableAndGetConsoleOutput(p.table);

    const expected = [
      '┌───────┬───────────────────┬───────┐',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01mindex\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m             text\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01mvalue\u001b[0m\u001b[37m │\u001b[0m',
      '├───────┼───────────────────┼───────┤',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[32m    3\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[32mgreen color text1\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[32m  100\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[32m    4\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[32mgreen color text2\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[32m  300\u001b[0m\u001b[37m │\u001b[0m',
      '└───────┴───────────────────┴───────┘',
    ];
    expect(JSON.stringify(returned)).toBe(JSON.stringify(expected));
  });
});
