const {Table} = require('../src/console-table-printer');

describe('Example: Print a simple Table', () => {
    it(`Readme Example`, function () {
        //Create a table
        const p = new Table();

        //add rows with color
        p.addRow({ index: 1, text: 'I would like some red wine please', value: 10.212 });
        p.addRow({ index: 2, text: 'I would like some green gemuse please', value: 20.00 });
        p.addRows([
            { index: 3, text: 'I would like some gelb bananen bitte', value: 100 },
            { index: 4, text: 'I hope batch update is working', value: 300}
        ]);

        //print
        p.printAll();
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
        p.printAll();
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
        p.printAll();
    });
    
    it(`simple table constructor`, function () {
        //Create a table
        const p = new Table(['index', 'text', 'value']);

        //add rows with color
        p.addRow({ index: 1, text: 'I would like some red wine please', value: 10.212 }, {color: 'red'});
        p.addRow({ index: 2, text: 'I would like some green gemuse please', value: 20.00 }, {color: 'green'});
        p.addRow({ index: 3, text: 'I would like some gelb bananen bitte', value: 100 }, {color: 'yellow'});

        //print
        p.printAll();
    });

    it(`without color`, function () {
        //Create a table
        const p = new Table(['index', 'text', 'value']);

        //add rows with color
        p.addRow({ index: 1, text: 'I would like some red wine please', value: 10.212 });
        p.addRow({ index: 2, text: 'I would like some green gemuse please', value: 20.00 });
        p.addRow({ index: 3, text: 'I would like some gelb bananen bitte', value: 100 });

        //print
        p.printAll();
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
        p.printAll();
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
        p.printAll();
    });
});
