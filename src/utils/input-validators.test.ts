import { 
  validateColumn, 
  validateColumns, 
  validateRowData, 
  validateRows, 
  validateColor,
  TableInputError 
} from './input-validators';
import { ALIGNMENTS, COLORS } from './table-constants';
import { ComputedColumn } from '../models/external-table';

describe('Input Validators', () => {
  describe('validateColumn', () => {
    it('should accept valid string column name', () => {
      expect(() => validateColumn('validColumn')).not.toThrow();
    });

    it('should throw for empty string column name', () => {
      expect(() => validateColumn('')).toThrow(TableInputError);
      expect(() => validateColumn('   ')).toThrow(TableInputError);
    });

    it('should throw for null or undefined column', () => {
      expect(() => validateColumn(null as any)).toThrow(TableInputError);
      expect(() => validateColumn(undefined as any)).toThrow(TableInputError);
    });

    it('should throw for empty column name in object', () => {
      expect(() => validateColumn({ name: '' })).toThrow(TableInputError);
      expect(() => validateColumn({ name: '   ' })).toThrow(TableInputError);
    });

    it('should throw for invalid alignment', () => {
      expect(() => 
        validateColumn({ name: 'test', alignment: 'invalid_alignment' as any })
      ).toThrow(TableInputError);
      expect(() => 
        validateColumn({ name: 'test', alignment: 'invalid_alignment' as any })
      ).toThrow(/Invalid alignment/);
    });

    it('should accept valid alignment', () => {
      ALIGNMENTS.forEach(alignment => {
        expect(() => 
          validateColumn({ name: 'test', alignment })
        ).not.toThrow();
      });
    });

    it('should throw for invalid color', () => {
      expect(() => 
        validateColumn({ name: 'test', color: 'invalid_color' as any })
      ).toThrow(TableInputError);
      expect(() => 
        validateColumn({ name: 'test', color: 'invalid_color' as any })
      ).toThrow(/Invalid color/);
    });

    it('should accept valid color', () => {
      COLORS.forEach(color => {
        expect(() => 
          validateColumn({ name: 'test', color })
        ).not.toThrow();
      });
    });

    it('should throw for negative maxLen', () => {
      expect(() => 
        validateColumn({ name: 'test', maxLen: -5 })
      ).toThrow(TableInputError);
      expect(() => 
        validateColumn({ name: 'test', maxLen: -5 })
      ).toThrow(/maxLen must be a non-negative number/);
    });

    it('should throw for non-numeric maxLen', () => {
      expect(() => 
        validateColumn({ name: 'test', maxLen: 'not-a-number' as any })
      ).toThrow(TableInputError);
    });

    it('should throw for negative minLen', () => {
      expect(() => 
        validateColumn({ name: 'test', minLen: -5 })
      ).toThrow(TableInputError);
      expect(() => 
        validateColumn({ name: 'test', minLen: -5 })
      ).toThrow(/minLen must be a non-negative number/);
    });

    it('should throw for non-numeric minLen', () => {
      expect(() => 
        validateColumn({ name: 'test', minLen: 'not-a-number' as any })
      ).toThrow(TableInputError);
    });

    it('should throw for invalid computed column function', () => {
      expect(() => 
        validateColumn({ 
          name: 'test', 
          function: 'not_a_function' as any 
        } as ComputedColumn)
      ).toThrow(TableInputError);
      expect(() => 
        validateColumn({ 
          name: 'test', 
          function: 'not_a_function' as any 
        } as ComputedColumn)
      ).toThrow(/ComputedColumn function must be a function/);
    });

    it('should accept valid computed column function', () => {
      expect(() => 
        validateColumn({ 
          name: 'test', 
          function: () => 'computed value' 
        } as ComputedColumn)
      ).not.toThrow();
    });
  });

  describe('validateColumns', () => {
    it('should throw for non-array input', () => {
      expect(() => 
        validateColumns('not-an-array' as any)
      ).toThrow(TableInputError);
      expect(() => 
        validateColumns('not-an-array' as any)
      ).toThrow(/Columns must be an array/);
    });

    it('should throw for array with invalid column', () => {
      expect(() => 
        validateColumns(['valid', ''])
      ).toThrow(TableInputError);
    });

    it('should throw for duplicate column names', () => {
      expect(() => 
        validateColumns(['col1', 'col2', 'col1'])
      ).toThrow(TableInputError);
      expect(() => 
        validateColumns(['col1', 'col2', 'col1'])
      ).toThrow(/Column names must be unique/);
      
      expect(() => 
        validateColumns([
          { name: 'col1' }, 
          { name: 'col2' }, 
          { name: 'col1' }
        ])
      ).toThrow(TableInputError);
    });

    it('should accept valid columns array', () => {
      expect(() => 
        validateColumns(['col1', 'col2', 'col3'])
      ).not.toThrow();
      
      expect(() => 
        validateColumns([
          { name: 'col1' }, 
          { name: 'col2' }, 
          { name: 'col3' }
        ])
      ).not.toThrow();
      
      expect(() => 
        validateColumns([
          'col1',
          { name: 'col2', alignment: 'center' }, 
          { name: 'col3', color: 'red' }
        ])
      ).not.toThrow();
    });
  });

  describe('validateRowData', () => {
    it('should throw for null or undefined input', () => {
      expect(() => 
        validateRowData(null as any)
      ).toThrow(TableInputError);
      expect(() => 
        validateRowData(undefined as any)
      ).toThrow(TableInputError);
      expect(() => 
        validateRowData(null as any)
      ).toThrow(/Row data must be a non-null object/);
    });

    it('should throw for non-object input', () => {
      expect(() => 
        validateRowData('not-an-object' as any)
      ).toThrow(TableInputError);
      expect(() => 
        validateRowData(123 as any)
      ).toThrow(TableInputError);
    });

    it('should accept valid row data', () => {
      expect(() => 
        validateRowData({})
      ).not.toThrow();
      
      expect(() => 
        validateRowData({ col1: 'value1', col2: 'value2' })
      ).not.toThrow();
    });
  });

  describe('validateRows', () => {
    it('should throw for non-array input', () => {
      expect(() => 
        validateRows('not-an-array' as any)
      ).toThrow(TableInputError);
      expect(() => 
        validateRows('not-an-array' as any)
      ).toThrow(/Rows must be an array/);
    });

    it('should throw if any row is invalid', () => {
      expect(() => 
        validateRows([
          { col1: 'value1' },
          null as any,
          { col1: 'value2' }
        ])
      ).toThrow(TableInputError);
    });

    it('should accept valid rows array', () => {
      expect(() => 
        validateRows([])
      ).not.toThrow();
      
      expect(() => 
        validateRows([
          { col1: 'value1', col2: 'value2' },
          { col1: 'value3', col2: 'value4' }
        ])
      ).not.toThrow();
    });
  });

  describe('validateColor', () => {
    it('should throw for invalid color', () => {
      expect(() => 
        validateColor('invalid_color')
      ).toThrow(TableInputError);
      expect(() => 
        validateColor('invalid_color')
      ).toThrow(/Invalid color/);
    });

    it('should accept valid color', () => {
      COLORS.forEach(color => {
        expect(() => validateColor(color)).not.toThrow();
      });
    });

    it('should accept undefined color', () => {
      expect(() => validateColor(undefined)).not.toThrow();
    });
  });

  describe('TableInputError', () => {
    it('should be an instance of Error', () => {
      const error = new TableInputError('test message');
      expect(error).toBeInstanceOf(Error);
    });

    it('should have the correct name', () => {
      const error = new TableInputError('test message');
      expect(error.name).toBe('TableInputError');
    });

    it('should have the provided message', () => {
      const message = 'test error message';
      const error = new TableInputError(message);
      expect(error.message).toBe(message);
    });
  });
}); 