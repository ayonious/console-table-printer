"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_constants_1 = require("./table-constants");
const table_helpers_1 = require("./table-helpers");
const internal_table_printer_1 = require("./internal-table-printer");
class TableInternal {
    constructor(options) {
        if (options === undefined) {
            this.initDefault();
        }
        else if (options instanceof Array) {
            this.initSimple(options);
        }
        else if (typeof options === 'object') {
            this.initDetailed(options);
        }
        this.rows = [];
    }
    initSimple(columns) {
        this.tableStyle = table_constants_1.TABLE_STYLE.thinBorder;
        this.columns = columns.map(column => ({
            name: column,
            alignment: table_constants_1.COLUMN_ALIGNMENT.right
        }));
    }
    initDefault() {
        this.tableStyle = table_constants_1.TABLE_STYLE.thinBorder;
        this.columns = [];
    }
    initDetailed(options) {
        this.tableStyle = (options.style && table_constants_1.TABLE_STYLE[options.style]) || table_constants_1.TABLE_STYLE.thinBorder;
        this.columns = options.columns && options.columns.map(column => ({
            name: column.name,
            alignment: column.alignment || table_constants_1.COLUMN_ALIGNMENT.right
        })) || [];
    }
    setBorderStyle(style, details) {
        switch (style) {
            case table_constants_1.TABLE_BORDER_STYLES.customized:
                this.style = table_constants_1.TABLE_BORDER_STYLES.customized;
                this.styleDetails = details;
            case table_constants_1.TABLE_BORDER_STYLES.thinBorder:
            case table_constants_1.TABLE_BORDER_STYLES.fatBorder:
                this.style = style;
            default:
                this.style = style;
        }
    }
    createColumnFromRow(text) {
        const colNames = this.columns.map(col => col.name);
        for (let key in text) {
            if (!colNames.includes(key)) {
                this.columns.push(table_helpers_1.createColum(key));
            }
        }
    }
    addColumn(text) {
        this.columns.push(table_helpers_1.createColum(text));
    }
    addColumns(toBeInsertedColumns) {
        for (let toBeInsertedColumn of toBeInsertedColumns) {
            this.addColumn(toBeInsertedColumn);
        }
    }
    addRow(text, options) {
        this.createColumnFromRow(text);
        this.rows.push(table_helpers_1.createRow((options && options.color) || table_constants_1.COLOR.white, text));
    }
    addRows(toBeInsertedRows) {
        for (let toBeInsertedRow of toBeInsertedRows) {
            this.addRow(toBeInsertedRow, undefined);
        }
    }
    getColumns() {
        return this.columns;
    }
    printTable() {
        return internal_table_printer_1.printTable(this);
    }
}
exports.TableInternal = TableInternal;
