import { Table } from '../index';
import { getTableBody, getTableHeader } from './testUtils/getRawData';

describe('Testing defaultColumnOptions in Table', () => {
  it('should apply default styles to columns when not specified', () => {
    const defaultStyles = { alignment: 'center', color: 'blue', maxLen: 50 };
    const p = new Table({
      columns: [{ name: 'col1' }, { name: 'col2', alignment: 'left' }],
      defaultColumnOptions: defaultStyles,
    });

    p.addRow({ col1: 'value1', col2: 'value2' });
    const rendered = p.render();
    expect(rendered).toContain('value1');
    expect(rendered).toContain('value2');
    // Check if default styles are applied
    expect(p.table.columns[0].alignment).toBe('center');
    expect(p.table.columns[0].color).toBe('blue');
    expect(p.table.columns[0].maxLen).toBe(50);
    // Check if specified styles override defaults
    expect(p.table.columns[1].alignment).toBe('left');

    // print
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle empty defaultColumnOptions', () => {
    const p = new Table({
      columns: [{ name: 'col1' }, { name: 'col2' }],
      defaultColumnOptions: {},
    });

    p.addRow({ col1: 'value1', col2: 'value2' });
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle undefined defaultColumnOptions', () => {
    const p = new Table({
      columns: [{ name: 'col1' }, { name: 'col2' }],
    });

    p.addRow({ col1: 'value1', col2: 'value2' });
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle complex table with mixed column options', () => {
    const p = new Table({
      title: 'Sales Report',
      columns: [
        { name: 'id', maxLen: 5 }, // should use default alignment and color
        { name: 'product', alignment: 'left', maxLen: 30 }, // should override default alignment
        { name: 'quantity', color: 'green' }, // should override default color
        { name: 'price', alignment: 'right' }, // should override default alignment
        { name: 'status' }, // should use all defaults
      ],
      defaultColumnOptions: {
        alignment: 'center',
        color: 'blue',
        maxLen: 15,
        minLen: 8,
      },
    });

    // Add rows with various lengths and content
    p.addRow({
      id: 1,
      product: 'Super long product name that should be truncated',
      quantity: 5,
      price: 99.99,
      status: 'In Stock',
    });
    p.addRow({
      id: 2,
      product: 'Short name',
      quantity: 0,
      price: 149.99,
      status: 'Out of Stock',
    });

    p.printTable();
    expect(p.render()).toMatchSnapshot();

    // Verify column properties
    expect(p.table.columns[0].maxLen).toBe(5); // specified
    expect(p.table.columns[0].alignment).toBe('center'); // from default
    expect(p.table.columns[0].color).toBe('blue'); // from default

    expect(p.table.columns[1].maxLen).toBe(30); // specified
    expect(p.table.columns[1].alignment).toBe('left'); // specified
    expect(p.table.columns[1].color).toBe('blue'); // from default

    expect(p.table.columns[2].maxLen).toBe(15); // from default
    expect(p.table.columns[2].alignment).toBe('center'); // from default
    expect(p.table.columns[2].color).toBe('green'); // specified

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle defaultColumnOptions with computed columns', () => {
    const p = new Table({
      columns: [{ name: 'firstName' }, { name: 'lastName' }, { name: 'age' }],
      computedColumns: [
        {
          name: 'fullName',
          title: 'Full Name',
          function: (row) => `${row.firstName} ${row.lastName}`,
          alignment: 'center',
        },
        {
          name: 'ageGroup',
          function: (row) => (row.age < 30 ? 'Young' : 'Adult'),
          alignment: 'center',
        },
      ],
      defaultColumnOptions: {
        alignment: 'center',
        color: 'cyan',
        maxLen: 20,
      },
    });

    p.addRow({ firstName: 'John', lastName: 'Doe', age: 25 });
    p.addRow({ firstName: 'Jane', lastName: 'Smith', age: 35 });

    p.printTable();

    // Verify computed columns inherit default options
    const computedColumns = p.table.columns.slice(-2);
    computedColumns.forEach((col) => {
      // TODO: fix this test
      expect(col.color).toBe('cyan');
      expect(col.maxLen).toBe(20);
      expect(col.alignment).toBe('center');
    });
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle defaultColumnOptions with row separators and colors', () => {
    const p = new Table({
      columns: [{ name: 'task' }, { name: 'status' }, { name: 'priority' }],
      defaultColumnOptions: {
        alignment: 'center',
        color: 'white',
        maxLen: 15,
      },
      rowSeparator: true,
    });

    // Add rows with different colors that should not affect column colors
    p.addRow(
      { task: 'Task 1', status: 'Done', priority: 'High' },
      { color: 'green' }
    );
    p.addRow(
      { task: 'Task 2', status: 'Pending', priority: 'Medium' },
      { color: 'yellow' }
    );
    p.addRow(
      { task: 'Task 3', status: 'Failed', priority: 'Low' },
      { color: 'red' }
    );

    p.printTable();
    expect(p.render()).toMatchSnapshot();

    // Verify column colors remain as default despite row colors
    p.table.columns.forEach((col) => {
      expect(col.color).toBe('white');
    });
  });

  it('should handle extremely long content with defaultColumnOptions', () => {
    const p = new Table({
      columns: [{ name: 'id' }, { name: 'description' }, { name: 'tags' }],
      defaultColumnOptions: {
        alignment: 'left',
        maxLen: 20,
        minLen: 5,
      },
    });

    // Add rows with shorter content to keep output reasonable
    p.addRow({
      id: 1,
      description: 'A long description that will be truncated by maxLen',
      tags: 'tag1, tag2, tag3',
    });
    p.addRow({
      id: 2,
      description: 'Short desc',
      tags: 'tag1',
    });

    p.printTable();
    expect(p.render()).toMatchSnapshot();

    // Verify content handling

    const rendered = p.render();
    expect(rendered.length).toBeLessThan(1000);
    expect(rendered).toContain('Short desc');
    expect(rendered).toContain('tag1');
  });
});
