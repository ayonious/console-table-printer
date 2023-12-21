import { Table } from '../../index';

describe('Example: 2', () => {
  it('Instance', () => {
    // Create a table
    const p = new Table();

    // add rows with color
    p.addRow({ Record: 'a', text: 'red wine please', value: 10.212 });
    p.addRow({ Record: 'b', text: 'green gemuse please', value: 20.0 });
    p.addRows([
      // adding multiple rows are possible
      { Record: 'c', text: 'gelb bananen bitte', value: 100 },
      { Record: 'd', text: 'update is working', value: 300 },
    ]);

    // print
    const returned = p.printTable();

    expect(returned).toBeUndefined();
  });
});
