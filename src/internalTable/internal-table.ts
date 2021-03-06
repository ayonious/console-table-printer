import { Dictionary } from '../models/common';
import { Column, Row } from '../models/internal-table';
import {
  ALIGNMENT,
  COLOR,
  DEFAULT_TABLE_STYLE,
  defaultRowAlignment,
  defaultRowFontColor,
  TABLE_STYLE_DETAILS,
} from '../utils/table-constants';
import { createColum, createRow, RowOptions } from '../utils/table-helpers';
import { renderTable } from './internal-table-printer';

interface ColumnOptionsRaw {
  name: string; // unique id
  title?: string; // the value that will be printed, if not present this will be 'name'
  alignment?: ALIGNMENT;
  color?: COLOR;
  maxLen?: number;
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
      title: column,
      alignment: defaultRowAlignment,
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
        title: column.title || column.name,
        ...objIfExists('color', column.color as COLOR),
        ...objIfExists('maxLen', column.maxLen),
        alignment: column.alignment || defaultRowAlignment,
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

  createColumnFromRow(text: Dictionary) {
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

  addRow(text: Dictionary, options?: RowOptions) {
    this.createColumnFromRow(text);
    this.rows.push(createRow(options?.color || defaultRowFontColor, text));
  }

  addRows(toBeInsertedRows: Dictionary[], options?: RowOptions) {
    toBeInsertedRows.forEach((toBeInsertedRow) => {
      this.addRow(toBeInsertedRow, options);
    });
  }

  renderTable() {
    return renderTable(this);
  }
}
