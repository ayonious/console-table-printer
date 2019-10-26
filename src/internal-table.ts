import { TABLE_STYLE, TABLE_BORDER_STYLES, COLUMN_ALIGNMENT, COLOR, TABLE_STYLE_DETAILS } from './table-constants';
import { createColum, createRow, Column, Row, RowOptions } from './table-helpers';
import { printTable } from './internal-table-printer';

export class TableInternal {
    tableStyle: TABLE_STYLE_DETAILS;
    columns: Column[];
    rows: Row[];
    style: TABLE_BORDER_STYLES;
    styleDetails: TABLE_STYLE_DETAILS;

    initSimple(columns: string[]) {
        this.tableStyle = TABLE_STYLE.thinBorder;
        this.columns = columns.map(column => (
            {
                name: column,
                alignment: COLUMN_ALIGNMENT.right
            })
        );
    }

    initDefault() {
        this.tableStyle = TABLE_STYLE.thinBorder;
        this.columns = [];
    }

    initDetailed(options) {
        this.tableStyle = (options.style && TABLE_STYLE[options.style]) || TABLE_STYLE.thinBorder;
        this.columns = options.columns && options.columns.map(column => (
            {
                name: column.name,
                alignment: column.alignment || COLUMN_ALIGNMENT.right
            })
        ) || [];
    }

    constructor(options?) {
        if (options === undefined) {
            this.initDefault();
        } else if (options instanceof Array) {
            this.initSimple(options);
        } else if (typeof options === 'object') {
            this.initDetailed(options);
        }
        this.rows = [];
    }

    setBorderStyle(style: TABLE_BORDER_STYLES, details: TABLE_STYLE_DETAILS) {
        switch (style) {
            case TABLE_BORDER_STYLES.customized:
                this.style = TABLE_BORDER_STYLES.customized;
                this.styleDetails = details;
            case TABLE_BORDER_STYLES.thinBorder:
            case TABLE_BORDER_STYLES.fatBorder:
                this.style = style;
            default:
                this.style = style;
        }

    }

    createColumnFromRow(text: any) {
        const colNames = this.columns.map(col => col.name);
        for (let key in text) {
            if (!colNames.includes(key)) {
                this.columns.push(createColum(key));
            }
        }
    }

    addColumn(text: string) {
        this.columns.push(createColum(text));
    }

    addColumns(toBeInsertedColumns: string[]) {
        for (let toBeInsertedColumn of toBeInsertedColumns) {
            this.addColumn(toBeInsertedColumn);
        }
    }

    addRow(text: any, options?: RowOptions) {
        this.createColumnFromRow(text);
        this.rows.push(createRow((options && options.color) || COLOR.white, text));
    }

    addRows(toBeInsertedRows: any) {
        for (let toBeInsertedRow of toBeInsertedRows) {
            this.addRow(toBeInsertedRow, undefined);
        }
    }

    getColumns(): Column[] {
        return this.columns;
    }

    printTable() {
        return printTable(this);
    }
}
