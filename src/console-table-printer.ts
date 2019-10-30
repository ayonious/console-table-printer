import {TableInternal} from './internal-table';
import {printSimpleTable} from './internal-table-printer';
import { RowOptionsRaw, Column, convertRawRowOptionsToStanrd } from './table-helpers';
import { COLOR } from './table-constants';

export class Table {
    table: TableInternal;

    constructor(options?) {
        this.table = new TableInternal(options);
    }

    addColumn(column: string) {
        this.table.addColumn(column);
    }

    addColumns(columns: string[]) {
        this.table.addColumns(columns);
    }

    addRow(text: any, rowOptions?: RowOptionsRaw) {
        this.table.addRow(text, convertRawRowOptionsToStanrd(rowOptions));
    }

    addRows(toBeInsertedRows) {
        this.table.addRows(toBeInsertedRows);
    }

    printTable() {
        return this.table.printTable();
    }
}
