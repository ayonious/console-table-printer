import { CharLengthDict, COLOR, Dictionary, Row } from '../models/common';
import { Column } from '../models/internal-table';
import { findWidthInConsole } from './console-utils';
import {
  biggestWordInSentence,
  splitTextIntoTextsOfMinLen,
} from './string-utils';
import {
  DEFAULT_COLUMN_LEN,
  DEFAULT_HEADER_FONT_COLOR,
  DEFAULT_ROW_SEPARATOR,
} from './table-constants';

const max = (a: number, b: number) => Math.max(a, b);

/**
 * Converts any input to a string representation for table cells
 * @param text - The input value to convert
 * @returns String representation of the input
 */
export const cellText = (text: string | number | null | undefined): string =>
  text === undefined || text === null ? '' : `${text}`;

export interface RowOptionsRaw {
  color?: string;
  separator?: boolean;
}

export interface RowOptions {
  color: COLOR;
  separator: boolean;
}

/**
 * Converts raw row options to standardized row options
 * @param options - Raw row options from user input
 * @returns Standardized row options or undefined
 */
export const convertRawRowOptionsToStandard = (
  options?: RowOptionsRaw
): RowOptions | undefined => {
  if (options) {
    return {
      color: options.color as COLOR,
      separator: options.separator || DEFAULT_ROW_SEPARATOR,
    };
  }
  return undefined;
};

/**
 * Creates horizontal border lines for table rendering
 * @param style - Border style configuration
 * @param columnLengths - Array of column widths
 * @returns Formatted border string
 */
export const createTableHorizontalBorders = (
  {
    left,
    mid,
    right,
    other,
  }: { left: string; mid: string; right: string; other: string },
  columnLengths: number[]
): string => {
  // ╚
  let ret = left;

  // ╚═══════╩═══════════════════════════════════════╩════════╩
  columnLengths.forEach((len) => {
    ret += other.repeat(len + 2);
    ret += mid;
  });

  // ╚═══════╩═══════════════════════════════════════╩════════
  ret = ret.slice(0, -mid.length);

  // ╚═══════╩═══════════════════════════════════════╩════════╝
  ret += right;
  return ret;
};

/**
 * Creates a column configuration from just a name
 * @param name - Column name
 * @returns Basic column configuration
 */
export const createColumFromOnlyName = (
  name: string
): { name: string; title: string } => ({
  name,
  title: name,
});

/**
 * Creates a row object with color and separator settings
 * @param color - Row color
 * @param text - Row data
 * @param separator - Whether to show separator after this row
 * @returns Row object
 */
export const createRow = (
  color: COLOR,
  text: Dictionary,
  separator: boolean
): Row => ({
  color,
  separator,
  text,
});

/**
 * Calculates the optimal width for a column based on content
 * @param column - Column configuration
 * @param rows - Array of table rows
 * @param charLength - Custom character length mapping
 * @returns Optimal column width
 */
export const findLenOfColumn = (
  column: Column,
  rows: Row[],
  charLength?: CharLengthDict
): number => {
  const columnId = column.name;
  const columnTitle = column.title;
  let length = max(0, column?.minLen || 0);

  if (column.maxLen) {
    // if customer input is mentioned a max width, lets see if all other can fit here
    // if others cant fit find the max word length so that at least the table can be printed
    length = max(
      length,
      max(column.maxLen, biggestWordInSentence(columnTitle, charLength))
    );
    length = rows.reduce(
      (acc, row) =>
        max(
          acc,
          biggestWordInSentence(cellText(row.text[columnId]), charLength)
        ),
      length
    );
    return length;
  }

  length = max(length, findWidthInConsole(columnTitle, charLength));

  rows.forEach((row) => {
    length = max(
      length,
      findWidthInConsole(cellText(row.text[columnId]), charLength)
    );
  });

  return length;
};

/**
 * Renders horizontal borders for table styling
 * @param style - Border style configuration
 * @param columnLengths - Array of column widths
 * @returns Formatted border string
 */
export const renderTableHorizontalBorders = (
  style: { left: string; mid: string; right: string; other: string },
  columnLengths: number[]
): string => {
  return createTableHorizontalBorders(style, columnLengths);
};

/**
 * Creates a header row from column configurations
 * @param createRowFn - Function to create row objects
 * @param columns - Array of column configurations
 * @returns Header row object
 */
export const createHeaderAsRow = (
  createRowFn: (color: COLOR, text: Dictionary, separator: boolean) => Row,
  columns: Column[]
): Row => {
  const headerColor: COLOR = DEFAULT_HEADER_FONT_COLOR;
  const row: Row = createRowFn(headerColor, {}, false);
  columns.forEach((column) => {
    row.text[column.name] = column.title;
  });
  return row;
};

/**
 * Splits row content into width-limited arrays for multi-line rendering
 * @param columns - Array of column configurations
 * @param row - Row data
 * @param charLength - Custom character length mapping
 * @returns Object mapping column names to arrays of text lines
 */
export const getWidthLimitedColumnsArray = (
  columns: Column[],
  row: Row,
  charLength?: CharLengthDict
): { [key: string]: string[] } => {
  const ret: { [key: string]: string[] } = {};

  columns.forEach((column) => {
    ret[column.name] = splitTextIntoTextsOfMinLen(
      cellText(row.text[column.name]),
      column.length || DEFAULT_COLUMN_LEN,
      charLength
    );
  });

  return ret;
};
