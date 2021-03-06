import { Table } from '../../index';

describe('Example: 1', () => {
  it('Readme Example: screenshots generator for style', () => {
    // Create a table

    const p1 = new Table();

    // add rows with color
    p1.addRow({ index: 1, text: 'red wine', value: 10.9 });
    p1.addRow({ index: 2, text: 'green gemuse', value: 20.0 });

    // print
    p1.printTable();

    const p2 = new Table();

    // add rows with color
    p2.addRow({ index: 1, text: 'red wine', value: 10.9 });
    p2.addRow({ index: 2, text: 'green gemuse', value: 20.0 });

    // print
    const returned = p2.printTable();
    expect(returned).toBeUndefined();
  });

  it('Readme Example: Header Title with alignment', () => {
    const p = new Table({
      columns: [
        { name: 'index', alignment: 'left', color: 'blue' }, // with alignment and color
        { name: 'text', alignment: 'right' },
        { name: 'is_priority_today', title: 'Is This Priority?' }, // with Title as separate Text
      ],
    });

    p.addRow({ index: 1, text: 'red wine', value: 10.212 }, { color: 'green' });
    p.addRow({ index: 2, text: 'green gemuse', value: 20.0 });
    p.addRow(
      { index: 3, text: 'gelb bananen', value: 100, is_priority_today: 'Y' },
      { color: 'yellow' }
    );
    p.addRow(
      { index: 3, text: 'rosa hemd wie immer', value: 100 },
      { color: 'cyan' }
    );
    p.printTable();
  });

  it('table With all colored rows', () => {
    // Create a table
    const p = new Table({
      columns: [
        { name: 'index', alignment: 'left' },
        { name: 'text', alignment: 'right' },
        { name: 'value' },
      ],
    });

    // add rows with color
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

    // print
    const returned = p.printTable();
    expect(returned).toBeUndefined();
  });
});
