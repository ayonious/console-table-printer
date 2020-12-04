import stripAnsiColor from '../../src/utils/ansi-color-stripper';
import ColoredConsoleLine from '../../src/utils/colored-console-line';

describe('Strip Ansi Tester', () => {
  it('Simplest test: ColoredConsoleLine', () => {
    const line = new ColoredConsoleLine();
    line.addWithColor('red', 'red');
    line.addWithColor('green', 'green');
    line.addWithColor('white_bold', 'white');
    expect(stripAnsiColor(line.renderConsole())).toBe('redgreenwhite');
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
