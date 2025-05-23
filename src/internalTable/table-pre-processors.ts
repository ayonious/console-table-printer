/* eslint-disable no-param-reassign */
import { Row } from '../models/common';
import { ComputedColumn } from '../models/external-table';
import { Column } from '../models/internal-table';
import { findLenOfColumn } from '../utils/table-helpers';
import TableInternal from './internal-table';

const createComputedColumnsIfNecessary = (table: TableInternal) => {
  if (table.computedColumns.length) {
    table.computedColumns.forEach((computedColumn: ComputedColumn) => {
      table.addColumn(computedColumn);
      table.rows.forEach((row: Row, index: number, array: Row[]) => {
        const rowValues = array.map(() => row.text);
        row.text[computedColumn.name] = computedColumn.function(row.text, index, rowValues);
      });
    });
  }
};

const disableColumnsIfNecessary = (table: TableInternal) => {
  if (table.enabledColumns.length) {
    table.columns = table.columns.filter((col: Column) =>
      table.enabledColumns.includes(col.name)
    );
  }
};

const enableColumnsIfNecessary = (table: TableInternal) => {
  if (table.disabledColumns.length) {
    table.columns = table.columns.filter(
      (col: Column) => !table.disabledColumns.includes(col.name)
    );
  }
};

const findColumnWidth = (table: TableInternal) => {
  table.columns.forEach((column) => {
    column.length = findLenOfColumn(column, table.rows, table.charLength);
  });
};

export const preProcessColumns = (table: TableInternal) => {
  createComputedColumnsIfNecessary(table);
  enableColumnsIfNecessary(table);
  disableColumnsIfNecessary(table);
  findColumnWidth(table);
};

export const preProcessRows = (table: TableInternal) => {
  const newRows = table.rows
    .filter((r) => table.filterFunction(r.text))
    .sort((r1, r2) => table.sortFunction(r1.text, r2.text));
  table.rows = newRows;
};
