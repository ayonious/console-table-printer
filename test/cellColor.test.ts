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
  });
});
