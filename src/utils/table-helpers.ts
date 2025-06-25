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

export const createColumFromOnlyName = (
  name: string
): { name: string; title: string } => ({
  name,
  title: name,
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
