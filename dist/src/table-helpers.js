"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_constants_1 = require("./table-constants");
function convertRawRowOptionsToStanrd(options) {
    if (options && options.color) {
        return {
            color: table_constants_1.COLOR[options.color]
        };
    }
    return undefined;
}
exports.convertRawRowOptionsToStanrd = convertRawRowOptionsToStanrd;
function textWithPadding(text, alignment, size) {
    switch (alignment) {
        case table_constants_1.COLUMN_ALIGNMENT.left:
            return text.padEnd(size);
        case table_constants_1.COLUMN_ALIGNMENT.right:
            return text.padStart(size);
        default:
            return text.padStart(size);
    }
}
exports.textWithPadding = textWithPadding;
function createTableHorizontalBorders({ left, mid, right, other }, column_lengths) {
    let ret = left;
    for (let len of column_lengths) {
        ret += other.repeat(len + 2);
        ret += mid;
    }
    ret = ret.slice(0, -1);
    ret += right;
    return ret;
}
exports.createTableHorizontalBorders = createTableHorizontalBorders;
function createColum(name) {
    return { name };
}
exports.createColum = createColum;
function createRow(color, text) {
    return { color, text };
}
exports.createRow = createRow;
function findMaxLenOfColumn(column, rows) {
    let column_name = column.name;
    let max_ln = `${column_name}`.length;
    for (let row of rows) {
        max_ln = Math.max(max_ln, `${row.text[column_name] || ""}`.length);
    }
    return max_ln;
}
exports.findMaxLenOfColumn = findMaxLenOfColumn;
function printTableHorizontalBorders(style, column_lengths) {
    const str = createTableHorizontalBorders(style, column_lengths);
    console.log(str);
    return str;
}
exports.printTableHorizontalBorders = printTableHorizontalBorders;
function createHeaderAsRow(createRow, columns) {
    let row = createRow(table_constants_1.COLOR.white_bold, {});
    for (let column of columns) {
        row.text[column.name] = column.name;
    }
    return row;
}
exports.createHeaderAsRow = createHeaderAsRow;
//# sourceMappingURL=table-helpers.js.map