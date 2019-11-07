import {
  TABLE_STYLE,
  TABLE_BORDER_STYLES,
  COLUMN_ALIGNMENT,
  COLOR,
  TABLE_STYLE_DETAILS
} from "./table-constants";
import {
  createColum,
  createRow,
  Column,
  Row,
  RowOptions
} from "./table-helpers";
import { printTable } from "./internal-table-printer";

interface ColumnOptionsRaw {
  name: string;
  alignment? : string;
}

export interface ComplexOptions {
  style?: string;
  columns?: ColumnOptionsRaw[];
}

export class TableInternal {
  tableStyle: TABLE_STYLE_DETAILS;
  columns: Column[];
  rows: Row[];
  style: TABLE_BORDER_STYLES;
  styleDetails: TABLE_STYLE_DETAILS;

  initSimple(columns: string[]) {
    this.columns = columns.map(column => ({
      name: column,
      alignment: COLUMN_ALIGNMENT.right
    })) || [];
  }

  initDetailed(options: ComplexOptions) {
    this.tableStyle =
      (options && options.style && (<any>TABLE_STYLE)[options.style]) || TABLE_STYLE.thinBorder;
    this.columns =
      (options.columns &&
        options.columns.map(column => ({
          name: column.name,
          alignment: (<any>COLUMN_ALIGNMENT)[column.alignment || COLUMN_ALIGNMENT.right]
        }))) ||
      [];
  }

  constructor(options?: ComplexOptions | string[]) {
    // default construction
    this.rows = [];
    this.tableStyle = TABLE_STYLE.thinBorder;
    this.columns = [];
    this.tableStyle = TABLE_STYLE.thinBorder;

    if (options instanceof Array) {
      this.initSimple(options);
    } else if (typeof options === "object") {
      this.initDetailed(options);
    }
  }

  createColumnFromRow(text: any) {
    const colNames = this.columns.map(col => col.name);
    for (let key in text) {
      if (!colNames.includes(key)) {
        this.columns.push(createColum(key));
      }
    }
  }

  addColumn(text: string) {
    this.columns.push(createColum(text));
  }

  addColumns(toBeInsertedColumns: string[]) {
    for (let toBeInsertedColumn of toBeInsertedColumns) {
      this.addColumn(toBeInsertedColumn);
    }
  }

  addRow(text: any, options?: RowOptions) {
    this.createColumnFromRow(text);
    this.rows.push(createRow((options && options.color) || COLOR.white, text));
  }

  addRows(toBeInsertedRows: any) {
    for (let toBeInsertedRow of toBeInsertedRows) {
      this.addRow(toBeInsertedRow, undefined);
    }
  }

  printTable() {
    return printTable(this);
  }
}
