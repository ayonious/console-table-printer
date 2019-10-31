"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
var TABLE_BORDER_STYLES;
(function (TABLE_BORDER_STYLES) {
    TABLE_BORDER_STYLES[TABLE_BORDER_STYLES["fatBorder"] = 0] = "fatBorder";
    TABLE_BORDER_STYLES[TABLE_BORDER_STYLES["thinBorder"] = 1] = "thinBorder";
    TABLE_BORDER_STYLES[TABLE_BORDER_STYLES["customized"] = 2] = "customized";
})(TABLE_BORDER_STYLES = exports.TABLE_BORDER_STYLES || (exports.TABLE_BORDER_STYLES = {}));
;
exports.TABLE_STYLE = {
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
var COLUMN_ALIGNMENT;
(function (COLUMN_ALIGNMENT) {
    COLUMN_ALIGNMENT[COLUMN_ALIGNMENT["right"] = 0] = "right";
    COLUMN_ALIGNMENT[COLUMN_ALIGNMENT["left"] = 1] = "left";
})(COLUMN_ALIGNMENT = exports.COLUMN_ALIGNMENT || (exports.COLUMN_ALIGNMENT = {}));
;
var COLOR;
(function (COLOR) {
    COLOR[COLOR["NO_COLOR"] = 0] = "NO_COLOR";
    COLOR[COLOR["red"] = 1] = "red";
    COLOR[COLOR["green"] = 2] = "green";
    COLOR[COLOR["yellow"] = 3] = "yellow";
    COLOR[COLOR["white"] = 4] = "white";
    COLOR[COLOR["blue"] = 5] = "blue";
    COLOR[COLOR["magenta"] = 6] = "magenta";
    COLOR[COLOR["cyan"] = 7] = "cyan";
    COLOR[COLOR["crimson"] = 8] = "crimson";
    COLOR[COLOR["white_bold"] = 9] = "white_bold";
    COLOR[COLOR["reset"] = 10] = "reset";
})(COLOR = exports.COLOR || (exports.COLOR = {}));
;
//# sourceMappingURL=table-constants.js.map