const {COLOR} = require('./table-constants');
const {ColoredConsoleLine} = require('./colored-console-line');
const {textWithPadding, printTableHorizontalBorders,
    createRow,createHeaderAsRow,
    findMaxLenOfColumn} = require('./table-helpers');


function prepareLineAndPrint(tableStyle, columns, row) {
    let line = new ColoredConsoleLine();
    line.addWithColor(COLOR.white, tableStyle.vertical);
    for( let column of columns) {
        line.addWithColor(COLOR.white, ' ');
        line.addWithColor(row.color, textWithPadding(`${row.text[column.name] || ''}`, column.alignment, column.max_ln));
        line.addWithColor(COLOR.white, ' ' + tableStyle.vertical);
    }
    line.printConsole();
}

function printRow(table, row) {
    prepareLineAndPrint(table.tableStyle, table.columns, row);
}

function printTableHeaders(table) {
    printTableHorizontalBorders(table.tableStyle.headerTop,
        table.columns.map( m => m.max_ln));

    let row = createHeaderAsRow(createRow, table.columns);
    prepareLineAndPrint(table.tableStyle, table.columns, row);

    printTableHorizontalBorders(table.tableStyle.headerBottom,
        table.columns.map( m => m.max_ln));       
}

function printTableEnding(table) {
    printTableHorizontalBorders(table.tableStyle.tableBottom,
        table.columns.map( m => m.max_ln));
}

function calculateColumnProperty(table) {
    for (let column of table.columns) {
        column.max_ln = findMaxLenOfColumn(column, table.rows);
    }
}

function printTable(table) {
    calculateColumnProperty(table);
    printTableHeaders(table);
    
    for (let row of table.rows) {
        printRow(table, row);
    }

    printTableEnding(table);
}

function printSimpleTable(rows) {
    const {TableInternal} = require('./internal-table');
    let table = new TableInternal();
    table.addRows(rows);
    printTable(table);
}

module.exports = {
    printTable, 
    printSimpleTable
}

