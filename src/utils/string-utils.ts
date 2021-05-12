import { ALIGNMENT } from '../models/common';
import findWidthInConsole from './console-utils';

// ("How are you?",center, 20) => "    How are you?    "
// ("How are you?",right, 20)  => "        How are you?"
export const textWithPadding = (
  text: string,
  alignment: ALIGNMENT,
  columnLen: number
): string => {
  const curTextSize = findWidthInConsole(text);
  // alignments for center padding case
  const leftPadding = Math.floor((columnLen - curTextSize) / 2);
  const rightPadding = columnLen - leftPadding - curTextSize;

  // console.log(text, columnLen, curTextSize);
  switch (alignment) {
    case 'left':
      return text.concat(' '.repeat(columnLen - curTextSize));
    case 'center':
      return ' '
        .repeat(leftPadding)
        .concat(text)
        .concat(' '.repeat(rightPadding));
    case 'right':
    default:
      return ' '.repeat(columnLen - curTextSize).concat(text);
  }
};

// ("How are you?",10) => ["How are ", "you?"]
export const limitWidth = (inpStr: string, width: number): string[] => {
  const ret: string[] = [];

  const spaceSeparatedStrings = inpStr.split(' ');

  let now: string[] = [];
  let cnt = 0;
  spaceSeparatedStrings.forEach((strWithoutSpace) => {
    const consoleWidth = findWidthInConsole(strWithoutSpace);
    if (cnt + consoleWidth <= width) {
      cnt += consoleWidth + 1; // 1 for the space
      now.push(strWithoutSpace);
    } else {
      ret.push(now.join(' '));
      now = [strWithoutSpace];
      cnt = consoleWidth + 1;
    }
  });
  ret.push(now.join(' '));

  return ret;
};

// ("How are you?",10) => ["How are ", "you?"]
export const biggestWordInSentence = (inpStr: string): number =>
  inpStr.split(' ').reduce((a, b) => Math.max(a, findWidthInConsole(b)), 0);
