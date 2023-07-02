import { wcswidth } from 'simple-wcswidth';
import { CharLengthDict } from '../models/common';

/* eslint-disable no-control-regex */
const colorRegex = /\x1b\[\d{1,3}(;\d{1,3})*m/g; // \x1b[30m \x1b[305m \x1b[38;5m

export const stripAnsi = (str: string): string => str.replace(colorRegex, '');

export const findWidthInConsole = (
  str: string,
  charLength?: CharLengthDict
): number => {
  let strLen = 0;
  let ansiStrippedStr = stripAnsi(str);
  if (charLength) {
    Object.entries(charLength).forEach(([key, value]) => {
      // count appearance of the key in the string and remove from original string
      const regex = new RegExp(key, 'g');
      strLen += (ansiStrippedStr.match(regex) || []).length * value;
      ansiStrippedStr = ansiStrippedStr.replace(key, '');
    });
  }
  strLen += wcswidth(ansiStrippedStr);
  return strLen;
};
