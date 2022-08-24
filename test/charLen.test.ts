import { Table } from '../index';

describe('Example: Print a simple Table with cell colors', () => {
  it('foreign alphabets are working', () => {
    // Create a table
    const p = new Table({
      charLength: {
        '👋': 2,
        '😅': 2,
        '🚌': 2,
        '👩‍👩‍👧': 2,
      },
    });

    // add rows with color
    p.addRows([
      // adding multiple rows are possible
      {
        Description: '👩‍👩‍👧',
        emoji: '😅',
      },
    ]);

    // print
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });
});
