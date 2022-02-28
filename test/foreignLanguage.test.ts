import { Table } from '../index';

describe('Example: Print a simple Table with cell colors', () => {
  it('foreign alphabets are working', () => {
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

  it('coloring is working', () => {
    // Create a table
    const p = new Table();

    p.addRow(
      {
        'Ticket No': 'ISSUE-1231',
        Description: 'Some alphabets 这里是中文这里是中文这里是中文',
      },
      { color: 'blue' }
    );

    p.addRow(
      {
        'Ticket No': 'ISSUE-22222',
        Description: 'Some Summary 这里是中文这里是中文',
      },
      { color: 'red' }
    );

    p.addRow(
      {
        'Ticket No': 'ISSUE-1',
        Description: 'Description 这里是中文',
      },
      { color: 'white_bold' }
    );
    // print
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('customized border is working', () => {
    // Create a table
    const p = new Table({
      style: {
        /*
            Style: (red)
            ╔══════╦═════╦══════╗
            ║ hob  ║ foo ║ mia  ║
            ╟══════╬═════╬══════╢
            ║ ball ║ fox ║ mama ║
            ╚══════╩═════╩══════╝
            */
        headerTop: {
          left: '\x1b[31m╔\x1b[0m',
          mid: '\x1b[31m╦\x1b[0m',
          right: '\x1b[31m╗\x1b[0m',
          other: '\x1b[31m═\x1b[0m',
        },
        headerBottom: {
          left: '\x1b[31m╟\x1b[0m',
          mid: '\x1b[31m╬\x1b[0m',
          right: '\x1b[31m╢\x1b[0m',
          other: '\x1b[31m═\x1b[0m',
        },
        tableBottom: {
          left: '\x1b[31m╚\x1b[0m',
          mid: '\x1b[31m╩\x1b[0m',
          right: '\x1b[31m╝\x1b[0m',
          other: '\x1b[31m═\x1b[0m',
        },
        vertical: '\x1b[31m║\x1b[0m',
      },
    });

    p.addRow(
      {
        'Ticket No': 'ISSUE-1231',
        Description: 'Some alphabets 这里是中文这里是中文这里是中文',
      },
      { color: 'blue' }
    );

    p.addRow(
      {
        'Ticket No': 'ISSUE-22222',
        Description: 'Some Summary 这里是中文这里是中文',
      },
      { color: 'red' }
    );

    p.addRow(
      {
        'Ticket No': 'ISSUE-1',
        Description: 'Description 这里是中文',
      },
      { color: 'white_bold' }
    );
    // print
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });
});
