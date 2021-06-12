import { ALIGNMENT, COLOR } from './common';
import { TableStyleDetails } from './internal-table';

export { ALIGNMENT, COLOR };

export interface ColumnOptionsRaw {
  name: string; // unique id
  title?: string; // the value that will be printed, if not present this will be 'name'
  alignment?: ALIGNMENT;
  color?: COLOR;
  maxLen?: number;
  minLen?: number;
}

export interface ComputedColumn extends ColumnOptionsRaw {
  function: (arg0: any) => any;
}

export type RowSortFunction = (row1: any, row2: any) => number;

export type RowFilterFunction = (row: any) => Boolean;

export interface ComplexOptions {
  style?: TableStyleDetails;
  title?: string;
  columns?: ColumnOptionsRaw[];
  sort?: RowSortFunction;
  filter?: RowFilterFunction;
  enabledColumns?: string[];
  disabledColumns?: string[];
  computedColumns?: ComputedColumn[];
  rowSeparator?: boolean;
}
