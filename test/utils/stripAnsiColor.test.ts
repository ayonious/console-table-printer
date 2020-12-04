import chalk from 'chalk';
import stripAnsiColor from '../../src/utils/ansi-color-stripper';

describe('Strip Ansi Tester', () => {
  it('Simplest test: chalk', () => {
    const testFunction = (Fn: any) => {
      const str = Fn('text');
      console.log('length', str.length);
      // eslint-disable-next-line no-restricted-syntax
      for (const char of str) {
        console.log(char);
      }
    };
    testFunction(chalk.magentaBright);
  });
});
