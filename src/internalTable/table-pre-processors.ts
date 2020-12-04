/* eslint-disable no-param-reassign */
import { Column, Row } from '../models/internal-table';
import { findMaxLenOfColumn } from '../utils/table-helpers';
import { ComputedColumn, TableInternal } from './internal-table';

function createComputedColumnsIfNecessary(table: TableInternal) {
  if (table.computedColumns.length) {
    table.computedColumns.forEach((computedColumn: ComputedColumn) => {
      table.addColumn(computedColumn.name);
      table.rows.forEach((row: Row) => {
        row.text[computedColumn.name] = computedColumn.function(row.text);
      });
    });
  }
}

function disableColumnsIfNecessary(table: TableInternal) {
  if (table.enabledColumns.length) {
    table.columns = table.columns.filter((col: Column) =>
      table.enabledColumns.includes(col.name)
    );
  }
}

function enableColumnsIfNecessary(table: TableInternal) {
  if (table.disabledColumns.length) {
    table.columns = table.columns.filter(
      (col: Column) => !table.disabledColumns.includes(col.name)
    );
  }
}

function findMaxColumnLength(table: TableInternal) {
  table.columns.forEach((column) => {
    column.max_ln = findMaxLenOfColumn(column, table.rows);
  });
}

export function preProcessColumns(table: TableInternal) {
  createComputedColumnsIfNecessary(table);
  enableColumnsIfNecessary(table);
  disableColumnsIfNecessary(table);
  findMaxColumnLength(table);
}

export function preProcessRows(table: TableInternal) {
  const newRows = table.rows
    .filter((r) => table.filterFunction(r.text))
    .sort((r1, r2) => table.sortFunction(r1.text, r2.text));
  table.rows = newRows;
}
