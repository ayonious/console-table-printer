const TABLE_STYLE = {
    thinBorder: {
        /*
        Style2: thinBorder
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
        Style1: fatBorder
        ╔══════╤═════╤══════╗
        ║ hob  │ foo │ mia  ║
        ╟──────┼─────┼──────╢
        ║ ball │ fox │ mama ║
        ╚══════╧═════╧══════╝
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

module.exports = {
    TABLE_STYLE,
}