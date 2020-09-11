import { ComplexOptions, TableInternal } from './internalTable/internal-table';
import {
  convertRawRowOptionsToStanrd,
  RowOptionsRaw,
} from './utils/table-helpers';

export default class Table {
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

  addRows(toBeInsertedRows: any, rowOptions?: RowOptionsRaw) {
    this.table.addRows(
      toBeInsertedRows,
      convertRawRowOptionsToStanrd(rowOptions)
    );
  }

  printTable() {
    const tableRendered = this.table.renderTable();
    console.log(tableRendered);
  }

  render() {
    return this.table.renderTable();
  }
}
