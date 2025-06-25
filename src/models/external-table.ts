import { ColorMap } from '../utils/colored-console-line';
import { ALIGNMENT, CharLengthDict, COLOR, Dictionary } from './common';
import { TableStyleDetails } from './internal-table';

export { ALIGNMENT, COLOR };

/**
 * Configuration options for a table column
 */
export interface ColumnOptionsRaw {
  /** Unique identifier for the column */
  name: string;
  /** Display name for the column header. If not provided, uses the name property */
  title?: string;
  /** Text alignment within the column: 'left', 'center', or 'right' */
  alignment?: ALIGNMENT;
  /** Text color for the column content */
  color?: COLOR;
  /** Maximum length of text in the column. Longer text will be wrapped to multiple lines */
  maxLen?: number;
  /** Minimum length of text in the column. Shorter text will be padded with spaces */
  minLen?: number;
}

/**
 * Configuration for a computed column that generates values dynamically
 */
export interface ComputedColumn<T = Dictionary> extends ColumnOptionsRaw {
  /** Function that computes the column value for each row
   * @param row - The current row data object
   * @param index - The index of the current row in the data array
   * @param array - The complete array of row data
   * @returns The computed value for this column
   */
  function: (row: T, index: number, array: T[]) => string | number;
}

/**
 * Function type for sorting table rows
 * @param row1 - First row to compare
 * @param row2 - Second row to compare
 * @returns Negative number if row1 should come before row2, positive if row2 should come before row1, 0 if equal
 */
export type RowSortFunction<T = Dictionary> = (row1: T, row2: T) => number;

/**
 * Function type for filtering table rows
 * @param row - The row data to evaluate
 * @returns True if the row should be included, false if it should be filtered out
 */
export type RowFilterFunction<T = Dictionary> = (row: T) => boolean;

/**
 * Default styling options applied to all columns unless overridden
 */
export interface DefaultColumnOptions {
  /** Default text alignment for all columns */
  alignment?: ALIGNMENT;
  /** Default text color for all columns */
  color?: COLOR;
  /** Default title prefix for all columns */
  title?: string;
  /** Default maximum length for all columns */
  maxLen?: number;
  /** Default minimum length for all columns */
  minLen?: number;
}

/**
 * Complete configuration options for table creation and styling
 */
export interface ComplexOptions<T = Dictionary> {
  /** Table styling configuration including borders and colors */
  style?: TableStyleDetails;
  /** Title displayed at the top of the table */
  title?: string;
  /** Array of column configurations */
  columns?: ColumnOptionsRaw[];
  /** Initial data rows for the table */
  rows?: T[];
  /** Function to sort rows before display */
  sort?: RowSortFunction<T>;
  /** Function to filter rows before display */
  filter?: RowFilterFunction<T>;
  /** Array of column names to include (all others will be hidden) */
  enabledColumns?: string[];
  /** Array of column names to exclude (these will always be hidden) */
  disabledColumns?: string[];
  /** Array of computed columns that generate values dynamically */
  computedColumns?: ComputedColumn<T>[];
  /** Whether to add separator lines between rows */
  rowSeparator?: boolean;
  /** Whether to disable color output (useful for non-color terminals) */
  shouldDisableColors?: boolean;
  /** Custom color mapping for special characters or values */
  colorMap?: ColorMap;
  /** Custom character length mapping for special characters (e.g., emojis) */
  charLength?: CharLengthDict;
  /** Default options applied to all columns unless overridden */
  defaultColumnOptions?: DefaultColumnOptions;
}
