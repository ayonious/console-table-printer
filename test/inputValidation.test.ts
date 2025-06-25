import Table from '../src/console-table-printer';
import { ComputedColumn } from '../src/models/external-table';

describe('Input Validation Tests', () => {
  describe('Column Validation', () => {
    test('should throw error for invalid column alignment', () => {
      const table = new Table();
      expect(() =>
        table.addColumn({ name: 'test', alignment: 'invalid_alignment' as any })
      ).toThrow('Invalid alignment value. Must be one of: left, right, center');
    });

    test('should throw error for invalid column color', () => {
      const table = new Table();
      expect(() =>
        table.addColumn({ name: 'test', color: 'invalid_color' as any })
      ).toThrow('Invalid color value');
    });

    test('should throw error for negative maxLen', () => {
      const table = new Table();
      expect(() => table.addColumn({ name: 'test', maxLen: -5 })).toThrow(
        'maxLen must be a positive number'
      );
    });

    test('should throw error for negative minLen', () => {
      const table = new Table();
      expect(() => table.addColumn({ name: 'test', minLen: -5 })).toThrow(
        'minLen must be a positive number'
      );
    });

    test('should throw error for invalid computed column function', () => {
      const table = new Table();
      expect(() =>
        table.addColumn({
          name: 'test',
          function: 'not_a_function' as any,
        } as ComputedColumn)
      ).toThrow('Computed column function must be a function');
    });
  });

  describe('Columns Array Validation', () => {
    test('should throw error for non-array columns', () => {
      const table = new Table();
      expect(() => table.addColumns('not_an_array' as any)).toThrow(
        'Columns must be an array'
      );
    });

    test('should throw error for duplicate column names', () => {
      const table = new Table();
      expect(() => table.addColumns(['col1', 'col2', 'col1'])).toThrow(
        'Duplicate column name: col1'
      );

      expect(() =>
        table.addColumns([{ name: 'col1' }, { name: 'col2' }, { name: 'col1' }])
      ).toThrow('Duplicate column name: col1');
    });
  });

  describe('Row Data Validation', () => {
    test('should throw error for null row data', () => {
      const table = new Table(['col1', 'col2']);
      expect(() => table.addRow(null as any)).toThrow(
        'Row data must be a non-null object'
      );
    });

    test('should throw error for non-object row data', () => {
      const table = new Table(['col1', 'col2']);
      expect(() => table.addRow('not_an_object' as any)).toThrow(
        'Row data must be an object'
      );

      expect(() => table.addRow(123 as any)).toThrow(
        'Row data must be an object'
      );
    });
  });

  describe('Rows Array Validation', () => {
    test('should throw error for non-array rows', () => {
      const table = new Table(['col1', 'col2']);
      expect(() => table.addRows('not_an_array' as any)).toThrow(
        'Rows must be an array'
      );
    });

    test('should throw error if any row in the array is invalid', () => {
      const table = new Table(['col1', 'col2']);
      expect(() =>
        table.addRows([
          { col1: 'value1', col2: 'value2' },
          null as any,
          { col1: 'value3', col2: 'value4' },
        ])
      ).toThrow('Row data must be a non-null object');
    });
  });

  describe('Table Construction Validation', () => {
    test('should accept empty column names in constructor', () => {
      expect(() => new Table(['valid', ''])).not.toThrow();
    });

    test('should throw error for invalid rows in constructor options', () => {
      expect(
        () =>
          new Table({
            columns: [{ name: 'col1' }, { name: 'col2' }],
            rows: [{ col1: 'value1', col2: 'value2' }, null as any],
          })
      ).toThrow('Row data must be a non-null object');
    });

    test('should throw error for invalid columns in constructor options', () => {
      expect(
        () =>
          new Table({
            columns: [
              { name: 'col1' },
              { name: 'col2', alignment: 'invalid' as any },
            ],
          })
      ).toThrow('Invalid alignment value. Must be one of: left, right, center');
    });
  });

  describe('Valid Input Tests', () => {
    test('should accept valid column definitions', () => {
      const table = new Table();
      expect(() => table.addColumn('validColumn')).not.toThrow();
      expect(() => table.addColumn('')).not.toThrow();
      expect(() => table.addColumn({ name: 'validColumn2' })).not.toThrow();
      expect(() => table.addColumn({ name: '' })).not.toThrow();
      expect(() =>
        table.addColumn({
          name: 'computed',
          function: (row) => row.value * 2,
        } as ComputedColumn)
      ).not.toThrow();
    });

    test('should accept valid row data', () => {
      const table = new Table(['col1', 'col2']);
      expect(() =>
        table.addRow({ col1: 'value1', col2: 'value2' })
      ).not.toThrow();

      expect(() =>
        table.addRows([
          { col1: 'value1', col2: 'value2' },
          { col1: 'value3', col2: 'value4' },
        ])
      ).not.toThrow();
    });
  });
});
