import { ALIGNMENT, COLOR } from '../models/common';
import { TableStyleDetails } from '../models/internal-table';

/** Default column width when not specified */
export const DEFAULT_COLUMN_LEN = 20;

/** Default setting for row separators */
export const DEFAULT_ROW_SEPARATOR = false;

/** Default table border style using Unicode box drawing characters */
export const DEFAULT_TABLE_STYLE: TableStyleDetails = {
  /*
      Default Style
      ┌────────────┬─────┬──────┐
      │ foo        │ bar │ baz  │
      │ frobnicate │ bar │ quuz │
      └────────────┴─────┴──────┘
      */
  headerTop: {
    left: '┌',
    mid: '┬',
    right: '┐',
    other: '─',
  },
  headerBottom: {
    left: '├',
    mid: '┼',
    right: '┤',
    other: '─',
  },
  tableBottom: {
    left: '└',
    mid: '┴',
    right: '┘',
    other: '─',
  },
  vertical: '│',
  rowSeparator: {
    left: '├',
    mid: '┼',
    right: '┤',
    other: '─',
  },
};

/** Alternative table style using ASCII characters */
export const ASCII_TABLE_STYLE: TableStyleDetails = {
  headerTop: {
    left: '+',
    mid: '+',
    right: '+',
    other: '-',
  },
  headerBottom: {
    left: '+',
    mid: '+',
    right: '+',
    other: '-',
  },
  tableBottom: {
    left: '+',
    mid: '+',
    right: '+',
    other: '-',
  },
  vertical: '|',
  rowSeparator: {
    left: '+',
    mid: '+',
    right: '+',
    other: '-',
  },
};

/** Available text alignment options */
export const ALIGNMENTS: ALIGNMENT[] = ['right', 'left', 'center'];

/** Available color options */
export const COLORS: COLOR[] = [
  'red',
  'green',
  'yellow',
  'white',
  'blue',
  'magenta',
  'cyan',
  'white_bold',
  'reset',
];

/** Default color for row text */
export const DEFAULT_ROW_FONT_COLOR: COLOR = 'white';

/** Default color for header text */
export const DEFAULT_HEADER_FONT_COLOR: COLOR = 'white_bold';

/** Default alignment for row text */
export const DEFAULT_ROW_ALIGNMENT: ALIGNMENT = 'right';

/** Default alignment for header text */
export const DEFAULT_HEADER_ALIGNMENT: ALIGNMENT = 'center';

/** Maximum recommended table width to prevent console overflow */
export const MAX_TABLE_WIDTH = 200;

/** Minimum column width to ensure readability */
export const MIN_COLUMN_WIDTH = 3;

/** Default spacing between columns */
export const COLUMN_SPACING = 2;
