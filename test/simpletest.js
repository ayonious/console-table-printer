const {Table} = require('../src/console-table-printer');

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
        p.printTable();
    });

    it(`Readme Example2`, function () {
        //Create a table
        const p = new Table();

        //add rows with color
        p.addRow({ index: 1, text: 'red wine', value: 10.212 }, {color: 'red'});
        p.addRow({ index: 2, text: 'green gemuse', value: 20.00 }, {color: 'green'});
        p.addRow({ index: 3, text: 'gelb bananen', value: 100 }, {color: 'yellow'});

        //print
        p.printTable();
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

        //print
        p.printTable();
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
        p.printTable();
    });
    
    it(`simple table constructor`, function () {
        //Create a table
        const p = new Table(['index', 'text', 'value']);

        //add rows with color
        p.addRow({ index: 1, text: 'I would like some red wine please', value: 10.212 }, {color: 'red'});
        p.addRow({ index: 2, text: 'I would like some green gemuse please', value: 20.00 }, {color: 'green'});
        p.addRow({ index: 3, text: 'I would like some gelb bananen bitte', value: 100 }, {color: 'yellow'});

        //print
        p.printTable();
    });

    it(`without color`, function () {
        //Create a table
        const p = new Table(['index', 'text', 'value']);

        //add rows with color
        p.addRow({ index: 1, text: 'I would like some red wine please', value: 10.212 });
        p.addRow({ index: 2, text: 'I would like some green gemuse please', value: 20.00 });
        p.addRow({ index: 3, text: 'I would like some gelb bananen bitte', value: 100 });

        //print
        p.printTable();
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
        p.printTable();
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
        p.printTable();
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
        p.printTable();
    });
});
