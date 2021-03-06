import findWidthInConsole from './console-utils';
import { ALIGNMENT } from './table-constants';

// ("How are you?",center, 20) => "    How are you?    "
// ("How are you?",right, 20)  => "        How are you?"
export const textWithPadding = (
  text: string,
  alignment: ALIGNMENT,
  mxColumnLen: number
): string => {
  const curTextSize = findWidthInConsole(text);
  // alignments for center padding case
  const leftPadding = Math.floor((mxColumnLen - curTextSize) / 2);
  const rightPadding = mxColumnLen - leftPadding - curTextSize;
  switch (alignment) {
    case 'left':
      return text.concat(' '.repeat(mxColumnLen - curTextSize));
    case 'center':
      return ' '
        .repeat(leftPadding)
        .concat(text)
        .concat(' '.repeat(rightPadding));
    case 'right':
    default:
      return ' '.repeat(mxColumnLen - curTextSize).concat(text);
  }
};

// ("How are you?",10) => ["How are ", "you?"]
export const limitWidth = (input: string, width: number): string[] => {
  const ret: string[] = [];

  let now = 0;
  while (now < input.length) {
    let then = now + width;

    if (then >= input.length) {
      ret.push(input.substr(now));
      break;
    }

    while (input[then] !== ' ') {
      then -= 1;
    }
    ret.push(input.substr(now, then - now));

    now = then + 1;
  }
  return ret;
};
