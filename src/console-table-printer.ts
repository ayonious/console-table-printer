import {TableInternal} from './internal-table';
import {printSimpleTable} from './internal-table-printer';

export class Table {
    table: any;
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

    addColumn(column) {
        this.table.addColumn(column);
    }

    addColumns(columns) {
        this.table.addColumns(columns);
    }

    addRow(text, color?) {
        this.table.addRow(text, color);
    }

    addRows(toBeInsertedRows) {
        this.table.addRows(toBeInsertedRows);
    }

    printTable() {
        return this.table.printTable();
    }
}

export = {
    Table,
    printTable: printSimpleTable
}