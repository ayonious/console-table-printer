import chalk from 'chalk';
import { Table } from '../index';

describe('Example: Print a simple Table with cell colors', () => {
  it('cell colors are working', () => {
    // Create a table
    const p = new Table();

    // add rows with color
    p.addRow({ index: 1, text: chalk.red('red'), value: 10.212 });
    p.addRow({ index: 2, text: chalk.green('green'), value: 20.0 });
    p.addRows([
      // adding multiple rows are possible
      { index: 3, text: chalk.yellow('yellow'), value: 100 },
      { index: 4, text: chalk.bgMagenta('magenta'), value: 300 },
    ]);

    // print
    p.printTable();

    const expected = [
      '┌───────┬─────────┬────────┐',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01mindex\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m   text\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m value\u001b[0m\u001b[37m │\u001b[0m',
      '├───────┼─────────┼────────┤',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    1\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m    \u001b[31mred\u001b[39m\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m10.212\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    2\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m  \u001b[32mgreen\u001b[39m\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m    20\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    3\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m \u001b[33myellow\u001b[39m\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m   100\u001b[0m\u001b[37m │\u001b[0m',
      '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    4\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m\u001b[45mmagenta\u001b[49m\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m   300\u001b[0m\u001b[37m │\u001b[0m',
      '└───────┴─────────┴────────┘',
    ];

    const returned = p.render();
    expect(returned).toBe(expected.join('\n'));
  });
});
