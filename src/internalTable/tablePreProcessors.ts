import {
  TableInternal,
  RowSortFunction,
  RowFilterFunction,
} from './internal-table';
import { findMaxLenOfColumn, Row } from '../utils/table-helpers';

export function preProcessColumns(table: TableInternal) {
  table.columns.forEach((column) => {
    // eslint-disable-next-line no-param-reassign
    column.max_ln = findMaxLenOfColumn(column, table.rows);
  });
}

export function preProcessRows(
  rows: Row[],
  filterFunc: RowFilterFunction,
  sortFunc: RowSortFunction
): Row[] {
  return rows
    .filter((r) => filterFunc(r.text))
    .sort((r1, r2) => sortFunc(r1.text, r2.text));
}
