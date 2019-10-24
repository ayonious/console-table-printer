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

export const COLUMN_ALIGNMENT = {
  left: "left",
  right: "right"
};

export const COLOR = {
  red: "red",
  green: "green",
  yellow: "yellow",
  white: "white",
  blue: "blue",
  magenta: "magenta",
  cyan: "cyan",
  crimson: "crimson",
  white_bold: "white_bold",
  reset: "reset"
};

export const TABLE_BORDER_STYLES = {
  thinBorder: "thinBorder",
  fatBorder: "fatBorder",
  customized: "customized"
};
