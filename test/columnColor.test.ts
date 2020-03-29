import { Table } from '../src/console-table-printer';

describe('Example: Print a simple Table wiht column colors', () => {
  it(`column colors are working`, function() {
    //Create a table
    const p = new Table({
      columns: [
        { name: 'index', alignment: 'left', color: 'red' },
        { name: 'text', alignment: 'right' },
        { name: 'value', color: 'green' },
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
});
