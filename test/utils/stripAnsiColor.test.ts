import stripAnsiColor from '../../src/utils/ansi-color-stripper';
import ColoredConsoleLine from '../../src/utils/colored-console-line';

describe('Strip Ansi Tester', () => {
  it('Simplest test', () => {
    const line = new ColoredConsoleLine();
    line.addWithColor('red', 'red');
    line.addWithColor('green', 'green');
    line.addWithColor('white_bold', 'white');
    expect(stripAnsiColor(line.renderConsole())).toBe('redgreenwhite');
  });
});
