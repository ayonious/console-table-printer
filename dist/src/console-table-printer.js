"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_table_1 = require("./internal-table");
const table_helpers_1 = require("./table-helpers");
class Table {
    constructor(options) {
        this.table = new internal_table_1.TableInternal(options);
    }
    addColumn(column) {
        this.table.addColumn(column);
    }
    addColumns(columns) {
        this.table.addColumns(columns);
    }
    addRow(text, rowOptions) {
        this.table.addRow(text, table_helpers_1.convertRawRowOptionsToStanrd(rowOptions));
    }
    addRows(toBeInsertedRows) {
        this.table.addRows(toBeInsertedRows);
    }
    printTable() {
        return this.table.printTable();
    }
}
exports.Table = Table;
//# sourceMappingURL=console-table-printer.js.map