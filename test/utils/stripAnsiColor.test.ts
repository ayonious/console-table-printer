import chalk from 'chalk';
import stripAnsiColor from '../../src/utils/ansi-color-stripper';

describe('Strip Ansi Tester', () => {
  it('Simplest test: chalk', () => {
    const str = chalk.magentaBright('text');
    console.log('magentaBright', str.length, str);
    // eslint-disable-next-line no-restricted-syntax
    for (const char of str) {
      console.log(char);
    }

    const str1 = chalk.yellow('text');
    console.log('yellow', str1.length, str1);
    // eslint-disable-next-line no-restricted-syntax
    for (const char of str1) {
      console.log(char);
    }

    const str2 = chalk.bgRedBright('text');
    console.log('bgRedBright', str2.length, str2);
    // eslint-disable-next-line no-restricted-syntax
    for (const char of str2) {
      console.log(char);
    }
  });
});
