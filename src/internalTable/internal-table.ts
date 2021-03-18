import { Dictionary, Column, Row, COLOR } from '../models/common';
import { TABLE_STYLE_DETAILS } from '../models/internal-table';
import {
  DEFAULT_TABLE_STYLE,
  defaultRowAlignment,
  defaultRowFontColor,
} from '../utils/table-constants';
import { createColum, createRow, RowOptions } from '../utils/table-helpers';
import { objIfExists } from './input-converter';
import { renderTable } from './internal-table-printer';

export interface ComputedColumn extends ColumnOptionsRaw {
  function(arg0: any): void;
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

  addColumn(textOrObj: string | ColumnOptionsRaw) {
    if (typeof textOrObj === 'string') {
      this.columns.push(createColum(textOrObj));
    } else {
      this.columns.push(textOrObj);
    }
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
