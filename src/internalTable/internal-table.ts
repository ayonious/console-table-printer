import { Column, Dictionary, Row } from '../models/common';
import {
  ComplexOptions,
  RowFilterFunction,
  RowSortFunction,
} from '../models/external-table';
import { TABLE_STYLE_DETAILS } from '../models/internal-table';
import {
  DEFAULT_TABLE_STYLE,
  defaultRowAlignment,
  defaultRowFontColor,
} from '../utils/table-constants';
import { createColum, createRow, RowOptions } from '../utils/table-helpers';
import { rawColumnToInternalColumn } from './input-converter';
import { renderTable } from './internal-table-printer';

const defaultRowSortFunc = () => 0;

const defaultRowFilterFunc = () => true;

class TableInternal {
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
    this.columns = options.columns?.map(rawColumnToInternalColumn) || [];
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

  addColumn(textOrObj: string | Column) {
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

export default TableInternal;
