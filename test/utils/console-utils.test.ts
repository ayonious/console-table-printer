import ColoredConsoleLine from '../../src/utils/colored-console-line';
import findWidthInConsole from '../../src/utils/console-utils';

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

  /* these fail on travis bcs travis has another kind of console
  it('Simplest test: chalk', () => {
    const testFunction = (Fn: any) => {
      expect(stripAnsiColor(Fn('text'))).toBe('text');
    };
    testFunction(chalk.black);
    testFunction(chalk.redBright);
    testFunction(chalk.strikethrough);
    testFunction(chalk.bgMagentaBright);
    testFunction(chalk.bold);
    testFunction(chalk.magentaBright);
    testFunction(chalk.visible);
    testFunction(chalk.hidden);
    testFunction(chalk.dim);
  });
  */
});
