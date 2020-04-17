import { Table } from '../src/console-table-printer';

describe('Example: Print a simple Table', () => {
  it(`Readme Example1`, function() {
    //Create a table
    const p = new Table();

    //add rows with color
    p.addRow({ index: 1, text: 'red wine please', value: 10.212 });
    p.addRow({ index: 2, text: 'green gemuse please', value: 20.0 });
    p.addRows([
      //adding multiple rows are possible
      { index: 3, text: 'gelb bananen bitte', value: 100 },
      { index: 4, text: 'update is working', value: 300 },
    ]);

    //print
    const returned = p.printTable();
    expect(returned).toBeUndefined();
  });

  it(`Readme Example2`, function() {
    //Create a table
    const p = new Table();
    p.addRow({ index: 1, text: 'red wine', value: 10.212 }, { color: 'red' });
    p.addRow(
      { index: 2, text: 'green gemuse', value: 20.0 },
      { color: 'green' }
    );
    p.addRow(
      { index: 3, text: 'gelb bananen', value: 100 },
      { color: 'yellow' }
    );
    const returned = p.printTable();
    expect(returned).toBeUndefined();
  });

  it(`Readme Example: screenshots generator for style`, function() {
    //Create a table

    const p1 = new Table();

    //add rows with color
    p1.addRow({ index: 1, text: 'red wine', value: 10.9 });
    p1.addRow({ index: 2, text: 'green gemuse', value: 20.0 });

    //print
    p1.printTable();

    const p2 = new Table({ style: 'fatBorder' });

    //add rows with color
    p2.addRow({ index: 1, text: 'red wine', value: 10.9 });
    p2.addRow({ index: 2, text: 'green gemuse', value: 20.0 });

    //print
    const returned = p2.printTable();
    expect(returned).toBeUndefined();
  });

  it(`table With all colored rows`, function() {
    //Create a table
    const p = new Table({
      columns: [
        { name: 'index', alignment: 'left' },
        { name: 'text', alignment: 'right' },
        { name: 'value' },
      ],
    });

    //add rows with color
    p.addRow(
      { index: 2, text: 'I would like some blue poison please', value: 10.212 },
      { color: 'blue' }
    );
    p.addRow(
      { index: 3, text: 'I would like some red wine please', value: 10.212 },
      { color: 'red' }
    );
    p.addRow(
      { index: 4, text: 'I would like some cyan wine please', value: 10.212 },
      { color: 'cyan' }
    );
    p.addRow(
      {
        index: 5,
        text: 'I would like some white_bold wine please',
        value: 10.212,
      },
      { color: 'white_bold' }
    );
    p.addRow(
      { index: 6, text: 'I would like some crimson sky please', value: 10.212 },
      { color: 'crimson' }
    );
    p.addRow(
      { index: 7, text: 'I would like some green gemuse please', value: 20.0 },
      { color: 'green' }
    );
    p.addRow(
      { index: 8, text: 'I would like some gelb bananen bitte', value: 100 },
      { color: 'yellow' }
    );

    //print
    const returned = p.printTable();
    expect(returned).toBeUndefined();
  });

  it(`fat Border Table`, function() {
    //Create a table
    const p = new Table({
      style: 'fatBorder',
      columns: [
        { name: 'index', alignment: 'left' },
        { name: 'text', alignment: 'right' },
        { name: 'value' },
      ],
    });

    //add rows with color
    p.addRow(
      { index: 1, text: 'I would like some red wine please', value: 10.212 },
      { color: 'red' }
    );
    p.addRow(
      { index: 2, text: 'I would like some green gemuse please', value: 20.0 },
      { color: 'green' }
    );
    p.addRow(
      { index: 3, text: 'I would like some gelb bananen bitte', value: 100 },
      { color: 'yellow' }
    );

    //print
    const returned = p.printTable();
    expect(returned).toBeUndefined();
  });

  it(`simple table constructor`, function() {
    //Create a table
    const p = new Table(['index', 'text', 'value']);

    //add rows with color
    p.addRow(
      { index: 1, text: 'I would like some red wine please', value: 10.212 },
      { color: 'red' }
    );
    p.addRow(
      { index: 2, text: 'I would like some green gemuse please', value: 20.0 },
      { color: 'green' }
    );
    p.addRow(
      { index: 3, text: 'I would like some gelb bananen bitte', value: 100 },
      { color: 'yellow' }
    );

    //print
    const returned = p.printTable();
    expect(returned).toBeUndefined();
  });

  it(`without color`, function() {
    //Create a table
    const p = new Table(['index', 'text', 'value']);

    //add rows with color
    p.addRow({
      index: 1,
      text: 'I would like some red wine please',
      value: 10.212,
    });
    p.addRow({
      index: 2,
      text: 'I would like some green gemuse please',
      value: 20.0,
    });
    p.addRow({
      index: 3,
      text: 'I would like some gelb bananen bitte',
      value: 100,
    });

    //print
    const returned = p.printTable();
    expect(returned).toBeUndefined();
  });

  it(`batch insert`, function() {
    //Create a table
    const p = new Table(['index', 'text', 'value']);

    //add rows with color
    p.addRow({
      index: 1,
      text: 'I would like some red wine please',
      value: 10.212,
    });
    p.addRow({
      index: 2,
      text: 'I would like some green gemuse please',
      value: 20.0,
    });
    p.addRows([
      { index: 3, text: 'I would like some gelb bananen bitte', value: 100 },
      { index: 4, text: 'I hope batch update is working', value: 300 },
    ]);

    //print
    const returned = p.printTable();
    expect(returned).toBeUndefined();
  });

  it(`column creation`, function() {
    //Create a table
    const p = new Table();

    //add rows with color
    p.addRows([
      { index: 3, text: 'I would like some gelb bananen bitte', value: 100 },
      { index: 4, text: 'I hope batch update is working', value: 300 },
    ]);

    p.addColumn('extra_column1');
    p.addColumns(['extra_column2', 'extra_column3']);

    //print
    const returned = p.printTable();
    expect(returned).toBeUndefined();
  });

  it(`create column from rows`, function() {
    //Create a table
    const p = new Table();

    //add rows with color
    p.addRow({
      index: 1,
      text: 'I would like some red wine please',
      value: 10.212,
      amigo: 'Markit',
    });
    p.addRow({
      index: 2,
      text: 'I would like some green gemuse please',
      value: 20.0,
    });
    p.addRows([
      { index: 3, text: 'I would like some gelb bananen bitte', value: 100 },
      {
        index: 4,
        text: 'I hope batch update is working',
        value: 300,
        comment: 'best Result',
      },
    ]);

    //print
    const returned = p.printTable();
    expect(returned).toBeUndefined();
  });
});
