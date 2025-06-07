import TableInternal from './internal-table';
import { renderTable } from './internal-table-printer';
import { ComputedColumn } from '../models/external-table';

// Test initialization of TableInternal

describe('TableInternal Initialization', () => {
  it('should initialize with simple options', () => {
    const table = new TableInternal(['col1', 'col2']);
    expect(table.columns.length).toBe(2);
    expect(table.columns[0].name).toBe('col1');
  });

  it('should initialize with detailed options', () => {
    const options = {
      title: 'Test Table',
      columns: [{ name: 'col1' }, { name: 'col2' }],
    };
    const table = new TableInternal(options);
    expect(table.title).toBe('Test Table');
    expect(table.columns.length).toBe(2);
  });

  it('should initialize with color disabled', () => {
    const options = {
      title: 'No Color Table',
      columns: [{ name: 'col1' }],
      shouldDisableColors: true,
    };
    const table = new TableInternal(options);
    expect(table.colorMap).toEqual({});
  });

  it('should initialize with custom color map', () => {
    const customColorMap = {
      customRed: '\x1b[31m',
      customBlue: '\x1b[34m',
    };
    const options = {
      title: 'Custom Color Table',
      columns: [{ name: 'col1' }],
      colorMap: customColorMap,
    };
    const table = new TableInternal(options);
    expect(table.colorMap).toMatchObject(customColorMap);
  });

  it('should initialize with rows in options', () => {
    const options = {
      columns: [{ name: 'name' }, { name: 'age' }],
      rows: [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
      ],
    };
    const table = new TableInternal(options);
    expect(table.rows.length).toBe(2);
    expect(table.rows[0].text.name).toBe('Alice');
    expect(table.rows[1].text.age).toBe(25);
  });

  it('should initialize with undefined options', () => {
    const table = new TableInternal();
    expect(table.columns.length).toBe(0);
    expect(table.rows.length).toBe(0);
    expect(table.title).toBeUndefined();
  });
});

// Test adding columns and rows
describe('TableInternal Additions', () => {
  it('should add columns and rows', () => {
    const table = new TableInternal();
    table.addColumn('col1');
    table.addRow({ col1: 'value1' });
    expect(table.columns.length).toBe(1);
    expect(table.rows.length).toBe(1);
  });

  it('should add string column', () => {
    const table = new TableInternal();
    table.addColumn('stringColumn');
    expect(table.columns.length).toBe(1);
    expect(table.columns[0].name).toBe('stringColumn');
    expect(table.columns[0].title).toBe('stringColumn');
  });

  it('should add computed column', () => {
    const table = new TableInternal();
    const computedColumn: ComputedColumn = {
      name: 'computed',
      title: 'Computed Value',
      function: (row: any) => row.a + row.b,
    };
    table.addColumn(computedColumn);
    expect(table.columns.length).toBe(1);
    expect(table.columns[0].name).toBe('computed');
    expect(table.columns[0].title).toBe('Computed Value');
  });

  it('should add raw column options', () => {
    const table = new TableInternal();
    const rawColumn = {
      name: 'rawCol',
      title: 'Raw Column',
      alignment: 'center' as const,
      color: 'red' as const,
    };
    table.addColumn(rawColumn);
    expect(table.columns.length).toBe(1);
    expect(table.columns[0].name).toBe('rawCol');
    expect(table.columns[0].title).toBe('Raw Column');
  });

  it('should add multiple columns at once', () => {
    const table = new TableInternal();
    const columns = ['col1', 'col2', 'col3'];
    table.addColumns(columns);
    expect(table.columns.length).toBe(3);
    expect(table.columns[0].name).toBe('col1');
    expect(table.columns[2].name).toBe('col3');
  });

  it('should add multiple raw column options at once', () => {
    const table = new TableInternal();
    const columns = [
      { name: 'name', title: 'Full Name' },
      { name: 'age', title: 'Age' },
    ];
    table.addColumns(columns);
    expect(table.columns.length).toBe(2);
    expect(table.columns[0].title).toBe('Full Name');
    expect(table.columns[1].title).toBe('Age');
  });

  it('should create columns from row data', () => {
    const table = new TableInternal();
    // Start with no columns
    expect(table.columns.length).toBe(0);

    // Add row with new columns
    table.addRow({ newCol1: 'value1', newCol2: 'value2' });
    expect(table.columns.length).toBe(2);
    expect(table.columns.find((col) => col.name === 'newCol1')).toBeDefined();
    expect(table.columns.find((col) => col.name === 'newCol2')).toBeDefined();
  });

  it('should not duplicate columns when adding row with existing column names', () => {
    const table = new TableInternal(['existingCol']);
    expect(table.columns.length).toBe(1);

    // Add row with mix of existing and new columns
    table.addRow({ existingCol: 'value1', newCol: 'value2' });
    expect(table.columns.length).toBe(2); // Should only add 1 new column
    expect(
      table.columns.find((col) => col.name === 'existingCol')
    ).toBeDefined();
    expect(table.columns.find((col) => col.name === 'newCol')).toBeDefined();
  });

  it('should add rows with options', () => {
    const table = new TableInternal(['name', 'status']);
    const rowsData = [
      { name: 'Alice', status: 'Active' },
      { name: 'Bob', status: 'Inactive' },
    ];
    const options = { color: 'blue' as const, separator: true };

    table.addRows(rowsData, options);
    expect(table.rows.length).toBe(2);
    expect(table.rows[0].color).toBe('blue');
    expect(table.rows[0].separator).toBe(true);
    expect(table.rows[1].color).toBe('blue');
    expect(table.rows[1].separator).toBe(true);
  });

  it('should add rows without options', () => {
    const table = new TableInternal(['id', 'value']);
    const rowsData = [
      { id: 1, value: 'first' },
      { id: 2, value: 'second' },
    ];

    table.addRows(rowsData);
    expect(table.rows.length).toBe(2);
    expect(table.rows[0].text.id).toBe(1);
    expect(table.rows[1].text.value).toBe('second');
  });
});

// Test rendering
describe('TableInternal Rendering', () => {
  it('should render the table', () => {
    const table = new TableInternal(['col1']);
    table.addRow({ col1: 'value1' });
    const rendered = renderTable(table);
    expect(rendered).toContain('value1');
  });

  it('should use renderTable method', () => {
    const table = new TableInternal(['test']);
    table.addRow({ test: 'data' });
    const rendered = table.renderTable();
    expect(rendered).toContain('test');
    expect(rendered).toContain('data');
    expect(typeof rendered).toBe('string');
  });
});

// Test edge cases and error conditions
describe('TableInternal Edge Cases', () => {
  it('should handle empty table rendering', () => {
    const table = new TableInternal();
    const rendered = table.renderTable();
    expect(typeof rendered).toBe('string');
  });

  it('should handle table with columns but no rows', () => {
    const table = new TableInternal(['col1', 'col2']);
    const rendered = table.renderTable();
    expect(rendered).toContain('col1');
    expect(rendered).toContain('col2');
  });

  it('should handle rows with partial data', () => {
    const table = new TableInternal(['col1', 'col2', 'col3']);
    table.addRow({ col1: 'value1' }); // Missing col2 and col3
    table.addRow({ col2: 'value2', col3: 'value3' }); // Missing col1
    expect(table.rows.length).toBe(2);
    const rendered = table.renderTable();
    expect(rendered).toContain('value1');
    expect(rendered).toContain('value2');
  });
});
