import { Dictionary } from '../models/common';
import { Column, Row } from '../models/internal-table';
import findWidthInConsole from './console-utils';
import { COLOR } from './table-constants';

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

  if (column.maxLen) {
    // making sure the biggest word will fit in maxLen width
    let ret = column.maxLen;
    rows.forEach((row) => {
      const strs = `${row.text[columnId] || ''}`.split(' ');
      const maxWordLen: number = strs.reduce(
        (a, b) => Math.max(a, b.length),
        0
      );
      ret = Math.max(ret, maxWordLen);
    });
    return ret;
  }
  const columnTitle = column.title;
  let maxLen = findWidthInConsole(`${columnTitle}`);

  rows.forEach((row) => {
    maxLen = Math.max(
      maxLen,
      findWidthInConsole(`${row.text[columnId] || ''}`)
    );
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

export const cellText = (text: string): string =>
  text === undefined || text === null ? '' : text;
