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

  it('Bold italic etc.', () => {
    expect(stripAnsi('\u001b[1mHelloWorld\u001b[0m')).toBe('HelloWorld');
    expect(stripAnsi('\u001b[4mHelloWorld\u001b[0m')).toBe('HelloWorld');
    expect(stripAnsi('\u001b[7m\u001b[4m\u001b[1mHelloWorld\u001b[0m')).toBe(
      'HelloWorld'
    );
  });

  it('Character length test: Hard coded ansi codes', () => {
    expect(stripAnsi('\x1b[38;5mtext')).toBe('text');
    expect(stripAnsi('\x1b[38mtext')).toBe('text');
    expect(stripAnsi('\u001b[32mtext')).toBe('text');
  });

  it('other escape codes are also detected', () => {
    expect(stripAnsi('\u001b[32mtext')).toBe('text');
  });

  it('Some combined cases', () => {
    expect(stripAnsi('\u001b[31mtext\u001b[0m')).toBe('text');
    expect(stripAnsi('\u001b[31mtext\u001b[0mAgain')).toBe('textAgain');
  });

  it('8 Color terminals', () => {
    expect(stripAnsi('\u001b[34mtext')).toBe('text');
    expect(stripAnsi('\u001b[34mtext\u001b[0m')).toBe('text');
    expect(stripAnsi('\u001b[34mtext\u001b[0m\u001b[37mAgain')).toBe(
      'textAgain'
    );
  });

  it('16 Color terminals', () => {
    expect(stripAnsi('\u001b[35;1mtext\u001b[0m')).toBe('text');
    expect(stripAnsi('\u001b[35;1mtext\u001b[34;1mAgain\u001b[0m')).toBe(
      'textAgain'
    );
  });

  it('256 Color terminals', () => {
    expect(stripAnsi('\u001b[38;5;255mtext\u001b[34;1mAgain\u001b[0m')).toBe(
      'textAgain'
    );
    expect(stripAnsi('\u001b[38;5;255mtextAgain\u001b[0m')).toBe('textAgain');
  });

  it('Background Colors', () => {
    expect(stripAnsi('\u001b[43;1mtext\u001b[0m')).toBe('text');
    expect(stripAnsi('\u001b[44mtext\u001b[0m')).toBe('text');
  });

  it('Background Colors 256 Colors', () => {
    expect(stripAnsi('\u001b[48;5;255mtext\u001b[0m')).toBe('text');
  });
});
