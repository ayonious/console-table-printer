type TABLE_LINE_DETAILS_KEYS = 'left' | 'right' | 'mid' | 'other';

export type TABLE_LINE_DETAILS = {
  [key in TABLE_LINE_DETAILS_KEYS]: string;
};

export type TABLE_STYLE_DETAILS = {
  headerTop: TABLE_LINE_DETAILS;
  headerBottom: TABLE_LINE_DETAILS;
  tableBottom: TABLE_LINE_DETAILS;
  vertical: string;
};

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

const alignments = ['right', 'left', 'center'] as const;

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
] as const;

export type ALIGNMENT = typeof alignments[number];

export type COLOR = typeof colors[number];
