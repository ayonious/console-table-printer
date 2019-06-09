const {COLOR} = require('./table-constants');
const {ColoredConsoleLine} = require('./colored-console-line');
const {textWithPadding, 
    printTableHorizontalBorders,
    createRow,
    createHeaderAsRow,
    findMaxLenOfColumn
} = require('./table-helpers');


function prepareLineAndPrint(tableStyle, columns, row) {
    let line = new ColoredConsoleLine();
    line.addWithColor(COLOR.white, tableStyle.vertical);
    for( let column of columns) {
        line.addWithColor(COLOR.white, ' ');
        line.addWithColor(row.color, textWithPadding(`${row.text[column.name] || ''}`, column.alignment, column.max_ln));
        line.addWithColor(COLOR.white, ' ' + tableStyle.vertical);
    }
    return line.printConsole();
}

// ║ 1     ║     I would like some red wine please ║ 10.212 ║
function printRow(table, row) {
    let ret = [];
    ret.push(prepareLineAndPrint(table.tableStyle, table.columns, row));
    return ret;
}


/* 
 ╔═══════╦═══════════════════════════════════════╦════════╗
 ║ index ║                                  text ║  value ║
 ╟═══════╬═══════════════════════════════════════╬════════╢
*/
function printTableHeaders(table) {
    let ret = [];
    
    // ╔═══════╦═══════════════════════════════════════╦════════╗
    ret.push(printTableHorizontalBorders(table.tableStyle.headerTop,
        table.columns.map( m => m.max_ln)));

    // ║ index ║                                  text ║  value ║
    let row = createHeaderAsRow(createRow, table.columns);
    ret.push(prepareLineAndPrint(table.tableStyle, table.columns, row));

    // ╟═══════╬═══════════════════════════════════════╬════════╢
    ret.push(printTableHorizontalBorders(table.tableStyle.headerBottom,
        table.columns.map( m => m.max_ln)));
        
    return ret;
}

function printTableEnding(table) {
    let ret = [];
    // ╚═══════╩═══════════════════════════════════════╩════════╝
    ret.push(printTableHorizontalBorders(table.tableStyle.tableBottom,
        table.columns.map( m => m.max_ln)));
    return ret;
}

function calculateColumnProperty(table) {
    for (let column of table.columns) {
        column.max_ln = findMaxLenOfColumn(column, table.rows);
    }
}

function printTableTest(table) {
    calculateColumnProperty(table);
    let ret = [];
    printTableHeaders(table).forEach( row => ret.push(row) );
    for (let row of table.rows) {
        printRow(table, row).forEach( row => ret.push(row) );
    }
    printTableEnding(table).forEach( row => ret.push(row) );
    return ret;
}

function printTable(table) {
    printTableTest(table);
}

function printSimpleTableTest(rows) {
    const {TableInternal} = require('./internal-table');
    let table = new TableInternal();
    table.addRows(rows);
    return printTableTest(table);
}

function printSimpleTable(rows) {
    printSimpleTableTest(rows);
}

module.exports = {
    printTable,
    printSimpleTable,

    // test functions
    printSimpleTableTest
}

