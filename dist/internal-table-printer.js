"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_constants_1 = require("./table-constants");
const colored_console_line_1 = require("./colored-console-line");
const table_helpers_1 = require("./table-helpers");
const internal_table_1 = require("./internal-table");
function prepareLineAndPrint(tableStyle, columns, row) {
    let line = new colored_console_line_1.ColoredConsoleLine();
    line.addWithColor(table_constants_1.COLOR.white, tableStyle.vertical);
    for (let column of columns) {
        line.addWithColor(table_constants_1.COLOR.white, " ");
        line.addWithColor(row.color, table_helpers_1.textWithPadding(`${row.text[column.name] || ""}`, column.alignment, column.max_ln));
        line.addWithColor(table_constants_1.COLOR.white, " " + tableStyle.vertical);
    }
    return line.printConsole();
}
// ║ 1     ║     I would like some red wine please ║ 10.212 ║
function printRow(table, row) {
    let ret = [];
    ret.push(prepareLineAndPrint(table.tableStyle, table.columns, row));
    return ret;
}
/*
 ╔═══════╦═══════════════════════════════════════╦════════╗
 ║ index ║                                  text ║  value ║
 ╟═══════╬═══════════════════════════════════════╬════════╢
*/
function printTableHeaders(table) {
    let ret = [];
    // ╔═══════╦═══════════════════════════════════════╦════════╗
    ret.push(table_helpers_1.printTableHorizontalBorders(table.tableStyle.headerTop, table.columns.map(m => m.max_ln)));
    // ║ index ║                                  text ║  value ║
    let row = table_helpers_1.createHeaderAsRow(table_helpers_1.createRow, table.columns);
    ret.push(prepareLineAndPrint(table.tableStyle, table.columns, row));
    // ╟═══════╬═══════════════════════════════════════╬════════╢
    ret.push(table_helpers_1.printTableHorizontalBorders(table.tableStyle.headerBottom, table.columns.map(m => m.max_ln)));
    return ret;
}
function printTableEnding(table) {
    let ret = [];
    // ╚═══════╩═══════════════════════════════════════╩════════╝
    ret.push(table_helpers_1.printTableHorizontalBorders(table.tableStyle.tableBottom, table.columns.map(m => m.max_ln)));
    return ret;
}
function calculateColumnProperty(table) {
    for (let column of table.columns) {
        column.max_ln = table_helpers_1.findMaxLenOfColumn(column, table.rows);
    }
}
function printTableTest(table) {
    calculateColumnProperty(table);
    let ret = [];
    printTableHeaders(table).forEach(row => ret.push(row));
    for (let row of table.rows) {
        printRow(table, row).forEach(row => ret.push(row));
    }
    printTableEnding(table).forEach(row => ret.push(row));
    return ret;
}
function printTable(table) {
    printTableTest(table);
}
exports.printTable = printTable;
function printSimpleTableTest(rows) {
    let table = new internal_table_1.TableInternal();
    table.addRows(rows);
    return printTableTest(table);
}
exports.printSimpleTableTest = printSimpleTableTest;
function printSimpleTable(rows) {
    printSimpleTableTest(rows);
}
exports.printSimpleTable = printSimpleTable;
