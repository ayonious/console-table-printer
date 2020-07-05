import { TableInternal, ComputedColumn } from './internal-table';
import { findMaxLenOfColumn, Column, Row } from '../utils/table-helpers';

function createComputedColumnsIfNecessary(table: TableInternal) {
  if (table.computedColumns.length) {
    // eslint-disable-next-line no-param-reassign
    table.computedColumns.forEach((computedColumn: ComputedColumn) => {
      table.addColumn(computedColumn.name);
      table.rows.forEach((row: Row) => {
        // eslint-disable-next-line no-param-reassign
        row.text[computedColumn.name] = computedColumn.function(row.text);
      });
    });
  }
}

function disableColumnsIfNecessary(table: TableInternal) {
  if (table.enabledColumns.length) {
    // eslint-disable-next-line no-param-reassign
    table.columns = table.columns.filter((col: Column) =>
      table.enabledColumns.includes(col.name)
    );
  }
}

function enableColumnsIfNecessary(table: TableInternal) {
  if (table.disabledColumns.length) {
    // eslint-disable-next-line no-param-reassign
    table.columns = table.columns.filter(
      (col: Column) => !table.disabledColumns.includes(col.name)
    );
  }
}

function findMaxColLen(table: TableInternal) {
  table.columns.forEach((column) => {
    // eslint-disable-next-line no-param-reassign
    column.max_ln = findMaxLenOfColumn(column, table.rows);
  });
}

export function preProcessColumns(table: TableInternal) {
  createComputedColumnsIfNecessary(table);
  enableColumnsIfNecessary(table);
  disableColumnsIfNecessary(table);
  findMaxColLen(table);
}

export function preProcessRows(table: TableInternal) {
  const newrows = table.rows
    .filter((r) => table.filterFunction(r.text))
    .sort((r1, r2) => table.sortFunction(r1.text, r2.text));
  // eslint-disable-next-line no-param-reassign
  table.rows = newrows;
}
