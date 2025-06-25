import { wcswidth } from 'simple-wcswidth';
import { CharLengthDict } from '../models/common';

/* eslint-disable no-control-regex */
const colorRegex = /\x1b\[\d{1,3}(;\d{1,3})*m/g; // \x1b[30m \x1b[305m \x1b[38;5m

/**
 * Removes ANSI color codes from a string
 * @param str - The string to strip color codes from
 * @returns String without ANSI color codes
 */
export const stripAnsi = (str: string): string => {
  if (!str) {
    return '';
  }
  return str.replace(colorRegex, '');
};

/**
 * Calculates the display width of a string in console
 * @param str - The string to measure
 * @param charLength - Custom character length mapping for special characters
 * @returns The display width of the string
 */
export const findWidthInConsole = (
  str: string,
  charLength?: CharLengthDict
): number => {
  if (!str) {
    return 0;
  }

  let totalWidth = 0;
  let processedStr = stripAnsi(str);

  // Apply custom character length mappings
  if (charLength) {
    Object.entries(charLength).forEach(([char, width]) => {
      const regex = new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = processedStr.match(regex);
      if (matches) {
        totalWidth += matches.length * width;
        processedStr = processedStr.replace(regex, '');
      }
    });
  }

  // Add width for remaining characters
  totalWidth += wcswidth(processedStr);
  
  return totalWidth;
};
