import { COLUMN_ALIGNMENT, COLOR } from "./table-constants";

export function textWithPadding(text, alignment, size) {
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

export function createColum(name) {
  return { name };
}

export function createRow(color, text) {
  return { color, text };
}

export function findMaxLenOfColumn(column, rows) {
  let column_name = column.name;
  let max_ln = `${column_name}`.length;
  for (let row of rows) {
    max_ln = Math.max(max_ln, `${row.text[column_name] || ""}`.length);
  }
  return max_ln;
}

export function printTableHorizontalBorders(style, column_lengths) {
  const str = createTableHorizontalBorders(style, column_lengths);
  console.log(str);
  return str;
}

export function createHeaderAsRow(createRow, columns) {
  let row = createRow(COLOR.white_bold, {});
  for (let column of columns) {
    row.text[column.name] = column.name;
  }
  return row;
}
