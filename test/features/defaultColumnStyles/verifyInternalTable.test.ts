import { Table } from '../../../index';
import { getTableBody, getTableHeader } from '../../testUtils/getRawData';

describe('Default Column Styles: Basic Tests', () => {
  it('should apply default styles to columns when not specified', () => {
    const defaultStyles = { alignment: 'center', color: 'blue', maxLen: 50 };
    const p = new Table({
      columns: [{ name: 'col1' }, { name: 'col2', alignment: 'left' }],
      defaultColumnOptions: defaultStyles,
    });

    p.addRow({ col1: 'value1', col2: 'value2' });

    // Verify column properties
    expect(p.table.columns[0].alignment).toBe('center');
    expect(p.table.columns[0].color).toBe('blue');
    expect(p.table.columns[0].maxLen).toBe(50);
    expect(p.table.columns[1].alignment).toBe('left');
  });

  it('should handle empty defaultColumnOptions', () => {
    const p = new Table({
      columns: [{ name: 'col1' }, { name: 'col2' }],
      defaultColumnOptions: {},
    });

    p.addRow({ col1: 'value1', col2: 'value2' });

    // Verify default values are used
    expect(p.table.columns[0].alignment).toBe('right'); // default alignment
    expect(p.table.columns[0].color).toBeUndefined();
    expect(p.table.columns[0].maxLen).toBeUndefined();
  });

  it('should handle undefined defaultColumnOptions', () => {
    const p = new Table({
      columns: [{ name: 'col1' }, { name: 'col2' }],
    });

    p.addRow({ col1: 'value1', col2: 'value2' });

    // Verify default values are used
    expect(p.table.columns[0].alignment).toBe('right'); // default alignment
    expect(p.table.columns[0].color).toBeUndefined();
    expect(p.table.columns[0].maxLen).toBeUndefined();
  });

  it('should handle complex table with mixed column options', () => {
    const p = new Table({
      columns: [
        { name: 'id', maxLen: 5 },
        { name: 'product', alignment: 'left', maxLen: 30 },
        { name: 'quantity', color: 'green' },
        { name: 'price', alignment: 'right' },
        { name: 'status' },
      ],
      defaultColumnOptions: {
        alignment: 'center',
        color: 'blue',
        maxLen: 15,
        minLen: 8,
      },
    });

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

    // Verify computed columns inherit default options
    const computedColumns = p.table.columns.slice(-2);
    computedColumns.forEach((col) => {
      expect(col.color).toBe('cyan');
      expect(col.maxLen).toBe(20);
      expect(col.alignment).toBe('center');
    });
  });

  it('should handle defaultColumnOptions when columns are not specified', () => {
    const p = new Table({
      defaultColumnOptions: {
        alignment: 'center',
        color: 'red',
        maxLen: 25,
        minLen: 17,
      },
    });

    p.addRow({ firstName: 'John', lastName: 'Doe', age: 25 });
    p.addRow({ firstName: 'John', lastName: 'Smith', age: 23 });

    // Verify computed columns inherit default options
    const columns = p.table.columns;
    columns.forEach((col) => {
      expect(col.color).toBe('red');
      expect(col.maxLen).toBe(25);
      expect(col.minLen).toBe(17);
      expect(col.alignment).toBe('center');
    });

    p.printTable();
  });
});
