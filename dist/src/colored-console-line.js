"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_constants_1 = require("./table-constants");
const COLOR_MAP = {
    [table_constants_1.COLOR.red]: "\x1b[31m",
    [table_constants_1.COLOR.green]: "\x1b[32m",
    [table_constants_1.COLOR.yellow]: "\x1b[33m",
    [table_constants_1.COLOR.blue]: "\x1b[34m",
    [table_constants_1.COLOR.magenta]: "\x1b[35m",
    [table_constants_1.COLOR.cyan]: "\x1b[36m",
    [table_constants_1.COLOR.white]: "\x1b[37m",
    [table_constants_1.COLOR.crimson]: "\x1b[38m",
    [table_constants_1.COLOR.white_bold]: "\x1b[01m",
    [table_constants_1.COLOR.reset]: "\x1b[0m",
};
class ColoredConsoleLine {
    constructor() {
        this.text = "";
    }
    addWithColor(color, text) {
        this.text += COLOR_MAP[color];
        this.text += text;
        this.text += COLOR_MAP[table_constants_1.COLOR.reset];
    }
    printConsole() {
        console.log(this.text);
        return this.text;
    }
}
exports.ColoredConsoleLine = ColoredConsoleLine;
//# sourceMappingURL=colored-console-line.js.map