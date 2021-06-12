import { Dictionary, Row } from '../models/common';
import {
  ComplexOptions,
  ComputedColumn,
  RowFilterFunction,
  RowSortFunction,
} from '../models/external-table';
import { Column, TableStyleDetails } from '../models/internal-table';
import {
  DEFAULT_TABLE_STYLE,
  DEFAULT_ROW_ALIGNMENT,
  DEFAULT_ROW_FONT_COLOR,
  DEFAULT_ROW_SEPARATOR
} from '../utils/table-constants';
import {
  createColumFromComputedColumn,
  createColumFromOnlyName,
  createRow,
  RowOptions,
} from '../utils/table-helpers';
import { rawColumnToInternalColumn } from './input-converter';
import { renderTable } from './internal-table-printer';

const DEFAULT_ROW_SORT_FUNC = () => 0;

const DEFAULT_ROW_FILTER_FUNC = () => true;

class TableInternal {
  title?: string;

  tableStyle: TableStyleDetails;

  columns: Column[];

  rows: Row[];

  filterFunction: RowFilterFunction;

  sortFunction: RowSortFunction;

  enabledColumns: string[];

  disabledColumns: string[];

  computedColumns: any[];

  rowSeparator: boolean;

  initSimple(columns: string[]) {
    this.columns = columns.map((column) => ({
      name: column,
      title: column,
      alignment: DEFAULT_ROW_ALIGNMENT,
    }));
  }

  initDetailed(options: ComplexOptions) {
    this.title = options?.title || this.title;
    this.tableStyle = options?.style || this.tableStyle;
    this.sortFunction = options?.sort || this.sortFunction;
    this.filterFunction = options?.filter || this.filterFunction;
    this.enabledColumns = options?.enabledColumns || this.enabledColumns;
    this.disabledColumns = options?.disabledColumns || this.disabledColumns;
    this.computedColumns = options?.computedColumns || this.computedColumns;
    this.columns = options?.columns?.map(rawColumnToInternalColumn) || this.columns;
    this.rowSeparator = options?.rowSeparator || this.rowSeparator;
  }

  constructor(options?: ComplexOptions | string[]) {
    // default construction
    this.rows = [];
    this.columns = [];
    this.title = undefined;
    this.tableStyle = DEFAULT_TABLE_STYLE;
    this.filterFunction = DEFAULT_ROW_FILTER_FUNC;
    this.sortFunction = DEFAULT_ROW_SORT_FUNC;
    this.enabledColumns = [];
    this.disabledColumns = [];
    this.computedColumns = [];
    this.rowSeparator = DEFAULT_ROW_SEPARATOR;

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
        this.columns.push(createColumFromOnlyName(key));
      }
    });
  }

  addColumn(textOrObj: string | ComputedColumn) {
    if (typeof textOrObj === 'string') {
      this.columns.push(createColumFromOnlyName(textOrObj));
    } else {
      this.columns.push(createColumFromComputedColumn(textOrObj));
    }
  }

  addColumns(toBeInsertedColumns: string[]) {
    toBeInsertedColumns.forEach((toBeInsertedColumn) => {
      this.addColumn(toBeInsertedColumn);
    });
  }

  addRow(text: Dictionary, options?: RowOptions) {
    this.createColumnFromRow(text);
    this.rows.push(
      createRow(
        options?.color || DEFAULT_ROW_FONT_COLOR,
        text,
        options?.separator
      )
    );
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
