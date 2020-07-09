import { COLOR, ALIGNMENT } from './table-constants';
import {
  RowSortFunction,
  RowFilterFunction,
} from '../internalTable/internal-table';

export interface Column {
  name: string;
  alignment?: ALIGNMENT;
  color?: COLOR;
  max_ln?: number;
}

export interface Row {
  color: COLOR;
  text: any;
}

export function convertRawRowOptionsToStanrd(
  options?: RowOptionsRaw
): RowOptions | undefined {
  if (options) {
    return {
      color: (<any>COLOR)[options.color],
    };
  }
  return undefined;
}

export interface RowOptionsRaw {
  color: string;
}

export interface RowOptions {
  color: COLOR;
}

export function textWithPadding(
  text: string,
  alignment: ALIGNMENT,
  mxColumnLen: number
): string {
  const curTextSize = text.length;
  switch (alignment) {
    case ALIGNMENT.left:
      return text.padEnd(mxColumnLen);
    case ALIGNMENT.right:
      return text.padStart(mxColumnLen);
    case ALIGNMENT.center:
      return text
        .padStart((mxColumnLen - curTextSize) / 2 + curTextSize)
        .padEnd(mxColumnLen);
    default:
      return text.padStart(mxColumnLen);
  }
}

export function createTableHorizontalBorders(
  {
    left,
    mid,
    right,
    other,
  }: { left: string; mid: string; right: string; other: string },
  column_lengths: number[]
) {
  let ret = left;

  column_lengths.forEach((len) => {
    ret += other.repeat(len + 2);
    ret += mid;
  });

  ret = ret.slice(0, -1);
  ret += right;
  return ret;
}

export function createColum(name: string): Column {
  return { name };
}

export function createRow(color: COLOR, text: string): Row {
  return { color, text };
}

export function findMaxLenOfColumn(column: Column, rows: Row[]): number {
  const column_name = column.name;
  let max_ln = `${column_name}`.length;

  rows.forEach((row) => {
    max_ln = Math.max(max_ln, `${row.text[column_name] || ''}`.length);
  });

  return max_ln;
}

export function printTableHorizontalBorders(
  style: any,
  column_lengths: number[]
): string {
  const str = createTableHorizontalBorders(style, column_lengths);
  console.log(str);
  return str;
}

export function createHeaderAsRow(createRowFn: any, columns: Column[]): Row {
  const row: Row = createRowFn(COLOR.white_bold, {});
  columns.forEach((column) => {
    row.text[column.name] = column.name;
  });
  return row;
}

export function cellText(text: string): string {
  return text === undefined || text === null ? '' : text;
}
