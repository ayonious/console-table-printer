const {TableInternal} = require('./internal-table');

class Table {
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

    constructor(options) {
        this.table = new TableInternal(options);
    }

    addRow(text, color) {
        this.table.addRow(text, color);
    }

    addRows(toBeInsertedRows) {
        this.table.addRows(toBeInsertedRows);
    }

    printAll() {
        this.table.printAll();
    }
}

module.exports = {
    Table
}