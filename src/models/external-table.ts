/* eslint-disable  @typescript-eslint/no-wrapper-object-types */
import { ColorMap } from '../utils/colored-console-line';
import { ALIGNMENT, CharLengthDict, COLOR, Dictionary } from './common';
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
  function: (arg0: any, index: number, array: any[]) => any;
}

export type RowSortFunction = (row1: any, row2: any) => number;

export type RowFilterFunction = (row: any) => boolean;

export interface DefaultColumnOptions {
  alignment?: ALIGNMENT;
  color?: COLOR;
  title?: string;
  maxLen?: number;
  minLen?: number;
}
export interface ComplexOptions {
  style?: TableStyleDetails;
  title?: string;
  columns?: ColumnOptionsRaw[];
  rows?: Dictionary[];
  sort?: RowSortFunction;
  filter?: RowFilterFunction;
  enabledColumns?: string[];
  disabledColumns?: string[];
  computedColumns?: ComputedColumn[];
  rowSeparator?: boolean;
  shouldDisableColors?: boolean;
  colorMap?: ColorMap;
  charLength?: CharLengthDict;
  defaultColumnOptions?: DefaultColumnOptions;
}
