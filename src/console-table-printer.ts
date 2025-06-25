import TableInternal from './internalTable/internal-table';
import { Dictionary } from './models/common';
import { ColumnOptionsRaw, ComplexOptions } from './models/external-table';
import {
  convertRawRowOptionsToStandard,
  RowOptionsRaw,
} from './utils/table-helpers';

export default class Table<T = Dictionary> {
  private table: TableInternal;

  constructor(options?: ComplexOptions<T> | string[]) {
    this.table = new TableInternal(options);
  }

  /**
   * Add a single column to the table
   * @param column - Column name or configuration object
   * @returns The table instance for chaining
   */
  addColumn(column: string | ColumnOptionsRaw): this {
    this.table.addColumn(column);
    return this;
  }

  /**
   * Add multiple columns to the table
   * @param columns - Array of column names or configuration objects
   * @returns The table instance for chaining
   */
  addColumns(columns: string[] | ColumnOptionsRaw[]): this {
    this.table.addColumns(columns);
    return this;
  }

  /**
   * Add a single row to the table
   * @param text - Row data object
   * @param rowOptions - Optional row styling options
   * @returns The table instance for chaining
   */
  addRow(text: T, rowOptions?: RowOptionsRaw): this {
    this.table.addRow(text, convertRawRowOptionsToStandard(rowOptions));
    return this;
  }

  /**
   * Add multiple rows to the table
   * @param rows - Array of row data objects
   * @param rowOptions - Optional row styling options applied to all rows
   * @returns The table instance for chaining
   */
  addRows(rows: T[], rowOptions?: RowOptionsRaw): this {
    this.table.addRows(
      rows,
      convertRawRowOptionsToStandard(rowOptions)
    );
    return this;
  }

  /**
   * Print the table to the console
   */
  printTable(): void {
    const tableRendered = this.table.renderTable();
    console.log(tableRendered);
  }

  /**
   * Render the table as a string without printing
   * @returns The rendered table string
   */
  render(): string {
    return this.table.renderTable();
  }
}
