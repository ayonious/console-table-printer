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

export enum TABLE_BORDER_STYLES {
  fatBorder,
  thinBorder,
  customized,
}

export const TABLE_STYLE: {
  fatBorder: TABLE_STYLE_DETAILS;
  thinBorder: TABLE_STYLE_DETAILS;
} = {
  thinBorder: {
    /*
        Style1: thinBorder
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
  },
  fatBorder: {
    /*
        Style2: fatBorder
        ╔══════╦═════╦══════╗
        ║ hob  ║ foo ║ mia  ║
        ╟══════╬═════╬══════╢
        ║ ball ║ fox ║ mama ║
        ╚══════╩═════╩══════╝
        */
    headerTop: {
      left: '╔',
      mid: '╦',
      right: '╗',
      other: '═',
    },
    headerBottom: {
      left: '╟',
      mid: '╬',
      right: '╢',
      other: '═',
    },
    tableBottom: {
      left: '╚',
      mid: '╩',
      right: '╝',
      other: '═',
    },
    vertical: '║',
  },
};

export enum COLUMN_ALIGNMENT {
  right,
  left,
  center,
}

export enum COLOR {
  NO_COLOR, // I added this for a reason I dont know. Without this red color was not getting printed on console
  red,
  green,
  yellow,
  white,
  blue,
  magenta,
  cyan,
  crimson,
  white_bold,
  reset,
}
