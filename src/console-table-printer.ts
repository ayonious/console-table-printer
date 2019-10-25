import {TableInternal} from './internal-table';
import {printSimpleTable} from './internal-table-printer';
import { RowOptions, Column } from './table-helpers';
import { COLOR } from './table-constants';

export class Table {
    table: TableInternal;
/*
rows:
[
    {
        color: 'red',
        text: {
            name: 'adsf'
            age: '12'
        }
    }.
    {
        color: 'green',
        text: {
            name: 'adsf'
            age: '12'
        }
    }
]

columns:
[
    {
        max_ln: 10,
        alignment: 'left',
        name: 'name'
    },
    {
        max_ln: 2,
        alignment: 'left',
        name: 'age'
    }
]
*/

    constructor(options?) {
        this.table = new TableInternal(options);
    }

    addColumn(column: string) {
        this.table.addColumn(column);
    }

    addColumns(columns: string[]) {
        this.table.addColumns(columns);
    }

    addRow(text: any, color?: COLOR) {
        this.table.addRow(text, color);
    }

    addRows(toBeInsertedRows) {
        this.table.addRows(toBeInsertedRows);
    }

    printTable() {
        return this.table.printTable();
    }
}
