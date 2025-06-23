/**
 * Console Table Printer - TypeScript Declarations
 * 
 * This file contains manual TypeScript declarations for the console-table-printer library.
 * These types are manually maintained instead of auto-generated for better control and clarity.
 */

/**
 * Text alignment options for table columns
 */
export type ALIGNMENT = 'left' | 'center' | 'right';

/**
 * Available colors for table styling
 */
export type COLOR = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray' | 'grey';

/**
 * Prints a table to the console with the given data and options
 * @param data - Array of objects representing table rows
 * @param options - Optional configuration for table styling and behavior
 */
declare function printTable(
  data: Record<string, any>[],
  options?: any
): void;

/**
 * Renders a table as a string with the given data and options
 * @param data - Array of objects representing table rows
 * @param options - Optional configuration for table styling and behavior
 * @returns Formatted table string
 */
declare function renderTable(
  data: Record<string, any>[],
  options?: any
): string;

/**
 * Table class for building and manipulating tables
 */
declare class Table {
  /**
   * Creates a new Table instance
   * @param options - Optional configuration or array of column names
   */
  constructor(options?: any);

  /**
   * Adds a single column to the table
   * @param column - Column name or column configuration object
   * @returns The table instance for chaining
   */
  addColumn(column: string | any): Table;

  /**
   * Adds multiple columns to the table
   * @param columns - Array of column names or column configuration objects
   * @returns The table instance for chaining
   */
  addColumns(columns: string[] | any[]): Table;

  /**
   * Adds a single row to the table
   * @param text - Object representing the row data
   * @param rowOptions - Optional styling options for the row
   * @returns The table instance for chaining
   */
  addRow(text: Record<string, any>, rowOptions?: any): Table;

  /**
   * Adds multiple rows to the table
   * @param toBeInsertedRows - Array of objects representing row data
   * @param rowOptions - Optional styling options for the rows
   * @returns The table instance for chaining
   */
  addRows(toBeInsertedRows: any, rowOptions?: any): Table;

  /**
   * Prints the table to the console
   */
  printTable(): void;

  /**
   * Renders the table as a formatted string
   * @returns Formatted table string
   */
  render(): string;
}

// Export everything
export { printTable, renderTable, Table }; 