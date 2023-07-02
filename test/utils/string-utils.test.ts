import chalk from 'chalk';
import {
  splitTextIntoTextsOfMinLen,
  textWithPadding,
} from '../../src/utils/string-utils';

describe('Example: Print a simple Table with cell colors', () => {
  it('cell colors are working', () => {
    expect(splitTextIntoTextsOfMinLen('as da s', 2)).toMatchObject([
      'as',
      'da',
      's',
    ]);
    expect(splitTextIntoTextsOfMinLen('as', 2)).toMatchObject(['as']);
    expect(splitTextIntoTextsOfMinLen('Hiya!', 5)).toMatchObject(['Hiya!']);
    expect(
      splitTextIntoTextsOfMinLen(
        chalk.bgMagenta('magenta'),
        chalk.bgMagenta('magenta').length
      )
    ).toMatchObject([chalk.bgMagenta('magenta')]);
  });

  it('should not pass negative numbers into string.repeat', () => {
    expect(textWithPadding('How are you?', 'right', 14)).toEqual(
      '  How are you?'
    );
    expect(textWithPadding('How are you?', 'left', 14)).toEqual(
      'How are you?  '
    );
    expect(textWithPadding('How are you?', 'center', 14)).toEqual(
      ' How are you? '
    );
    expect(textWithPadding('How are you?', 'right', 8)).toEqual(
      ' How are\n    you?'
    );
  });
});
