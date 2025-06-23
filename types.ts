// Core alignment and color types
export type ALIGNMENT = 'left' | 'right' | 'center';

export type COLOR = 
  | 'red' 
  | 'green' 
  | 'yellow' 
  | 'blue' 
  | 'magenta' 
  | 'cyan' 
  | 'white' 
  | 'white_bold' 
  | 'reset';

// Basic data structures
export interface Dictionary {
  [key: string]: any;
}

export interface CharLengthDict {
  [key: string]: number;
}

export interface Row {
  color: COLOR;
  separator: boolean;
  text: Dictionary;
}

// Column and table configuration
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

// Internal table structures
export interface Column {
  name: string;
  title: string;
  alignment?: ALIGNMENT;
  color?: COLOR;
  length?: number;
  minLen?: number;
  maxLen?: number;
}

type TableLineDetailsKeys = 'left' | 'right' | 'mid' | 'other';

export type TableLineDetails = {
  [key in TableLineDetailsKeys]: string;
};

export type TableStyleDetails = {
  headerTop: TableLineDetails;
  headerBottom: TableLineDetails;
  tableBottom: TableLineDetails;
  vertical: string;
  rowSeparator?: TableLineDetails;
};

// Row options and styling
export interface RowOptionsRaw {
  color?: string;
  separator?: boolean;
}

export interface RowOptions {
  color: COLOR;
  separator: boolean;
}

// Color mapping
export type ColorMap = {
  [key in COLOR]?: string;
};

// Convenience type aliases
export type TableOptions = ComplexOptions;
export type ColumnOption = ColumnOptionsRaw;
export type RowOption = RowOptionsRaw; 