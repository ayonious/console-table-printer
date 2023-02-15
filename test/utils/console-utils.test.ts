import chalk from 'chalk';

import ColoredConsoleLine from '../../src/utils/colored-console-line';
import { findWidthInConsole, stripAnsi } from '../../src/utils/console-utils';

describe('Console Width Calculation', () => {
  it('Simplest test: Colored Line', () => {
    const line = new ColoredConsoleLine();
    line.addCharsWithColor('red', 'red');
    line.addCharsWithColor('green', 'green');
    line.addCharsWithColor('white_bold', 'white');
    expect(findWidthInConsole(line.renderConsole())).toBe(13);
  });

  it('Simplest test: Colored Foreign Language', () => {
    const line = new ColoredConsoleLine();
    line.addCharsWithColor('red', '한');
    expect(findWidthInConsole(line.renderConsole())).toBe(2);
  });

  it('Character length test: No character substitution', () => {
    expect(findWidthInConsole('abc')).toBe(3);
  });

  it('Character length test: Character length substitution', () => {
    expect(findWidthInConsole('abc', { a: 2 })).toBe(4);
  });

  it('Character length test: Hard coded ansi codes', () => {
    expect(stripAnsi('\x1b[38;5mtext')).toBe('text');
    expect(stripAnsi('\x1b[38mtext')).toBe('text');
  });

  // these fail on travis bcs travis has another kind of console

  it('Simplest test: chalk', () => {
    const testFunction = (Fn: any) => {
      expect(stripAnsi(Fn('text'))).toBe('text');
    };
    [
      chalk.bgMagentaBright,
      chalk.black,
      chalk.bold,
      chalk.dim,
      chalk.hidden,
      chalk.inverse,
      chalk.italic,
      chalk.magentaBright,
      chalk.redBright,
      chalk.reset,
      chalk.strikethrough,
      chalk.underline,
      chalk.visible,
    ].forEach((fn) => {
      testFunction(fn);
    });
  });
});
