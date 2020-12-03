import chalk from 'chalk';
import stripAnsiColor from '../src/utils/ansi-color-stripper';

describe('Strip Ansi Tester', () => {
  it('Simplest test', () => {
    console.log(stripAnsiColor(chalk.green('O')));
    console.log(stripAnsiColor(chalk.greenBright('O')));
    console.log(stripAnsiColor(chalk.bgGreen('O')));
  });
});
