import { printTable } from './internal-table-printer';
import {
  COLOR,
  COLUMN_ALIGNMENT,
  TABLE_BORDER_STYLES,
  TABLE_STYLE,
  TABLE_STYLE_DETAILS,
} from '../utils/table-constants';
import {
  Column,
  createColum,
  createRow,
  Row,
  RowOptions,
} from '../utils/table-helpers';

interface ColumnOptionsRaw {
  name: string;
  alignment?: string;
  color?: string;
}

export type RowSortFunction = (row1: any, row2: any) => number;
const defaultRowSortFunc = () => 0;

export type RowFilterFunction = (row: any) => Boolean;
const defaultRowFilterFunc = () => true;

export interface ComplexOptions {
  style?: string;
  columns?: ColumnOptionsRaw[];
  sort_order?: RowSortFunction;
  filter?: RowFilterFunction;
}

function objIfExists(key: string, val: any) {
  if (!val) {
    return {};
  }

  return {
    [key]: val,
  };
}

export class TableInternal {
  tableStyle: TABLE_STYLE_DETAILS;
  columns: Column[];
  rows: Row[];
  style: TABLE_BORDER_STYLES;
  filterFunction: RowFilterFunction;
  sortFunction: RowSortFunction;

  initSimple(columns: string[]) {
    this.columns = columns.map((column) => ({
      name: column,
      alignment: COLUMN_ALIGNMENT.right,
    }));
  }

  initDetailed(options: ComplexOptions) {
    this.tableStyle =
      (options?.style && (<any>TABLE_STYLE)[options.style]) ||
      TABLE_STYLE.thinBorder;
    this.sortFunction = options?.sort_order || defaultRowSortFunc;
    this.filterFunction = options?.filter || defaultRowFilterFunc;
    this.columns =
      options.columns?.map((column) => ({
        name: column.name,
        ...objIfExists('color', column.color && (<any>COLOR)[column.color]),
        alignment: (<any>COLUMN_ALIGNMENT)[
          column.alignment || COLUMN_ALIGNMENT.right
        ],
      })) || [];
  }

  constructor(options?: ComplexOptions | string[]) {
    // default construction
    this.rows = [];
    this.columns = [];
    this.tableStyle = TABLE_STYLE.thinBorder;
    this.style = TABLE_BORDER_STYLES.thinBorder;
    this.filterFunction = defaultRowFilterFunc;
    this.sortFunction = defaultRowSortFunc;

    if (options instanceof Array) {
      this.initSimple(options);
    } else if (typeof options === 'object') {
      this.initDetailed(options);
    }
  }

  createColumnFromRow(text: any) {
    const colNames = this.columns.map((col) => col.name);
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
    this.rows.push(createRow(options?.color || COLOR.white, text));
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
