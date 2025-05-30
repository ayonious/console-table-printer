import { Table } from '../../..';
import { getTableBody, getTableHeader } from '../../testUtils/getRawData';

describe('README Example 3: Advanced Features', () => {
  test('should demonstrate advanced table features', () => {
    const advancedTable = new Table({
      title: 'TITLE_DEMONSTRATION',
      columns: [
        { name: 'feature', title: 'FEATURE', alignment: 'left', color: 'cyan' },
        { name: 'value', title: 'VALUE', alignment: 'center', maxLen: 20 },
        { name: 'notes', title: 'NOTES', alignment: 'right' },
      ],
    });

    advancedTable.addRows([
      { 
        feature: 'COLUMN_COLOR', 
        value: 'Cyan Column', 
        notes: 'This column is always cyan' 
      },
      { 
        feature: 'MAX_LENGTH', 
        value: 'This text will be truncated because maxLen is set to 20 characters', 
        notes: 'Prevents long text overflow' 
      },
      { 
        feature: 'MIXED_CONTENT',
        value: '12345',
        notes: 'Numbers and text mixed'
      },
      { 
        feature: 'CUSTOM_STYLE',
        value: 'Special Format',
        notes: 'Using multiple features'
      },
    ], { color: 'magenta' });

    advancedTable.printTable();
  });

  test('should make sure each column is what its expected to be', () => {
    const advancedTable = new Table({
      shouldDisableColors: true,
      title: 'TITLE_DEMONSTRATION',
      columns: [
        { name: 'feature', title: 'FEATURE', alignment: 'left', color: 'cyan' },
        { name: 'value', title: 'VALUE', alignment: 'center', maxLen: 20 },
        { name: 'notes', title: 'NOTES', alignment: 'right' },
      ],
    });

    advancedTable.addRows([
      { 
        feature: 'COLUMN_COLOR', 
        value: 'Cyan Column', 
        notes: 'This column is always cyan' 
      },
      { 
        feature: 'MAX_LENGTH', 
        value: 'This text will be truncated because maxLen is set to 20 characters', 
        notes: 'Prevents long text overflow' 
      },
      { 
        feature: 'MIXED_CONTENT',
        value: '12345',
        notes: 'Numbers and text mixed'
      },
      { 
        feature: 'CUSTOM_STYLE',
        value: 'Special Format',
        notes: 'Using multiple features'
      },
    ], { color: 'magenta' });

    const [renderedHeader, renderedBody] = [getTableHeader(advancedTable), getTableBody(advancedTable)];
    expect(renderedHeader).toEqual('│ FEATURE       │        VALUE         │                       NOTES │');
    expect(renderedBody).toEqual([
      '│ COLUMN_COLOR  │     Cyan Column      │  This column is always cyan │',
      '│ MAX_LENGTH    │  This text will be   │ Prevents long text overflow │',
      '│               │  truncated because   │                             │',
      '│               │ maxLen is set to 20  │                             │',
      '│               │      characters      │                             │',
      '│ MIXED_CONTENT │        12345         │      Numbers and text mixed │',
      '│ CUSTOM_STYLE  │    Special Format    │     Using multiple features │'
    ]);
  });
}); 