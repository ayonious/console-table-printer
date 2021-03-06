import { Table } from '../../index';

describe('Example: Basic', () => {
  it('Readme Example1', () => {
    // Create a table
    const p = new Table();

    // add rows with color
    p.addRow({ index: 1, text: 'red wine please', value: 10.212 });
    p.addRow({ index: 2, text: 'green gemuse please', value: 20.0 });
    p.addRows([
      // adding multiple rows are possible
      { index: 3, text: 'gelb bananen bitte', value: 100 },
      { index: 4, text: 'update is working', value: 300 },
    ]);

    // print
    const returned = p.printTable();
    expect(returned).toBeUndefined();
  });

  it('Readme Example2', () => {
    // Create a table
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
});
