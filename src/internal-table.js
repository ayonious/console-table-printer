const {TABLE_STYLE} = require('./table-constants');
const {ColoredConsoleLine} = require('./colored-console-line');
const {textWithPadding, printTableHorizontalBorders,
    createColum, createRow,createHeaderAsRow,
    findMaxLenOfColumn} = require('./table-helpers');

class TableInternal {
    initSimple (columns) {
        this.tableStyle = TABLE_STYLE['thinBorder'];
        this.columns = columns.map( column => (
            { 
                name: column,
                alignment: 'right'
            })
        );
    }
    
    initDefault () {
        this.tableStyle = TABLE_STYLE['thinBorder'];
        this.columns = [];
    }

    initDetailed (options) {
        this.tableStyle = TABLE_STYLE[options.style || 'thinBorder'];
        this.columns = options.columns && options.columns.map( column => (
            { 
                name: column.name,
                alignment: column.alignment || 'right'
            })
        ) || [];
    }

    constructor(options) {
        if( options === undefined ) {
            this.initDefault();
        } else if(options instanceof Array) {
            this.initSimple(options);
        } else if(typeof options === 'object') {
            this.initDetailed(options);
        }
        this.rows = [];
    }

    setBorderStyle(style, details) {
        switch(style) {
            case 'thinBorder': 
                this.style = 'thinBorder';
            case 'fatBorder':
                this.style = 'fatBorder';
            case 'customized':
                this.style = 'customized';
                this.styleDetails = details;
            default:
                this.style = this.style;
        }

    }

    createColumnFromRow(text) {
        const colNames = this.columns.map( col => col.name );
        for( let key in text) {
            if( !colNames.includes(key) ) {
                this.columns.push(createColum(key));
            }
        }
    }

    addColumn(text) {
        this.columns.push(createColum(text));
    }

    addColumns(toBeInsertedColumns) {
        for(let toBeInsertedColumn of toBeInsertedColumns) {
            this.addColumn(toBeInsertedColumn);
        }
    }


    addRow(text, options) {
        this.createColumnFromRow(text);
        this.rows.push(createRow( (options && options.color ) || 'white' , text));
    }

    addRows(toBeInsertedRows) {
        for(let toBeInsertedRow of toBeInsertedRows) {
            this.addRow(toBeInsertedRow);
        }
    }

    prepareLineAndPrint(row) {
        let line = new ColoredConsoleLine();
        line.addWithColor('white', this.tableStyle.vertical);
        for( let column of this.columns) {
            line.addWithColor('white', ' ');
            line.addWithColor(row.color, textWithPadding(`${row.text[column.name] || ''}`, column.alignment, column.max_ln));
            line.addWithColor('white', ' ' + this.tableStyle.vertical);
        }
        line.printConsole();
    }

    printRow(row) {
        this.prepareLineAndPrint(row);
    }

    printTableHeaders() {
        printTableHorizontalBorders(this.tableStyle.headerTop,
            this.columns.map( m => m.max_ln));

        let row = createHeaderAsRow(createRow, this.columns);
        this.prepareLineAndPrint(row);
    
        printTableHorizontalBorders(this.tableStyle.headerBottom,
            this.columns.map( m => m.max_ln));       
    }

    printTableEnding(row) {
        printTableHorizontalBorders(this.tableStyle.tableBottom,
            this.columns.map( m => m.max_ln));
    }

    calculateColumnProperty() {
        for (let column of this.columns) {
            column.max_ln = findMaxLenOfColumn(column, this.rows);
        }
    }

    printTable() {
        this.calculateColumnProperty();
        this.printTableHeaders();
        for (let row of this.rows) {
            this.printRow(row);
        }
        this.printTableEnding();
    }
}
module.exports = {
    TableInternal
}