import { ALIGNMENT, COLOR } from '../models/common';
import { TABLE_STYLE_DETAILS } from '../models/internal-table';

export const DEFAULT_COLUMN_LEN = 20;

export const DEFAULT_TABLE_STYLE: TABLE_STYLE_DETAILS = {
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
};

export const ALIGNMENTS = ['right', 'left', 'center'];

export const COLORS = [
  'red',
  'green',
  'yellow',
  'white',
  'blue',
  'magenta',
  'cyan',
  'crimson',
  'white_bold',
  'reset',
];

export const DEFAULT_ROW_FONT_COLOR: COLOR = 'white';
export const DEFAULT_HEADER_FONT_COLOR: COLOR = 'white_bold';

export const DEFAULT_ROW_ALIGNMENT: ALIGNMENT = 'right';
export const DEFAULT_HEADER_ALIGNMENT: ALIGNMENT = 'center';
