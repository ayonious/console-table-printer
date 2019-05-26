const {Table} = require('../src/console-table-printer');
const assert = require('assert');

describe('Example: Print a simple Table', () => {


    it(`Readme Example1`, function () {
        //Create a table
        const p = new Table();

        //add rows with color
        p.addRow({ index: 1, text: 'red wine please', value: 10.212 });
        p.addRow({ index: 2, text: 'green gemuse please', value: 20.00 });
        p.addRows([ //adding multiple rows are possible
            { index: 3, text: 'gelb bananen bitte', value: 100 },
            { index: 4, text: 'update is working', value: 300}
        ]);

        //print
        const returned = p.printTable();
        const expected = [ 
            '┌───────┬─────────────────────┬────────┐',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01mindex\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m               text\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m value\u001b[0m\u001b[37m │\u001b[0m',
            '├───────┼─────────────────────┼────────┤',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    1\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m    red wine please\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m10.212\u001b[0m\u001b[37m │\u001b[0m',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    2\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37mgreen gemuse please\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m    20\u001b[0m\u001b[37m │\u001b[0m',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    3\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m gelb bananen bitte\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m   100\u001b[0m\u001b[37m │\u001b[0m',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    4\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m  update is working\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m   300\u001b[0m\u001b[37m │\u001b[0m',
            '└───────┴─────────────────────┴────────┘' 
        ];
        assert.equal(JSON.stringify(expected), JSON.stringify(returned), "Didnt Match the table");
    });

    it(`Readme Example2`, function () {
        //Create a table
        const p = new Table();
        p.addRow({ index: 1, text: 'red wine', value: 10.212 }, {color: 'red'});
        p.addRow({ index: 2, text: 'green gemuse', value: 20.00 }, {color: 'green'});
        p.addRow({ index: 3, text: 'gelb bananen', value: 100 }, {color: 'yellow'});
        const returned = p.printTable();
        const expected = [ 
            '┌───────┬──────────────┬────────┐',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01mindex\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m        text\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m value\u001b[0m\u001b[37m │\u001b[0m',
            '├───────┼──────────────┼────────┤',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[31m    1\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[31m    red wine\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[31m10.212\u001b[0m\u001b[37m │\u001b[0m',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[32m    2\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[32mgreen gemuse\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[32m    20\u001b[0m\u001b[37m │\u001b[0m',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[33m    3\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[33mgelb bananen\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[33m   100\u001b[0m\u001b[37m │\u001b[0m',
            '└───────┴──────────────┴────────┘' 
        ];
        assert.equal(JSON.stringify(expected), JSON.stringify(returned), "Didnt Match the table");
    });


    it(`Readme Example: screenshots generator for style`, function () {
        //Create a table
        const p1 = new Table();

        //add rows with color
        p1.addRow({ index: 1, text: 'red wine', value: 10.9});
        p1.addRow({ index: 2, text: 'green gemuse', value: 20.00 });

        //print
        p1.printTable();

        const p2 = new Table({style: 'fatBorder'});

        //add rows with color
        p2.addRow({ index: 1, text: 'red wine', value: 10.9});
        p2.addRow({ index: 2, text: 'green gemuse', value: 20.00 });

        //print
        const expected = [ 
            '╔═══════╦══════════════╦═══════╗',
            '\u001b[37m║\u001b[0m\u001b[37m \u001b[0m\u001b[01mindex\u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[01m        text\u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[01mvalue\u001b[0m\u001b[37m ║\u001b[0m',
            '╟═══════╬══════════════╬═══════╢',
            '\u001b[37m║\u001b[0m\u001b[37m \u001b[0m\u001b[37m    1\u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[37m    red wine\u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[37m 10.9\u001b[0m\u001b[37m ║\u001b[0m',
            '\u001b[37m║\u001b[0m\u001b[37m \u001b[0m\u001b[37m    2\u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[37mgreen gemuse\u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[37m   20\u001b[0m\u001b[37m ║\u001b[0m',
            '╚═══════╩══════════════╩═══════╝' 
        ];
        
        //print
        const returned = p2.printTable();
        assert.equal(JSON.stringify(expected), JSON.stringify(returned), "Didnt Match the table");
    });

    it(`table With 3 rows`, function () {
        //Create a table
        const p = new Table({
            columns: [
                {name: 'index', alignment: 'left'},
                {name: 'text', alignment: 'right'},
                {name: 'value'}
            ]
        });

        //add rows with color
        p.addRow({ index: 1, text: 'I would like some red wine please', value: 10.212 }, {color: 'red'});
        p.addRow({ index: 2, text: 'I would like some green gemuse please', value: 20.00 }, {color: 'green'});
        p.addRow({ index: 3, text: 'I would like some gelb bananen bitte', value: 100 }, {color: 'yellow'});

        const expected = [ '┌───────┬───────────────────────────────────────┬────────┐',
        '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01mindex\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m                                 text\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m value\u001b[0m\u001b[37m │\u001b[0m',
        '├───────┼───────────────────────────────────────┼────────┤',
        '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[31m1    \u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[31m    I would like some red wine please\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[31m10.212\u001b[0m\u001b[37m │\u001b[0m',
        '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[32m2    \u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[32mI would like some green gemuse please\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[32m    20\u001b[0m\u001b[37m │\u001b[0m',
        '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[33m3    \u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[33m I would like some gelb bananen bitte\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[33m   100\u001b[0m\u001b[37m │\u001b[0m',
        '└───────┴───────────────────────────────────────┴────────┘' ];
        
        //print
        const returned = p.printTable();
        assert.equal(JSON.stringify(expected), JSON.stringify(returned), "Didnt Match the table");
    });

    it(`fat Border Table`, function () {
        //Create a table
        const p = new Table({
            style: 'fatBorder',
            columns: [
                {name: 'index', alignment: 'left'},
                {name: 'text', alignment: 'right'},
                {name: 'value'}
            ]
        });

        //add rows with color
        p.addRow({ index: 1, text: 'I would like some red wine please', value: 10.212 }, {color: 'red'});
        p.addRow({ index: 2, text: 'I would like some green gemuse please', value: 20.00 }, {color: 'green'});
        p.addRow({ index: 3, text: 'I would like some gelb bananen bitte', value: 100 }, {color: 'yellow'});

        //print
        const returned = p.printTable();
        const expected = [ 
            '╔═══════╦═══════════════════════════════════════╦════════╗',
            '\u001b[37m║\u001b[0m\u001b[37m \u001b[0m\u001b[01mindex\u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[01m                                 text\u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[01m value\u001b[0m\u001b[37m ║\u001b[0m',
            '╟═══════╬═══════════════════════════════════════╬════════╢',
            '\u001b[37m║\u001b[0m\u001b[37m \u001b[0m\u001b[31m1    \u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[31m    I would like some red wine please\u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[31m10.212\u001b[0m\u001b[37m ║\u001b[0m',
            '\u001b[37m║\u001b[0m\u001b[37m \u001b[0m\u001b[32m2    \u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[32mI would like some green gemuse please\u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[32m    20\u001b[0m\u001b[37m ║\u001b[0m',
            '\u001b[37m║\u001b[0m\u001b[37m \u001b[0m\u001b[33m3    \u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[33m I would like some gelb bananen bitte\u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[33m   100\u001b[0m\u001b[37m ║\u001b[0m',
            '╚═══════╩═══════════════════════════════════════╩════════╝' 
        ];
        assert.equal(JSON.stringify(expected), JSON.stringify(returned), "Didnt Match the table");
    });
    
    it(`simple table constructor`, function () {
        //Create a table
        const p = new Table(['index', 'text', 'value']);

        //add rows with color
        p.addRow({ index: 1, text: 'I would like some red wine please', value: 10.212 }, {color: 'red'});
        p.addRow({ index: 2, text: 'I would like some green gemuse please', value: 20.00 }, {color: 'green'});
        p.addRow({ index: 3, text: 'I would like some gelb bananen bitte', value: 100 }, {color: 'yellow'});

        //print
        const returned = p.printTable();
        const expected = [ 
            '┌───────┬───────────────────────────────────────┬────────┐',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01mindex\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m                                 text\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m value\u001b[0m\u001b[37m │\u001b[0m',
            '├───────┼───────────────────────────────────────┼────────┤',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[31m    1\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[31m    I would like some red wine please\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[31m10.212\u001b[0m\u001b[37m │\u001b[0m',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[32m    2\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[32mI would like some green gemuse please\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[32m    20\u001b[0m\u001b[37m │\u001b[0m',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[33m    3\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[33m I would like some gelb bananen bitte\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[33m   100\u001b[0m\u001b[37m │\u001b[0m',
            '└───────┴───────────────────────────────────────┴────────┘' 
        ];
        assert.equal(JSON.stringify(expected), JSON.stringify(returned), "Didnt Match the table");
    });

    it(`without color`, function () {
        //Create a table
        const p = new Table(['index', 'text', 'value']);

        //add rows with color
        p.addRow({ index: 1, text: 'I would like some red wine please', value: 10.212 });
        p.addRow({ index: 2, text: 'I would like some green gemuse please', value: 20.00 });
        p.addRow({ index: 3, text: 'I would like some gelb bananen bitte', value: 100 });

        //print
        const returned = p.printTable();
        const expected = [ 
            '┌───────┬───────────────────────────────────────┬────────┐',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01mindex\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m                                 text\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m value\u001b[0m\u001b[37m │\u001b[0m',
            '├───────┼───────────────────────────────────────┼────────┤',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    1\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m    I would like some red wine please\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m10.212\u001b[0m\u001b[37m │\u001b[0m',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    2\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37mI would like some green gemuse please\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m    20\u001b[0m\u001b[37m │\u001b[0m',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    3\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m I would like some gelb bananen bitte\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m   100\u001b[0m\u001b[37m │\u001b[0m',
            '└───────┴───────────────────────────────────────┴────────┘' 
        ];
        assert.equal(JSON.stringify(expected), JSON.stringify(returned), "Didnt Match the table");
    });


    it(`batch insert`, function () {
        //Create a table
        const p = new Table(['index', 'text', 'value']);

        //add rows with color
        p.addRow({ index: 1, text: 'I would like some red wine please', value: 10.212 });
        p.addRow({ index: 2, text: 'I would like some green gemuse please', value: 20.00 });
        p.addRows([
            { index: 3, text: 'I would like some gelb bananen bitte', value: 100 },
            { index: 4, text: 'I hope batch update is working', value: 300 }
        ]);

        //print
        const returned = p.printTable();
        const expected = [ 
            '┌───────┬───────────────────────────────────────┬────────┐',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01mindex\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m                                 text\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m value\u001b[0m\u001b[37m │\u001b[0m',
            '├───────┼───────────────────────────────────────┼────────┤',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    1\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m    I would like some red wine please\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m10.212\u001b[0m\u001b[37m │\u001b[0m',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    2\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37mI would like some green gemuse please\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m    20\u001b[0m\u001b[37m │\u001b[0m',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    3\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m I would like some gelb bananen bitte\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m   100\u001b[0m\u001b[37m │\u001b[0m',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    4\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m       I hope batch update is working\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m   300\u001b[0m\u001b[37m │\u001b[0m',
            '└───────┴───────────────────────────────────────┴────────┘' 
        ];
        assert.equal(JSON.stringify(expected), JSON.stringify(returned), "Didnt Match the table");
    });

    it(`column creation`, function () {
        //Create a table
        const p = new Table();

        //add rows with color
        p.addRows([
            { index: 3, text: 'I would like some gelb bananen bitte', value: 100 },
            { index: 4, text: 'I hope batch update is working', value: 300 }
        ]);

        p.addColumn('extra_column1');
        p.addColumns(['extra_column2', 'extra_column3']);

        //print
        const returned = p.printTable();
        const expected = [ 
            '┌───────┬──────────────────────────────────────┬───────┬───────────────┬───────────────┬───────────────┐',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01mindex\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m                                text\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01mvalue\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01mextra_column1\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01mextra_column2\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01mextra_column3\u001b[0m\u001b[37m │\u001b[0m',
            '├───────┼──────────────────────────────────────┼───────┼───────────────┼───────────────┼───────────────┤',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    3\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37mI would like some gelb bananen bitte\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m  100\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m             \u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m             \u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m             \u001b[0m\u001b[37m │\u001b[0m',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    4\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m      I hope batch update is working\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m  300\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m             \u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m             \u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m             \u001b[0m\u001b[37m │\u001b[0m',
            '└───────┴──────────────────────────────────────┴───────┴───────────────┴───────────────┴───────────────┘' 
        ];
        assert.equal(JSON.stringify(expected), JSON.stringify(returned), "Didnt Match the table");
    });

    it(`create column from rows`, function () {
        //Create a table
        const p = new Table();

        //add rows with color
        p.addRow({ index: 1, text: 'I would like some red wine please', value: 10.212, amigo: 'Markit' });
        p.addRow({ index: 2, text: 'I would like some green gemuse please', value: 20.00 });
        p.addRows([
            { index: 3, text: 'I would like some gelb bananen bitte', value: 100 },
            { index: 4, text: 'I hope batch update is working', value: 300, comment: 'best Result'}
        ]);
        
        //print
        const returned = p.printTable();
        const expected = [ 
            '┌───────┬───────────────────────────────────────┬────────┬────────┬─────────────┐',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01mindex\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m                                 text\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m value\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m amigo\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m    comment\u001b[0m\u001b[37m │\u001b[0m',
            '├───────┼───────────────────────────────────────┼────────┼────────┼─────────────┤',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    1\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m    I would like some red wine please\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m10.212\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37mMarkit\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m           \u001b[0m\u001b[37m │\u001b[0m',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    2\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37mI would like some green gemuse please\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m    20\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m      \u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m           \u001b[0m\u001b[37m │\u001b[0m',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    3\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m I would like some gelb bananen bitte\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m   100\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m      \u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m           \u001b[0m\u001b[37m │\u001b[0m',
            '\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    4\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m       I hope batch update is working\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m   300\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m      \u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37mbest Result\u001b[0m\u001b[37m │\u001b[0m',
            '└───────┴───────────────────────────────────────┴────────┴────────┴─────────────┘' 
        ];
        assert.equal(JSON.stringify(expected), JSON.stringify(returned), "Didnt Match the table");
    });
});
