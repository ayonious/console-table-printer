import { printTable, Table } from '../../..';
import { getTableBody, getTableHeader } from '../../testUtils/getRawData';

describe('README Example 1: Basic Features', () => {
  test('should demonstrate basic table features', () => {
    const tableFeatures = [
      { id: 1, name: 'DEFAULT_ALIGN', description: 'Text aligns left' },
      { id: 2, name: 'TRUNCATED_TEXT', description: 'Long text gets truncated' },
      { id: 3, name: 'NUMBER_ALIGN', amount: 1234.56, note: 'Numbers align right' },
      { id: 4, name: 'EMPTY_CELL', amount: null, note: 'Empty shows blank' },
    ];

    printTable(tableFeatures);
  });

  test('should make sure each column is what its expected to be', () => {
    const tableFeatures = [
      { id: 1, name: 'DEFAULT_ALIGN', description: 'Text aligns left' },
      { id: 2, name: 'TRUNCATED_TEXT', description: 'Long text gets truncated' },
      { id: 3, name: 'NUMBER_ALIGN', amount: 1234.56, note: 'Numbers align right' },
      { id: 4, name: 'EMPTY_CELL', amount: null, note: 'Empty shows blank' },
    ];

    const table = new Table({
      shouldDisableColors: true
    });
    table.addRows(tableFeatures);
    
    const [renderedHeader, renderedBody] = [getTableHeader(table), getTableBody(table)];
    expect(renderedHeader).toEqual('│ id │           name │              description │  amount │                note │');
    expect(renderedBody).toEqual([
      '│  1 │  DEFAULT_ALIGN │         Text aligns left │         │                     │',
      '│  2 │ TRUNCATED_TEXT │ Long text gets truncated │         │                     │',
      '│  3 │   NUMBER_ALIGN │                          │ 1234.56 │ Numbers align right │',
      '│  4 │     EMPTY_CELL │                          │         │   Empty shows blank │'
    ]);
  });
}); 