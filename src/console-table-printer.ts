import { TableInternal, ComplexOptions } from "./internal-table";
import { RowOptionsRaw, convertRawRowOptionsToStanrd } from "./table-helpers";

export class Table {
  table: TableInternal;

  constructor(options?: ComplexOptions | string[]) {
    this.table = new TableInternal(options);
  }

  addColumn(column: string) {
    this.table.addColumn(column);
  }

  addColumns(columns: string[]) {
    this.table.addColumns(columns);
  }

  addRow(text: any, rowOptions?: RowOptionsRaw) {
    this.table.addRow(text, convertRawRowOptionsToStanrd(rowOptions));
  }

  addRows(toBeInsertedRows: any) {
    this.table.addRows(toBeInsertedRows);
  }

  printTable() {
    return this.table.printTable();
  }
}
