import { COLUMN_ALIGNMENT, COLOR } from "./table-constants";

export interface Column {
  name: string;
  alignment?: COLUMN_ALIGNMENT;
  max_ln?: number;
}

export interface Row {
  color: COLOR;
  text: any;
}

export function convertRawRowOptionsToStanrd(
  options?: RowOptionsRaw
): RowOptions | undefined {
  if (options && options.color) {
    return {
      color: COLOR[options.color]
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
  alignment: COLUMN_ALIGNMENT,
  size: number
): string {
  switch (alignment) {
    case COLUMN_ALIGNMENT.left:
      return text.padEnd(size);
    case COLUMN_ALIGNMENT.right:
      return text.padStart(size);
    default:
      return text.padStart(size);
  }
}

export function createTableHorizontalBorders(
  { left, mid, right, other },
  column_lengths
) {
  let ret = left;
  for (let len of column_lengths) {
    ret += other.repeat(len + 2);
    ret += mid;
  }
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
  let column_name = column.name;
  let max_ln = `${column_name}`.length;
  for (let row of rows) {
    max_ln = Math.max(max_ln, `${row.text[column_name] || ""}`.length);
  }
  return max_ln;
}

export function printTableHorizontalBorders(style, column_lengths): string {
  const str = createTableHorizontalBorders(style, column_lengths);
  console.log(str);
  return str;
}

export function createHeaderAsRow(createRow, columns: Column[]): Row {
  let row: Row = createRow(COLOR.white_bold, {});
  for (let column of columns) {
    row.text[column.name] = column.name;
  }
  return row;
}
