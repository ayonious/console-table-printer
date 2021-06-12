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
        rowSeparator: {
          left: '╟',
          mid: '╬',
          right: '╢',
          other: '═',
        },
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

    const expected = [
      '╔═══════╦═══════════════════════════════════════╦════════╗',
      '\u001b[37m║\u001b[0m\u001b[37m \u001b[0m\u001b[01mindex\u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[01m                                 text\u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[01m value\u001b[0m\u001b[37m ║\u001b[0m',
      '╟═══════╬═══════════════════════════════════════╬════════╢',
      '\u001b[37m║\u001b[0m\u001b[37m \u001b[0m\u001b[31m1    \u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[31m    I would like some red wine please\u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[31m10.212\u001b[0m\u001b[37m ║\u001b[0m',
      '\u001b[37m║\u001b[0m\u001b[37m \u001b[0m\u001b[32m2    \u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[32mI would like some green gemuse please\u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[32m    20\u001b[0m\u001b[37m ║\u001b[0m',
      '\u001b[37m║\u001b[0m\u001b[37m \u001b[0m\u001b[33m3    \u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[33m I would like some gelb bananen bitte\u001b[0m\u001b[37m ║\u001b[0m\u001b[37m \u001b[0m\u001b[33m   100\u001b[0m\u001b[37m ║\u001b[0m',
      '╚═══════╩═══════════════════════════════════════╩════════╝',
    ];
    expect(returned).toBe(expected.join('\n'));
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
        rowSeparator: {
          left: '\x1b[31m╟\x1b[0m',
          mid: '\x1b[31m╬\x1b[0m',
          right: '\x1b[31m╢\x1b[0m',
          other: '\x1b[31m═\x1b[0m',
        },
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

    const expected = [
      '\u001b[31m╔\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m╦\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m╦\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m╗\u001b[0m',
      '\u001b[37m\u001b[31m║\u001b[0m\u001b[0m\u001b[37m \u001b[0m\u001b[01mindex\u001b[0m\u001b[37m \u001b[31m║\u001b[0m\u001b[0m\u001b[37m \u001b[0m\u001b[01m                                 text\u001b[0m\u001b[37m \u001b[31m║\u001b[0m\u001b[0m\u001b[37m \u001b[0m\u001b[01m value\u001b[0m\u001b[37m \u001b[31m║\u001b[0m\u001b[0m',
      '\u001b[31m╟\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m╬\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m╬\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m╢\u001b[0m',
      '\u001b[37m\u001b[31m║\u001b[0m\u001b[0m\u001b[37m \u001b[0m\u001b[31m1    \u001b[0m\u001b[37m \u001b[31m║\u001b[0m\u001b[0m\u001b[37m \u001b[0m\u001b[31m    I would like some red wine please\u001b[0m\u001b[37m \u001b[31m║\u001b[0m\u001b[0m\u001b[37m \u001b[0m\u001b[31m10.212\u001b[0m\u001b[37m \u001b[31m║\u001b[0m\u001b[0m',
      '\u001b[37m\u001b[31m║\u001b[0m\u001b[0m\u001b[37m \u001b[0m\u001b[32m2    \u001b[0m\u001b[37m \u001b[31m║\u001b[0m\u001b[0m\u001b[37m \u001b[0m\u001b[32mI would like some green gemuse please\u001b[0m\u001b[37m \u001b[31m║\u001b[0m\u001b[0m\u001b[37m \u001b[0m\u001b[32m    20\u001b[0m\u001b[37m \u001b[31m║\u001b[0m\u001b[0m',
      '\u001b[37m\u001b[31m║\u001b[0m\u001b[0m\u001b[37m \u001b[0m\u001b[33m3    \u001b[0m\u001b[37m \u001b[31m║\u001b[0m\u001b[0m\u001b[37m \u001b[0m\u001b[33m I would like some gelb bananen bitte\u001b[0m\u001b[37m \u001b[31m║\u001b[0m\u001b[0m\u001b[37m \u001b[0m\u001b[33m   100\u001b[0m\u001b[37m \u001b[31m║\u001b[0m\u001b[0m',
      '\u001b[31m╚\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m╩\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m╩\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m═\u001b[0m\u001b[31m╝\u001b[0m',
    ];
    expect(returned).toBe(expected.join('\n'));
  });
});
