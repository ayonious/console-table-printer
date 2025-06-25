import { CharLengthDict, COLOR, Dictionary, Row } from '../models/common';
import { Column, TableLineDetails } from '../models/internal-table';
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
 * Converts any input value to a string representation
 * Handles undefined and null values by returning an empty string
 * 
 * @param text - The value to convert to string
 * @returns The string representation of the input
 * 
 * @example
 * cellText(42) => "42"
 * cellText("hello") => "hello"
 * cellText(undefined) => ""
 * cellText(null) => ""
 */
export const cellText = (text: string | number): string =>
  text === undefined || text === null ? '' : `${text}`;

export interface RowOptionsRaw {
  color?: string;
  separator?: boolean;
}

export interface RowOptions {
  color: COLOR;
  separator: boolean;
}

interface ColumnOfOnlyName {
  name: string;
  title: string;
}

/**
 * Converts raw row options provided by the user to standardized internal row options
 * Applies default values for missing properties
 * 
 * @param options - Raw row options that may be incomplete
 * @returns Standardized row options with all required fields or undefined if no options provided
 * 
 * @example
 * convertRawRowOptionsToStandard({ color: "red" }) => { color: "red", separator: false }
 * convertRawRowOptionsToStandard({ separator: true }) => { color: undefined, separator: true }
 * convertRawRowOptionsToStandard() => undefined
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
 * Creates horizontal border lines for tables with the specified style and column lengths
 * 
 * @param borderStyle - Object containing border characters (left, mid, right, other)
 * @param column_lengths - Array of column widths
 * @returns A string representing a horizontal border line
 * 
 * @example
 * createTableHorizontalBorders(
 *   { left: "╚", mid: "╩", right: "╝", other: "═" },
 *   [5, 10, 7]
 * ) => "╚═══════╩════════════╩═════════╝"
 */
export const createTableHorizontalBorders = (
  {
    left,
    mid,
    right,
    other,
  }: TableLineDetails,
  column_lengths: number[]
) => {
  // ╚
  let ret = left;

  // ╚═══════╩═══════════════════════════════════════╩════════╩
  column_lengths.forEach((len) => {
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
 * Creates a column object from just a column name
 * Uses the name as both the identifier and display title
 * 
 * @param name - The column name to use
 * @returns A column object with name and title properties
 * 
 * @example
 * createColumFromOnlyName("id") => { name: "id", title: "id" }
 */
export const createColumFromOnlyName = (
  name: string
): ColumnOfOnlyName => ({
  name,
  title: name,
});

/**
 * Creates a row object with the specified properties
 * 
 * @param color - The color to apply to the row
 * @param text - The dictionary of column values
 * @param separator - Whether to show a separator after this row
 * @returns A Row object
 * 
 * @example
 * createRow("green", { id: 1, name: "John" }, true) => 
 *   { color: "green", separator: true, text: { id: 1, name: "John" } }
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
 * Calculates the optimal length for a column based on its content and configuration
 * Takes into account minLen, maxLen, column title, and all row values
 * 
 * @param column - The column configuration
 * @param rows - All table rows to analyze
 * @param charLength - Optional character length dictionary for special characters
 * @returns The calculated optimal column width
 * 
 * @example
 * findLenOfColumn(
 *   { name: "id", title: "ID", minLen: 2 },
 *   [{ text: { id: 1 } }, { text: { id: 100 } }]
 * ) => 3  // Width needed for "100"
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
 * Renders horizontal border lines for tables with the specified style and column lengths
 * Handles undefined style by returning an empty string
 * 
 * @param style - The border style to use (can be undefined)
 * @param column_lengths - Array of column widths
 * @returns A string representing a horizontal border line
 * 
 * @example
 * renderTableHorizontalBorders(
 *   { left: "╚", mid: "╩", right: "╝", other: "═" },
 *   [5, 10, 7]
 * ) => "╚═══════╩════════════╩═════════╝"
 * 
 * renderTableHorizontalBorders(undefined, [5, 10, 7]) => ""
 */
export const renderTableHorizontalBorders = (
  style: TableLineDetails | undefined,
  column_lengths: number[]
): string => {
  if (!style) {
    return '';
  }
  const str = createTableHorizontalBorders(style, column_lengths);
  return str;
};

/**
 * Creates a header row from column definitions
 * 
 * @param createRowFn - Function to create a row
 * @param columns - Array of column definitions
 * @returns A Row object representing the header
 * 
 * @example
 * createHeaderAsRow(
 *   createRow,
 *   [{ name: "id", title: "ID" }, { name: "name", title: "Name" }]
 * ) => { 
 *   color: "white", 
 *   separator: false, 
 *   text: { id: "ID", name: "Name" } 
 * }
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
 * Splits row text into arrays of lines that fit within column width limits
 * Used for handling text wrapping in table cells
 * 
 * @param columns - Array of column definitions with length constraints
 * @param row - The row containing text to split
 * @param charLength - Optional character length dictionary for special characters
 * @returns An object mapping column names to arrays of text lines
 * 
 * @example
 * getWidthLimitedColumnsArray(
 *   [{ name: "desc", length: 10 }],
 *   { text: { desc: "This is a long description that needs wrapping" } }
 * ) => { 
 *   desc: ["This is a", "long", "description", "that needs", "wrapping"] 
 * }
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
