import { Table } from '../../index';

describe('Example: 3', () => {
  it('create column from rows', () => {
    // Create a table
    const p = new Table();

    // add rows with color
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

    // print
    p.printTable();
  });
});
