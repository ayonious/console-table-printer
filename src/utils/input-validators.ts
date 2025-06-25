import { ALIGNMENTS, COLORS } from './table-constants';
import { Dictionary } from '../models/common';
import { ColumnOptionsRaw, ComputedColumn } from '../models/external-table';

/**
 * Validation error class for table input validation
 */
export class TableInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TableInputError';
  }
}

/**
 * Validates a column definition
 * @param column Column definition to validate
 * @throws TableInputError if validation fails
 */
export const validateColumn = (column: ColumnOptionsRaw | string): void => {
  if (typeof column === 'string') {
    if (!column || column.trim() === '') {
      throw new TableInputError('Column name cannot be empty');
    }
    return;
  }

  if (!column) {
    throw new TableInputError('Column definition cannot be null or undefined');
  }

  if (!column.name || column.name.trim() === '') {
    throw new TableInputError('Column name cannot be empty');
  }

  if (column.alignment && !ALIGNMENTS.includes(column.alignment)) {
    throw new TableInputError(
      `Invalid alignment: "${column.alignment}". Must be one of: ${ALIGNMENTS.join(', ')}`
    );
  }

  if (column.color && !COLORS.includes(column.color)) {
    throw new TableInputError(
      `Invalid color: "${column.color}". Must be one of: ${COLORS.join(', ')}`
    );
  }

  if (
    column.maxLen !== undefined &&
    (typeof column.maxLen !== 'number' || column.maxLen < 0)
  ) {
    throw new TableInputError('maxLen must be a non-negative number');
  }

  if (
    column.minLen !== undefined &&
    (typeof column.minLen !== 'number' || column.minLen < 0)
  ) {
    throw new TableInputError('minLen must be a non-negative number');
  }

  // Check for computed column
  if ('function' in column) {
    const computedColumn = column as ComputedColumn;
    if (typeof computedColumn.function !== 'function') {
      throw new TableInputError('ComputedColumn function must be a function');
    }
  }
};

/**
 * Validates row data
 * @param rowData Row data to validate
 * @throws TableInputError if validation fails
 */
export const validateRowData = (rowData: Dictionary): void => {
  if (!rowData || typeof rowData !== 'object') {
    throw new TableInputError('Row data must be a non-null object');
  }
};

/**
 * Validates color value
 * @param color Color to validate
 * @throws TableInputError if validation fails
 */
export const validateColor = (color?: string): void => {
  if (color && !COLORS.includes(color)) {
    throw new TableInputError(
      `Invalid color: "${color}". Must be one of: ${COLORS.join(', ')}`
    );
  }
};

/**
 * Validates an array of columns
 * @param columns Array of columns to validate
 * @throws TableInputError if validation fails
 */
export const validateColumns = (columns: (ColumnOptionsRaw | string)[]): void => {
  if (!Array.isArray(columns)) {
    throw new TableInputError('Columns must be an array');
  }

  columns.forEach(validateColumn);

  // Check for duplicate column names
  const columnNames = columns.map((col) =>
    typeof col === 'string' ? col : col.name
  );
  const uniqueNames = new Set(columnNames);
  if (uniqueNames.size !== columnNames.length) {
    throw new TableInputError('Column names must be unique');
  }
};

/**
 * Validates an array of row data
 * @param rows Array of row data to validate
 * @throws TableInputError if validation fails
 */
export const validateRows = (rows: Dictionary[]): void => {
  if (!Array.isArray(rows)) {
    throw new TableInputError('Rows must be an array');
  }

  rows.forEach(validateRowData);
};
