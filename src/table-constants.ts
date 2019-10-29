export interface TABLE_LINE_DETAILS {
  left: string;
  mid: string;
  right: string;
  other: string;
};

export interface TABLE_STYLE_DETAILS {
  headerTop: TABLE_LINE_DETAILS;
  headerBottom: TABLE_LINE_DETAILS;
  tableBottom: TABLE_LINE_DETAILS;
  vertical: string;
};

export enum TABLE_BORDER_STYLES {
  thinBorder,
  fatBorder,
  customized,
};


export const TABLE_STYLE = {
  thinBorder: {
    /*
        Style1: thinBorder
        ┌────────────┬─────┬──────┐
        │ foo        │ bar │ baz  │
        │ frobnicate │ bar │ quuz │
        └────────────┴─────┴──────┘
        */
    headerTop: {
      left: "┌",
      mid: "┬",
      right: "┐",
      other: "─"
    },
    headerBottom: {
      left: "├",
      mid: "┼",
      right: "┤",
      other: "─"
    },
    tableBottom: {
      left: "└",
      mid: "┴",
      right: "┘",
      other: "─"
    },
    vertical: "│"
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
      left: "╔",
      mid: "╦",
      right: "╗",
      other: "═"
    },
    headerBottom: {
      left: "╟",
      mid: "╬",
      right: "╢",
      other: "═"
    },
    tableBottom: {
      left: "╚",
      mid: "╩",
      right: "╝",
      other: "═"
    },
    vertical: "║"
  }
};

export enum COLUMN_ALIGNMENT {
  left,
  right
};

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
};

