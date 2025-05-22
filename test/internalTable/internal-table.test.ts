import TableInternal from '../../src/internalTable/internal-table';
import { renderTable } from '../../src/internalTable/internal-table-printer';

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
});

// Test rendering
describe('TableInternal Rendering', () => {
  it('should render the table', () => {
    const table = new TableInternal(['col1']);
    table.addRow({ col1: 'value1' });
    const rendered = renderTable(table);
    expect(rendered).toContain('value1');
  });
}); 