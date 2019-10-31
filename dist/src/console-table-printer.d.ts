import { TableInternal } from './internal-table';
import { RowOptionsRaw } from './table-helpers';
export declare class Table {
    table: TableInternal;
    constructor(options?: any);
    addColumn(column: string): void;
    addColumns(columns: string[]): void;
    addRow(text: any, rowOptions?: RowOptionsRaw): void;
    addRows(toBeInsertedRows: any): void;
    printTable(): void;
}
