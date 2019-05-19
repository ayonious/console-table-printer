const TABLE_STYLE = {
    thinBorder: {
        /*
        Style1: thinBorder
        ┌────────────┬─────┬──────┐
        │ foo        │ bar │ baz  │
        │ frobnicate │ bar │ quuz │
        └────────────┴─────┴──────┘
        */
        headerTop : {
            left: "┌", mid: '┬', right:  "┐", other: "─",
        },
        headerBottom: {
            left: "├", mid: '┼', right:  "┤", other: "─",
        },
        tableBottom: {
            left: "└", mid: '┴', right:  "┘", other: "─",
        },
        vertical: '│'
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
        headerTop : {
            left: "╔", mid: '╦', right:  "╗", other: "═",
        },
        headerBottom: {
            left: "╟", mid: '╬', right:  "╢", other: "═",
        },
        tableBottom: {
            left: "╚", mid: '╩', right:  "╝", other: "═",
        },
        vertical: '║'
    }
};

const COLUMN_ALIGNMENT = {
    left: 'left',
    right: 'right',
}

const COLOR = {
    red: 'red',
    green: 'green',
    yellow: 'yellow',
    white: 'white',
    blue: 'blue',
    magenta: 'magenta',
    cyan: 'cyan',
    crimson: 'crimson',
    white_bold: 'white_bold',
    reset: 'reset',
}

const TABLE_BORDER_STYLES = {
    thinBorder: 'thinBorder',
    fatBorder: 'fatBorder',
    customized: 'customized',
};

module.exports = {
    COLOR,
    COLUMN_ALIGNMENT,
    TABLE_BORDER_STYLES,
    TABLE_STYLE,
}