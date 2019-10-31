import { COLUMN_ALIGNMENT, COLOR } from "./table-constants";
export interface Column {
    name: string;
    alignment?: COLUMN_ALIGNMENT;
    max_ln?: number;
}
export interface Row {
    color: COLOR;
    text: any;
}
export declare function convertRawRowOptionsToStanrd(options?: RowOptionsRaw): RowOptions | undefined;
export interface RowOptionsRaw {
    color: string;
}
export interface RowOptions {
    color: COLOR;
}
export declare function textWithPadding(text: string, alignment: COLUMN_ALIGNMENT, size: number): string;
export declare function createTableHorizontalBorders({ left, mid, right, other }: {
    left: any;
    mid: any;
    right: any;
    other: any;
}, column_lengths: any): any;
export declare function createColum(name: string): Column;
export declare function createRow(color: COLOR, text: string): Row;
export declare function findMaxLenOfColumn(column: Column, rows: Row[]): number;
export declare function printTableHorizontalBorders(style: any, column_lengths: any): string;
export declare function createHeaderAsRow(createRow: any, columns: Column[]): Row;
