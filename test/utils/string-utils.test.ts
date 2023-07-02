import chalk from 'chalk';
import { textWithPadding, limitWidth } from '../../src/utils/string-utils';

describe('Example: Print a simple Table with cell colors', () => {
  it('cell colors are working', () => {
    expect(limitWidth('as da s', 2)).toMatchObject(['as', 'da', 's']);
    expect(limitWidth('as', 2)).toMatchObject(['as']);
    expect(limitWidth('Hiya!', 5)).toMatchObject(['Hiya!']);
    expect(
      limitWidth(chalk.bgMagenta('magenta'), chalk.bgMagenta('magenta').length)
    ).toMatchObject([chalk.bgMagenta('magenta')]);
  });

  it('should not pass negative numbers into string.repeat', () => {
    expect(textWithPadding('How are you?', 'right', 8)).toEqual(
      ' How are\n    you?'
    );
  });
});
