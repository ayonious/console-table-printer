import { TableInternal } from './internal-table';
import { findMaxLenOfColumn, Column } from '../utils/table-helpers';

export function preProcessColumns(table: TableInternal) {
  if (table.enabledColumns.length) {
    // eslint-disable-next-line no-param-reassign
    table.columns = table.columns.filter((col: Column) =>
      table.enabledColumns.includes(col.name)
    );
  }

  if (table.disabledColumns.length) {
    // eslint-disable-next-line no-param-reassign
    table.columns = table.columns.filter(
      (col: Column) => !table.disabledColumns.includes(col.name)
    );
  }

  table.columns.forEach((column) => {
    // eslint-disable-next-line no-param-reassign
    column.max_ln = findMaxLenOfColumn(column, table.rows);
  });
}

export function preProcessRows(table: TableInternal) {
  const newrows = table.rows
    .filter((r) => table.filterFunction(r.text))
    .sort((r1, r2) => table.sortFunction(r1.text, r2.text));
  // eslint-disable-next-line no-param-reassign
  table.rows = newrows;
}
