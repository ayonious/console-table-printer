import { renderTable } from '../../src/internalTable/internal-table-printer';
import { Table } from '../../index';

describe('Border Style Tests', () => {
  it('should render table with custom fat borders', () => {
    const p = new Table({
      style: {
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

    p.addRows([
      { index: 1, text: 'First row', value: 10.212 },
      { index: 2, text: 'Second row', value: 20.0 },
      { index: 3, text: 'Third row', value: 100 },
    ]);

    const returned = renderTable(p.table);
    expect(returned).toMatchSnapshot();
    console.log(returned);
  });

  it('should render table with double-line borders', () => {
    const p = new Table({
      style: {
        headerTop: {
          left: '╒',
          mid: '╤',
          right: '╕',
          other: '═',
        },
        headerBottom: {
          left: '╞',
          mid: '╪',
          right: '╡',
          other: '═',
        },
        tableBottom: {
          left: '╘',
          mid: '╧',
          right: '╛',
          other: '═',
        },
        vertical: '│',
      },
      columns: [
        { name: 'id', alignment: 'center' },
        { name: 'description', alignment: 'left' },
        { name: 'status', alignment: 'right' },
      ],
    });

    p.addRows([
      { id: 'A1', description: 'First item', status: 'Active' },
      { id: 'B2', description: 'Second item', status: 'Pending' },
      { id: 'C3', description: 'Third item', status: 'Inactive' },
    ]);

    const returned = renderTable(p.table);
    expect(returned).toMatchSnapshot();
    console.log(returned);
  });

  it('should render table with colored borders', () => {
    const p = new Table({
      style: {
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
        { name: 'name', alignment: 'left' },
        { name: 'score', alignment: 'right' },
        { name: 'grade', alignment: 'center' },
      ],
    });

    p.addRows([
      { name: 'John', score: 95, grade: 'A' },
      { name: 'Jane', score: 88, grade: 'B' },
      { name: 'Bob', score: 75, grade: 'C' },
    ]);

    const returned = renderTable(p.table);
    expect(returned).toMatchSnapshot();
    console.log(returned);
  });

  it('should render table with ASCII borders', () => {
    const p = new Table({
      style: {
        headerTop: {
          left: '+',
          mid: '+',
          right: '+',
          other: '-',
        },
        headerBottom: {
          left: '+',
          mid: '+',
          right: '+',
          other: '-',
        },
        tableBottom: {
          left: '+',
          mid: '+',
          right: '+',
          other: '-',
        },
        vertical: '|',
      },
      columns: [
        { name: 'item', alignment: 'left' },
        { name: 'quantity', alignment: 'right' },
        { name: 'price', alignment: 'right' },
      ],
    });

    p.addRows([
      { item: 'Apple', quantity: 5, price: 0.5 },
      { item: 'Banana', quantity: 3, price: 0.3 },
      { item: 'Orange', quantity: 4, price: 0.6 },
    ]);

    const returned = renderTable(p.table);
    expect(returned).toMatchSnapshot();
    console.log(returned);
  });

  it('should render table with minimal borders', () => {
    const p = new Table({
      style: {
        headerTop: {
          left: '',
          mid: '',
          right: '',
          other: '─',
        },
        headerBottom: {
          left: '',
          mid: '',
          right: '',
          other: '─',
        },
        tableBottom: {
          left: '',
          mid: '',
          right: '',
          other: '─',
        },
        vertical: ' ',
      },
      columns: [
        { name: 'date', alignment: 'left' },
        { name: 'event', alignment: 'left' },
        { name: 'location', alignment: 'right' },
      ],
    });

    p.addRows([
      { date: '2024-01-01', event: 'New Year', location: 'New York' },
      { date: '2024-02-14', event: 'Valentine', location: 'Paris' },
      { date: '2024-03-17', event: 'St. Patrick', location: 'Dublin' },
    ]);

    const returned = renderTable(p.table);
    expect(returned).toMatchSnapshot();
    console.log(returned);
  });
});
