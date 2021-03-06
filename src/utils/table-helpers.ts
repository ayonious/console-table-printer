import { Dictionary } from '../models/common';
import { Column, Row } from '../models/internal-table';
import findWidthInConsole from './console-utils';
import { limitWidth } from './string-utils';
import { COLOR } from './table-constants';

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

export const createColum = (name: string): Column => ({ name, title: name });

export const createRow = (color: COLOR, text: Dictionary): Row => ({
  color,
  text,
});

export const findMaxLenOfColumn = (column: Column, rows: Row[]): number => {
  const columnId = column.name;

  const columnTitle = column.title;
  let maxLen = findWidthInConsole(columnTitle);

  rows.forEach((row) => {
    maxLen = Math.max(maxLen, findWidthInConsole(cellText(row.text[columnId])));
  });

  if (column.maxLen) {
    // making sure the biggest word will fit in maxLen width
    maxLen = Math.max(column.maxLen, maxLen);
    rows.forEach((row) => {
      const strs = cellText(row.text[columnId]).split(' ');
      const maxWordLenForThisCol: number = strs.reduce(
        (a, b) => Math.max(a, findWidthInConsole(b)),
        0
      );
      maxLen = Math.max(maxLen, maxWordLenForThisCol);
    });
  }

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
      column.maxLen || 20
    );
  });

  return ret;
};
