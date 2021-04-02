import { objIfExists } from '../internalTable/input-converter';
import { COLOR, Dictionary, Row } from '../models/common';
import { ComputedColumn } from '../models/external-table';
import { Column } from '../models/internal-table';
import findWidthInConsole from './console-utils';
import { biggestWordInSentence, limitWidth } from './string-utils';
import { DEFAULT_COLUMN_LEN, defaultRowAlignment } from './table-constants';

// takes any input that is given by user and converts to string
export const cellText = (text: string | number): string =>
  text === undefined || text === null ? '' : `${text}`;

export interface RowOptionsRaw {
  color: string;
}

export interface RowOptions {
  color: COLOR;
}

export const convertRawRowOptionsToStandard = (
  options?: RowOptionsRaw
): RowOptions | undefined => {
  if (options) {
    return {
      color: options.color as COLOR,
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
  title: column.title || column.name,
  ...objIfExists('color', column.color as COLOR),
  ...objIfExists('maxLen', column.maxLen),
  alignment: column.alignment || defaultRowAlignment,
});

export const createRow = (color: COLOR, text: Dictionary): Row => ({
  color,
  text,
});

export const findMaxLenOfColumn = (column: Column, rows: Row[]): number => {
  const columnId = column.name;
  const columnTitle = column.title;

  if (column.maxLen) {
    // if customer input is mentioned a max width, lets see if all other can fit here
    // if others cant fit find the max word length so that at least the table can be printed
    const ret = Math.max(column.maxLen, biggestWordInSentence(columnTitle));
    return rows.reduce(
      (acc, row) =>
        Math.max(acc, biggestWordInSentence(cellText(row.text[columnId]))),
      ret
    );
  }

  let maxLen = findWidthInConsole(columnTitle);

  rows.forEach((row) => {
    maxLen = Math.max(maxLen, findWidthInConsole(cellText(row.text[columnId])));
  });

  return maxLen;
};

export const renderTableHorizontalBorders = (
  style: any,
  column_lengths: number[]
): string => {
  const str = createTableHorizontalBorders(style, column_lengths);
  return str;
};

export const createHeaderAsRow = (createRowFn: any, columns: Column[]): Row => {
  const headerColor: COLOR = 'white_bold';
  const row: Row = createRowFn(headerColor, {});
  columns.forEach((column) => {
    row.text[column.name] = column.title;
  });
  return row;
};

// { col1: ['How', 'Is', 'Going'], col2: ['I am', 'Tom'],  }
export const getWidthLimitedColumnsArray = (
  columns: Column[],
  row: Row
): { [key: string]: string[] } => {
  const ret: { [key: string]: string[] } = {};

  columns.forEach((column) => {
    ret[column.name] = limitWidth(
      cellText(row.text[column.name]),
      column.maxLen || DEFAULT_COLUMN_LEN
    );
  });

  return ret;
};
