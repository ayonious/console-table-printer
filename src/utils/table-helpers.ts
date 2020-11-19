import wcwidth from 'wcwidth';
import { ALIGNMENT, COLOR } from './table-constants';

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

export interface RowOptionsRaw {
  color: string;
}

export interface RowOptions {
  color: COLOR;
}

export function convertRawRowOptionsToStanrd(
  options?: RowOptionsRaw
): RowOptions | undefined {
  if (options) {
    return {
      color: options.color as COLOR,
    };
  }
  return undefined;
}

export function textWithPadding(
  text: string,
  alignment: ALIGNMENT,
  mxColumnLen: number
): string {
  const curTextSize = wcwidth(text);

  // Calc how much padding to the left when alignment is 'center'
  const alignCenterPaddingLeft = Math.floor((mxColumnLen - curTextSize) / 2);

  switch (alignment) {
    case 'left':
      return text + ' '.repeat(mxColumnLen - curTextSize);
    case 'center':
      return (
        ' '.repeat(alignCenterPaddingLeft) +
        text +
        ' '.repeat(mxColumnLen - curTextSize - alignCenterPaddingLeft)
      );
    case 'right':
    default:
      return ' '.repeat(mxColumnLen - curTextSize) + text;
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
}

export function createColum(name: string): Column {
  return { name };
}

export function createRow(color: COLOR, text: string): Row {
  return { color, text };
}

export function findMaxLenOfColumn(column: Column, rows: Row[]): number {
  const column_name = column.name;
  let max_ln = wcwidth(`${column_name}`);

  rows.forEach((row) => {
    max_ln = Math.max(max_ln, wcwidth(`${row.text[column_name] || ''}`));
  });

  return max_ln;
}

export function renderTableHorizontalBorders(
  style: any,
  column_lengths: number[]
): string {
  const str = createTableHorizontalBorders(style, column_lengths);
  return str;
}

export function createHeaderAsRow(createRowFn: any, columns: Column[]): Row {
  const headerBolor: COLOR = 'white_bold';
  const row: Row = createRowFn(headerBolor, {});
  columns.forEach((column) => {
    row.text[column.name] = column.name;
  });
  return row;
}

export function cellText(text: string): string {
  return text === undefined || text === null ? '' : text;
}
