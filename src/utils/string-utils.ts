import { ALIGNMENT, CharLengthDict } from '../models/common';
import { findWidthInConsole } from './console-utils';

/**
 * Splits text into lines that fit within a specified width
 * @param inputStr - The input string to split
 * @param width - Maximum width for each line
 * @param charLength - Custom character length mapping
 * @returns Array of strings, each fitting within the specified width
 */
export const splitTextIntoTextsOfMinLen = (
  inputStr: string,
  width: number,
  charLength?: CharLengthDict
): string[] => {
  if (!inputStr || width <= 0) {
    return [''];
  }

  const ret: string[] = [];

  // Split by newlines first
  const lines = inputStr.split(/[\n\r]/);

  lines.forEach((line) => {
    if (!line.trim()) {
      ret.push('');
      return;
    }

    const spaceSeparatedStrings = line.split(' ');

    let currentLine: string[] = [];
    let currentWidth = 0;

    spaceSeparatedStrings.forEach((word) => {
      const wordWidth = findWidthInConsole(word, charLength);
      
      if (currentWidth + wordWidth <= width) {
        currentWidth += wordWidth + 1; // +1 for space
        currentLine.push(word);
      } else {
        if (currentLine.length > 0) {
          ret.push(currentLine.join(' '));
        }
        currentLine = [word];
        currentWidth = wordWidth + 1;
      }
    });
    
    if (currentLine.length > 0) {
      ret.push(currentLine.join(' '));
    }
  });

  return ret;
};

/**
 * Adds padding to text based on alignment within a specified width
 * @param text - The text to pad
 * @param alignment - Text alignment: 'left', 'center', or 'right'
 * @param columnLen - Total column width
 * @param charLength - Custom character length mapping
 * @returns Padded text string
 */
export const textWithPadding = (
  text: string,
  alignment: ALIGNMENT,
  columnLen: number,
  charLength?: CharLengthDict
): string => {
  if (!text || columnLen <= 0) {
    return ' '.repeat(columnLen);
  }

  const textWidth = findWidthInConsole(text, charLength);
  
  // Handle case where text is wider than column
  if (columnLen < textWidth) {
    const splitLines = splitTextIntoTextsOfMinLen(text, columnLen, charLength);
    if (splitLines.length === 1) {
      return text;
    }
    return splitLines
      .map((line) =>
        textWithPadding(line, alignment, columnLen, charLength)
      )
      .join('\n');
  }

  const padding = columnLen - textWidth;

  switch (alignment) {
    case 'left':
      return text + ' '.repeat(padding);
    case 'center': {
      const leftPadding = Math.floor(padding / 2);
      const rightPadding = padding - leftPadding;
      return ' '.repeat(leftPadding) + text + ' '.repeat(rightPadding);
    }
    case 'right':
    default:
      return ' '.repeat(padding) + text;
  }
};

/**
 * Finds the width of the longest word in a sentence
 * @param inputStr - The input string to analyze
 * @param charLength - Custom character length mapping
 * @returns Width of the longest word
 */
export const biggestWordInSentence = (
  inputStr: string,
  charLength?: CharLengthDict
): number => {
  if (!inputStr) {
    return 0;
  }

  return inputStr
    .split(' ')
    .reduce((maxWidth, word) => {
      const wordWidth = findWidthInConsole(word, charLength);
      return Math.max(maxWidth, wordWidth);
    }, 0);
};
