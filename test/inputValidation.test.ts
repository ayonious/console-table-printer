import Table from '../src/console-table-printer';
import { TableInputError } from '../src/utils/input-validators';
import { ComputedColumn } from '../src/models/external-table';

describe('Input Validation Tests', () => {
  describe('Column Validation', () => {
    test('should throw error for empty column name', () => {
      const table = new Table();
      expect(() => table.addColumn('')).toThrow(TableInputError);
      expect(() => table.addColumn('   ')).toThrow(TableInputError);
    });

    test('should throw error for invalid column alignment', () => {
      const table = new Table();
      expect(() => 
        table.addColumn({ name: 'test', alignment: 'invalid_alignment' as any })
      ).toThrow(TableInputError);
    });

    test('should throw error for invalid column color', () => {
      const table = new Table();
      expect(() => 
        table.addColumn({ name: 'test', color: 'invalid_color' as any })
      ).toThrow(TableInputError);
    });

    test('should throw error for negative maxLen', () => {
      const table = new Table();
      expect(() => 
        table.addColumn({ name: 'test', maxLen: -5 })
      ).toThrow(TableInputError);
    });

    test('should throw error for negative minLen', () => {
      const table = new Table();
      expect(() => 
        table.addColumn({ name: 'test', minLen: -5 })
      ).toThrow(TableInputError);
    });

    test('should throw error for invalid computed column function', () => {
      const table = new Table();
      expect(() => 
        table.addColumn({ 
          name: 'test', 
          function: 'not_a_function' as any 
        } as ComputedColumn)
      ).toThrow(TableInputError);
    });
  });

  describe('Columns Array Validation', () => {
    test('should throw error for non-array columns', () => {
      const table = new Table();
      expect(() => 
        table.addColumns('not_an_array' as any)
      ).toThrow(TableInputError);
    });

    test('should throw error for duplicate column names', () => {
      const table = new Table();
      expect(() => 
        table.addColumns(['col1', 'col2', 'col1'])
      ).toThrow(TableInputError);
      
      expect(() => 
        table.addColumns([
          { name: 'col1' }, 
          { name: 'col2' }, 
          { name: 'col1' }
        ])
      ).toThrow(TableInputError);
    });
  });

  describe('Row Data Validation', () => {
    test('should throw error for null row data', () => {
      const table = new Table(['col1', 'col2']);
      expect(() => 
        table.addRow(null as any)
      ).toThrow(TableInputError);
    });

    test('should throw error for non-object row data', () => {
      const table = new Table(['col1', 'col2']);
      expect(() => 
        table.addRow('not_an_object' as any)
      ).toThrow(TableInputError);
      
      expect(() => 
        table.addRow(123 as any)
      ).toThrow(TableInputError);
    });
  });

  describe('Rows Array Validation', () => {
    test('should throw error for non-array rows', () => {
      const table = new Table(['col1', 'col2']);
      expect(() => 
        table.addRows('not_an_array' as any)
      ).toThrow(TableInputError);
    });

    test('should throw error if any row in the array is invalid', () => {
      const table = new Table(['col1', 'col2']);
      expect(() => 
        table.addRows([
          { col1: 'value1', col2: 'value2' },
          null as any,
          { col1: 'value3', col2: 'value4' }
        ])
      ).toThrow(TableInputError);
    });
  });

  describe('Table Construction Validation', () => {
    test('should throw error for invalid columns in constructor', () => {
      expect(() => 
        new Table(['valid', ''])
      ).toThrow(TableInputError);
    });

    test('should throw error for invalid rows in constructor options', () => {
      expect(() => 
        new Table({
          columns: [{ name: 'col1' }, { name: 'col2' }],
          rows: [
            { col1: 'value1', col2: 'value2' },
            null as any
          ]
        })
      ).toThrow(TableInputError);
    });

    test('should throw error for invalid columns in constructor options', () => {
      expect(() => 
        new Table({
          columns: [
            { name: 'col1' },
            { name: 'col2', alignment: 'invalid' as any }
          ]
        })
      ).toThrow(TableInputError);
    });
  });

  describe('Valid Input Tests', () => {
    test('should accept valid column definitions', () => {
      const table = new Table();
      expect(() => table.addColumn('validColumn')).not.toThrow();
      expect(() => table.addColumn({ name: 'validColumn2' })).not.toThrow();
      expect(() => 
        table.addColumn({ 
          name: 'computed', 
          function: (row) => row.value * 2 
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
          { col1: 'value3', col2: 'value4' }
        ])
      ).not.toThrow();
    });
  });
}); 