import { objIfExists } from '../internalTable/input-converter';
import { CharLengthDict, COLOR, Dictionary, Row } from '../models/common';
import { ComputedColumn } from '../models/external-table';
import { Column } from '../models/internal-table';
import { findWidthInConsole } from './console-utils';
import {
  biggestWordInSentence,
  splitTextIntoTextsOfMinLen,
} from './string-utils';
import {
  DEFAULT_COLUMN_LEN,
  DEFAULT_ROW_ALIGNMENT,
  DEFAULT_ROW_SEPARATOR,
  DEFAULT_HEADER_FONT_COLOR,
} from './table-constants';

const max = (a: number, b: number) => Math.max(a, b);
const min = (a: number, b: number) => Math.min(a, b);

// takes any input that is given by user and converts to string
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

export const createTableHorizontalBorders = (
  {
    left,
    mid,
    right,
    other,
  }: { left: string; mid: string; right: string; other: string },
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

export const createColumFromOnlyName = (name: string): Column => ({
  name,
  title: name,
});
export const createColumFromComputedColumn = (
  column: ComputedColumn
): Column => ({
  name: column.name,
  title: column.title ?? column.name,
  ...objIfExists('color', column.color as COLOR),
  ...objIfExists('maxLen', column.maxLen),
  ...objIfExists('minLen', column.minLen),
  alignment: column.alignment || DEFAULT_ROW_ALIGNMENT,
});

export const createRow = (
  color: COLOR,
  text: Dictionary,
  separator: boolean
): Row => ({
  color,
  separator,
  text,
});

export const findLenOfColumn = (
  column: Column,
  rows: Row[],
  charLength?: CharLengthDict
): number => {
  const columnId = column.name;
  const columnTitle = column.title;
  
  // First, calculate the content length without constraints
  let contentLength = findWidthInConsole(columnTitle, charLength);
  rows.forEach((row) => {
    contentLength = max(
      contentLength,
      findWidthInConsole(cellText(row.text[columnId]), charLength)
    );
  });

  // Apply minLen constraint
  let length = max(contentLength, column?.minLen || 0);

  // Apply maxLen constraint if specified
  if (column.maxLen !== undefined) {
    // If content needs to be wrapped, use the biggest word length
    if (contentLength > column.maxLen) {
      const biggestWordLength = max(
        biggestWordInSentence(columnTitle, charLength),
        rows.reduce(
          (acc, row) =>
            max(
              acc,
              biggestWordInSentence(cellText(row.text[columnId]), charLength)
            ),
          0
        )
      );
      // Use the larger of maxLen and biggest word length to ensure text can be displayed
      length = max(biggestWordLength, column.maxLen);
    } else {
      length = min(length, column.maxLen);
    }
  }

  return length;
};

export const renderTableHorizontalBorders = (
  style: any,
  column_lengths: number[]
): string => {
  const str = createTableHorizontalBorders(style, column_lengths);
  return str;
};

export const createHeaderAsRow = (createRowFn: any, columns: Column[]): Row => {
  const headerColor: COLOR = DEFAULT_HEADER_FONT_COLOR;
  const row: Row = createRowFn(headerColor, {}, false);
  columns.forEach((column) => {
    row.text[column.name] = column.title;
  });
  return row;
};

// { col1: ['How', 'Is', 'Going'], col2: ['I am', 'Tom'],  }
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
