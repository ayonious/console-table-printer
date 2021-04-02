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

export const alignments = ['right', 'left', 'center'];

export const colors = [
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

export const defaultRowFontColor: COLOR = 'white';
export const defaultHeaderFontColor: COLOR = 'white_bold';

export const defaultRowAlignment: ALIGNMENT = 'right';
export const defaultHeaderAlignment: ALIGNMENT = 'center';
