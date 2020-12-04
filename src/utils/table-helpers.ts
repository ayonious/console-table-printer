import { ALIGNMENT, COLOR } from './table-constants';
import stripAnsiColorCode from './ansi-color-stripper';

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

export function convertRawRowOptionsToStandard(
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
  const curTextSize = stripAnsiColorCode(text).length;
  // alignments for center padding case
  const leftPadding = Math.floor((mxColumnLen - curTextSize) / 2);
  const rightPadding = mxColumnLen - leftPadding - curTextSize;
  switch (alignment) {
    case 'left':
      return text + ' '.repeat(mxColumnLen - curTextSize);
    case 'center':
      return ' '.repeat(leftPadding) + text + ' '.repeat(rightPadding);
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
  let max_ln = stripAnsiColorCode(`${column_name}`).length;

  rows.forEach((row) => {
    max_ln = Math.max(
      max_ln,
      stripAnsiColorCode(`${row.text[column_name] || ''}`).length
    );
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
  const headerColor: COLOR = 'white_bold';
  const row: Row = createRowFn(headerColor, {});
  columns.forEach((column) => {
    row.text[column.name] = column.name;
  });
  return row;
}

export function cellText(text: string): string {
  return text === undefined || text === null ? '' : text;
}
