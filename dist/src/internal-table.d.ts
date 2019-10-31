import { TABLE_BORDER_STYLES, TABLE_STYLE_DETAILS } from './table-constants';
import { Column, Row, RowOptions } from './table-helpers';
export interface ComplexOptions {
    style: string;
    columns: [{
        name: string;
        alignment: string;
    }];
}
export declare class TableInternal {
    tableStyle: TABLE_STYLE_DETAILS;
    columns: Column[];
    rows: Row[];
    style: TABLE_BORDER_STYLES;
    styleDetails: TABLE_STYLE_DETAILS;
    initSimple(columns: string[]): void;
    initDefault(): void;
    initDetailed(options: ComplexOptions): void;
    constructor(options?: ComplexOptions | string[]);
    setBorderStyle(style: TABLE_BORDER_STYLES, details: TABLE_STYLE_DETAILS): void;
    createColumnFromRow(text: any): void;
    addColumn(text: string): void;
    addColumns(toBeInsertedColumns: string[]): void;
    addRow(text: any, options?: RowOptions): void;
    addRows(toBeInsertedRows: any): void;
    getColumns(): Column[];
    printTable(): void;
}
