import { wcswidth } from 'simple-wcswidth';
import stripAnsi from 'strip-ansi';
import { CharLengthDict } from '../models/common';

export const findWidthInConsole = (
  str: string,
  charLength?: CharLengthDict
): number => {
  let strLen = 0;
  str = stripAnsi(str);
  if (charLength) {
    Object.entries(charLength).forEach(([key, value]) => {
      // count appearance of the key in the string and remove from original string
      let regex = new RegExp(key, 'g');
      strLen += (str.match(regex) || []).length * value;
      str = str.replace(key, '');
    });
  }
  strLen += wcswidth(str);
  return strLen;
};

export default findWidthInConsole;
