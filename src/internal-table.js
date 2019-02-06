const {ColoredConsoleLine} = require('./colored-console-line');
const {TABLE_STYLE} = require('./table-constants');
const {textWithPadding, createTableHorizontalBorders} = require('./table-helpers');

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
        this.columns = options.columns.map( column => (
            { 
                name: column.name,
                alignment: column.alignment || 'right'
            })
        );
    }

    makeColum(name)  {
        return {name}
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

    createColumnFromRow(text) {
        const colNames = this.columns.map( col => col.name );
        for( let key in text) {
            if( !colNames.includes(key) ) {
                this.columns.push(this.makeColum(key));
            }
        }
    }

    addRow(text, options) {
        this.createColumnFromRow(text);
        this.rows.push(this.createRow( (options && options.color) || 'white' , text));
    }

    addRows(toBeInsertedRows) {
        for(let toBeInsertedRow of toBeInsertedRows) {
            this.addRow(toBeInsertedRow);
        }
    }

    createRow(color, text)  {
        return { color, text };
    }

    prepareLine(row) {
        let line = new ColoredConsoleLine();
        line.addWithColor('white', this.tableStyle.vertical);
        for( let column of this.columns) {
            line.addWithColor('white', ' ');
            line.addWithColor(row.color, textWithPadding(`${row.text[column.name]}`, column.alignment, column.max_ln));
            line.addWithColor('white', ' ' + this.tableStyle.vertical);
        }
        return line;
    }

    printRow(row) {
        let line = this.prepareLine(row);
        line.printConsole();
    }

    printTableHeaders() {
        let headerTopStr = createTableHorizontalBorders(
            this.tableStyle.headerTop,
            this.columns.map( m => m.max_ln));
        console.log(headerTopStr);
        
        function createHeaderAsRow (createRow, columns) {
            let row = createRow('white_bold', {});
            for (let column of columns) {
                row.text[column.name] = column.name;
            }
            return row;
        }
        let row = createHeaderAsRow(this.createRow, this.columns);
        let line = this.prepareLine(row);
        line.printConsole();

        let headerBottomStr = createTableHorizontalBorders(this.tableStyle.headerBottom,
            this.columns.map( m => m.max_ln));
        console.log(headerBottomStr);
    }

    printTableEnding(row) {
        let headerBottomStr = createTableHorizontalBorders(this.tableStyle.tableBottom,
            this.columns.map( m => m.max_ln));
        console.log(headerBottomStr);
    }

    printAll() {
        this.calculateColumnProperty();
        this.printTableHeaders();
        for (let row of this.rows) {
            this.printRow(row);
        }
        this.printTableEnding();
    }

    calculateColumnProperty() {
        const findMaxLenOfColumn = (column) => {
            let column_name = column.name;
            let max_ln = `${column_name}`.length;
            for (let row of this.rows) {
                max_ln = Math.max(max_ln, `${row.text[column_name]}`.length);
            }
            return max_ln;
        }
        for (let column of this.columns) {
            column.max_ln = findMaxLenOfColumn(column);
        }
    }
}
module.exports = {
    TableInternal
}