import { Table } from '../index';

describe('Example: Print a simple Table with cell colors', () => {
  it('cell colors are working', () => {
    // Create a table
    const p = new Table();

    // add rows with color
    p.addRows([
      // adding multiple rows are possible
      {
        Description: 'Some alphabets 这里是中文这里是中文这里是中文',
        'Ticket No': 'ISSUE-1231',
      },
      {
        Description: 'Some Summary 这里是中文这里是中文',
        'Ticket No': 'ISSUE-22222',
      },
      {
        Description: 'Description 这里是中文',
        'Ticket No': 'ISSUE-Foreign',
      },
    ]);

    // print
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });
});
