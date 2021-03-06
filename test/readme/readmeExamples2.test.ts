import { Table } from '../../index';

describe('Example: 2', () => {
  it('simple table constructor', () => {
    // Create a table
    const p = new Table(['index', 'text', 'value']);

    // add rows with color
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

    // print
    const returned = p.printTable();
    expect(returned).toBeUndefined();
  });

  it('without color', () => {
    // Create a table
    const p = new Table(['index', 'text', 'value']);

    // add rows with color
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

    // print
    const returned = p.printTable();
    expect(returned).toBeUndefined();
  });

  it('batch insert', () => {
    // Create a table
    const p = new Table(['index', 'text', 'value']);

    // add rows with color
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

    // print
    const returned = p.printTable();
    expect(returned).toBeUndefined();
  });
});
