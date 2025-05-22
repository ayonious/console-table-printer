import { renderTable, renderSimpleTable, printSimpleTable } from '../../src/internalTable/internal-table-printer';
import TableInternal from '../../src/internalTable/internal-table';

// Test renderTable function
describe('renderTable', () => {
  it('should render a table with headers and rows', () => {
    const table = new TableInternal(['col1', 'col2']);
    table.addRow({ col1: 'value1', col2: 'value2' });
    const rendered = renderTable(table);
    expect(rendered).toContain('col1');
    expect(rendered).toContain('value1');
  });
});

// Test renderSimpleTable function
describe('renderSimpleTable', () => {
  it('should render a simple table from rows', () => {
    const rows = [{ col1: 'value1', col2: 'value2' }];
    const rendered = renderSimpleTable(rows);
    expect(rendered).toContain('col1');
    expect(rendered).toContain('value1');
  });
});

// Test printSimpleTable function
describe('printSimpleTable', () => {
  it('should print a simple table to the console', () => {
    const rows = [{ col1: 'value1', col2: 'value2' }];
    console.log = jest.fn();
    printSimpleTable(rows);
    expect(console.log).toHaveBeenCalled();
  });
}); 