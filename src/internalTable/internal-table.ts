import { printTable } from './internal-table-printer';
import {
  COLOR,
  ALIGNMENT,
  DEFAULT_TABLE_STYLE,
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

export interface ComputedColumn extends ColumnOptionsRaw {
  function: (arg0: any) => any;
}

export type RowSortFunction = (row1: any, row2: any) => number;
const defaultRowSortFunc = () => 0;

export type RowFilterFunction = (row: any) => Boolean;
const defaultRowFilterFunc = () => true;

export interface ComplexOptions {
  style?: TABLE_STYLE_DETAILS;
  title?: string;
  columns?: ColumnOptionsRaw[];
  sort?: RowSortFunction;
  filter?: RowFilterFunction;
  enabledColumns?: string[];
  disabledColumns?: string[];
  computedColumns?: ComputedColumn[];
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
  title?: string;

  tableStyle: TABLE_STYLE_DETAILS;

  columns: Column[];

  rows: Row[];

  filterFunction: RowFilterFunction;

  sortFunction: RowSortFunction;

  enabledColumns: string[];

  disabledColumns: string[];

  computedColumns: any[];

  initSimple(columns: string[]) {
    this.columns = columns.map((column) => ({
      name: column,
      alignment: ALIGNMENT.right,
    }));
  }

  initDetailed(options: ComplexOptions) {
    this.title = options.title || undefined;
    this.tableStyle = options?.style || DEFAULT_TABLE_STYLE;
    this.sortFunction = options?.sort || defaultRowSortFunc;
    this.filterFunction = options?.filter || defaultRowFilterFunc;
    this.enabledColumns = options?.enabledColumns || [];
    this.disabledColumns = options?.disabledColumns || [];
    this.computedColumns = options?.computedColumns || [];
    this.columns =
      options.columns?.map((column: ColumnOptionsRaw) => ({
        name: column.name,
        ...objIfExists('color', column.color && (<any>COLOR)[column.color]),
        alignment: (<any>ALIGNMENT)[column.alignment || ALIGNMENT.right],
      })) || [];
  }

  constructor(options?: ComplexOptions | string[]) {
    // default construction
    this.rows = [];
    this.columns = [];
    this.title = undefined;
    this.tableStyle = DEFAULT_TABLE_STYLE;
    this.filterFunction = defaultRowFilterFunc;
    this.sortFunction = defaultRowSortFunc;
    this.enabledColumns = [];
    this.disabledColumns = [];
    this.computedColumns = [];

    if (options instanceof Array) {
      this.initSimple(options);
    } else if (typeof options === 'object') {
      this.initDetailed(options);
    }
  }

  createColumnFromRow(text: any) {
    const colNames = this.columns.map((col) => col.name);
    Object.keys(text).forEach((key) => {
      if (!colNames.includes(key)) {
        this.columns.push(createColum(key));
      }
    });
  }

  addColumn(text: string) {
    this.columns.push(createColum(text));
  }

  addColumns(toBeInsertedColumns: string[]) {
    toBeInsertedColumns.forEach((toBeInsertedColumn) => {
      this.addColumn(toBeInsertedColumn);
    });
  }

  addRow(text: any, options?: RowOptions) {
    this.createColumnFromRow(text);
    this.rows.push(createRow(options?.color || COLOR.white, text));
  }

  addRows(toBeInsertedRows: any[]) {
    toBeInsertedRows.forEach((toBeInsertedRow) => {
      this.addRow(toBeInsertedRow, undefined);
    });
  }

  printTable() {
    return printTable(this);
  }
}
