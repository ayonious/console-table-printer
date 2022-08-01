import { renderTable } from '../../src/internalTable/internal-table-printer';
import { Table } from '../../index';

describe('Example: Check if borders are styled properly', () => {
  it('print a fat border table', () => {
    // Create a table
    const p = new Table({
      style: {
        /*
            Style:
            ╔══════╦═════╦══════╗
            ║ hob  ║ foo ║ mia  ║
            ╟══════╬═════╬══════╢
            ║ ball ║ fox ║ mama ║
            ╚══════╩═════╩══════╝
            */
        headerTop: {
          left: '╔',
          mid: '╦',
          right: '╗',
          other: '═',
        },
        headerBottom: {
          left: '╟',
          mid: '╬',
          right: '╢',
          other: '═',
        },
        tableBottom: {
          left: '╚',
          mid: '╩',
          right: '╝',
          other: '═',
        },
        vertical: '║',
      },
      columns: [
        { name: 'index', alignment: 'left' },
        { name: 'text', alignment: 'right' },
        { name: 'value' },
      ],
    });

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
    const returned = renderTable(p.table);
    expect(returned).toMatchSnapshot();
  });

  it('print a RED table', () => {
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
      columns: [
        { name: 'index', alignment: 'left' },
        { name: 'text', alignment: 'right' },
        { name: 'value' },
      ],
    });

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
    const returned = renderTable(p.table);
    expect(returned).toMatchSnapshot();
  });
});
