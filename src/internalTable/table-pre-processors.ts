import { Row } from '../models/common';
import { ComputedColumn } from '../models/external-table';
import { Column } from '../models/internal-table';
import { findLenOfColumn } from '../utils/table-helpers';
import TableInternal from './internal-table';

// All these functions are ran when renderTable/printTable is called
const createComputedColumnsIfNecessary = <T>(table: TableInternal<T>) => {
  if (table.computedColumns.length) {
    table.computedColumns.forEach((computedColumn: ComputedColumn<T>) => {
      // This can happen if renderTable/printTable is called multiple times
      const isColumnAlreadyExists = table.columns.some(
        (col: Column) => col.name === computedColumn.name
      );
      if (isColumnAlreadyExists) {
        return;
      }
      table.addColumn({
        ...computedColumn,
        ...table.defaultColumnOptions,
      });
      table.rows.forEach((row: Row, index: number, rowsArray: Row[]) => {
        const arrayRowText = rowsArray.map(
          (elemInRowsArray) => elemInRowsArray.text
        );
        row.text[computedColumn.name] = computedColumn.function(
          row.text as T,
          index,
          arrayRowText as T[]
        );
      });
    });
  }
};

const disableColumnsIfNecessary = <T>(table: TableInternal<T>) => {
  if (table.enabledColumns.length) {
    table.columns = table.columns.filter((col: Column) =>
      table.enabledColumns.includes(col.name)
    );
  }
};

const enableColumnsIfNecessary = <T>(table: TableInternal<T>) => {
  if (table.disabledColumns.length) {
    table.columns = table.columns.filter(
      (col: Column) => !table.disabledColumns.includes(col.name)
    );
  }
};

const findColumnWidth = <T>(table: TableInternal<T>) => {
  table.columns.forEach((column) => {
    column.length = findLenOfColumn(column, table.rows, table.charLength);
  });
};

export const preProcessColumns = <T>(table: TableInternal<T>) => {
  createComputedColumnsIfNecessary(table);
  enableColumnsIfNecessary(table);
  disableColumnsIfNecessary(table);
  findColumnWidth(table);
};

export const preProcessRows = <T>(table: TableInternal<T>) => {
  const newRows = table.rows
    .filter((r) => table.filterFunction(r.text as T))
    .sort((r1, r2) => table.sortFunction(r1.text as T, r2.text as T));
  table.rows = newRows;
};
