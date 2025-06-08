import { Table } from '../../../index';
import { getTableBody, getTableHeader } from '../../testUtils/getRawData';

describe('Default Column Styles: Verification Tests', () => {
  it('should verify all available color options', () => {
    const colors = [
      'red',
      'green',
      'yellow',
      'blue',
      'magenta',
      'cyan',
      'white',
    ];

    colors.forEach((color) => {
      const p = new Table({
        columns: [{ name: 'col1' }, { name: 'col2' }],
        defaultColumnOptions: { color },
      });

      p.addRow({ col1: 'test', col2: 'test' });

      p.table.columns.forEach((col) => {
        expect(col.color).toBe(color);
      });
    });
  });

  it('should verify all alignment options', () => {
    const alignments = ['left', 'right', 'center'];

    alignments.forEach((alignment) => {
      const p = new Table({
        columns: [{ name: 'col1' }, { name: 'col2' }],
        defaultColumnOptions: { alignment },
      });

      p.addRow({ col1: 'test', col2: 'test' });

      p.table.columns.forEach((col) => {
        expect(col.alignment).toBe(alignment);
      });
    });
  });

  it('should verify minLen and maxLen constraints', () => {
    const p = new Table({
      columns: [{ name: 'col1' }, { name: 'col2' }],
      defaultColumnOptions: {
        minLen: 10,
        maxLen: 20,
      },
    });

    p.addRows([
      { col1: 'short', col2: 'this is a very long text that exceeds maxLen' },
      { col1: 'a', col2: 'b' },
    ]);

    p.table.columns.forEach((col) => {
      expect(col.minLen).toBe(10);
      expect(col.maxLen).toBe(20);
    });

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    const bodyLines = renderedBody.join('\\n');

    // Check minLen enforcement
    expect(bodyLines).not.toMatch(/│\s{0,9}[a-z]│/); // No content less than minLen

    // Check maxLen enforcement
    expect(bodyLines).not.toMatch(/[a-z]{21,}│/); // No content exceeds maxLen
  });

  it('should verify color inheritance in nested structures', () => {
    const p = new Table({
      columns: [
        { name: 'main' },
        { name: 'sub', color: 'red' }, // Should override default
        { name: 'detail' },
      ],
      defaultColumnOptions: {
        color: 'blue',
      },
      computedColumns: [
        {
          name: 'computed1',
          function: () => 'test',
          color: 'red', // Override default
        },
        {
          name: 'computed2',
          function: () => 'test',
          color: 'blue', // Uses default
        },
      ],
    });

    p.addRow({ main: 'test', sub: 'test', detail: 'test' });

    // Check main columns
    expect(p.table.columns[0].color).toBe('blue'); // Uses default
    expect(p.table.columns[1].color).toBe('red'); // Overridden
    expect(p.table.columns[2].color).toBe('blue'); // Uses default

    // Check computed columns
    const computedColumns = p.table.columns.slice(-2);
    expect(computedColumns[0].color).toBe('red'); // Overridden
    expect(computedColumns[1].color).toBe('blue'); // Uses default
  });

  it('should verify style application with dynamic column addition', () => {
    const p = new Table({
      defaultColumnOptions: {
        alignment: 'center',
        color: 'cyan',
        maxLen: 15,
      },
      columns: [
        { name: 'col1' },
        { name: 'col2', color: 'red' },
        { name: 'col3' },
      ],
    });

    // Add rows to initialize columns
    p.addRow({ col1: 'test', col2: 'test', col3: 'test' });

    // Verify default styles are applied to columns
    expect(p.table.columns[0].alignment).toBe('center');
    expect(p.table.columns[0].color).toBe('cyan');
    expect(p.table.columns[0].maxLen).toBe(15);

    // Verify override works for columns
    expect(p.table.columns[1].color).toBe('red');
    expect(p.table.columns[1].alignment).toBe('center');

    // Verify defaults are applied to subsequent columns
    expect(p.table.columns[2].alignment).toBe('center');
    expect(p.table.columns[2].color).toBe('cyan');
  });
});
