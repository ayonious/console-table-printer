import { COLOR, Dictionary } from '../../src/models/common';
import { ComputedColumn } from '../../src/models/external-table';
import { Column } from '../../src/models/internal-table';
import {
  cellText,
  RowOptionsRaw,
  convertRawRowOptionsToStandard,
  createTableHorizontalBorders,
  createColumFromOnlyName,
  createColumFromComputedColumn,
  createRow,
  findLenOfColumn,
  renderTableHorizontalBorders,
  createHeaderAsRow,
  getWidthLimitedColumnsArray,
} from '../../src/utils/table-helpers';
import { DEFAULT_ROW_SEPARATOR, DEFAULT_ROW_ALIGNMENT, DEFAULT_HEADER_FONT_COLOR } from '../../src/utils/table-constants';

describe('table-helpers', () => {
  describe('cellText', () => {
    it('should convert number to string', () => {
      expect(cellText(123)).toBe('123');
      expect(cellText(0)).toBe('0');
      expect(cellText(-123)).toBe('-123');
    });

    it('should handle undefined and null', () => {
      // @ts-ignore - Testing edge cases
      expect(cellText(undefined)).toBe('');
      // @ts-ignore - Testing edge cases
      expect(cellText(null)).toBe('');
    });

    it('should return string as is', () => {
      expect(cellText('test')).toBe('test');
      expect(cellText('')).toBe('');
    });
  });

  describe('convertRawRowOptionsToStandard', () => {
    it('should return undefined for undefined input', () => {
      expect(convertRawRowOptionsToStandard(undefined)).toBeUndefined();
    });

    it('should convert raw options with color', () => {
      const raw: RowOptionsRaw = { color: 'red' };
      const result = convertRawRowOptionsToStandard(raw);
      expect(result).toEqual({
        color: 'red',
        separator: DEFAULT_ROW_SEPARATOR,
      });
    });

    it('should convert raw options with separator', () => {
      const raw: RowOptionsRaw = { separator: true };
      const result = convertRawRowOptionsToStandard(raw);
      expect(result).toEqual({
        color: undefined,
        separator: true,
      });
    });
  });

  describe('createTableHorizontalBorders', () => {
    it('should create border with single column', () => {
      const style = {
        left: '╔',
        mid: '╦',
        right: '╗',
        other: '═',
      };
      const result = createTableHorizontalBorders(style, [5]);
      expect(result).toBe('╔═══════╗');
    });

    it('should create border with multiple columns', () => {
      const style = {
        left: '╔',
        mid: '╦',
        right: '╗',
        other: '═',
      };
      const result = createTableHorizontalBorders(style, [3, 4]);
      expect(result).toBe('╔═════╦══════╗');
    });
  });

  describe('createColumFromOnlyName', () => {
    it('should create column with name as title', () => {
      const result = createColumFromOnlyName('test');
      expect(result).toEqual({
        name: 'test',
        title: 'test',
      });
    });
  });

  describe('createColumFromComputedColumn', () => {
    it('should create column with minimal properties', () => {
      const input: ComputedColumn = { 
        name: 'test',
        function: () => 'test'
      };
      const result = createColumFromComputedColumn(input);
      expect(result).toEqual({
        name: 'test',
        title: 'test',
        alignment: DEFAULT_ROW_ALIGNMENT,
      });
    });

    it('should create column with all properties', () => {
      const input: ComputedColumn = {
        name: 'test',
        title: 'Test Column',
        color: 'red' as COLOR,
        maxLen: 10,
        minLen: 5,
        alignment: 'center',
        function: () => 'test'
      };
      const result = createColumFromComputedColumn(input);
      expect(result).toEqual({
        name: 'test',
        title: 'Test Column',
        color: 'red',
        maxLen: 10,
        minLen: 5,
        alignment: 'center',
      });
    });
  });

  describe('createRow', () => {
    it('should create row with all properties', () => {
      const text: Dictionary = { col1: 'value1' };
      const result = createRow('red' as COLOR, text, true);
      expect(result).toEqual({
        color: 'red',
        separator: true,
        text: { col1: 'value1' },
      });
    });
  });

  describe('findLenOfColumn', () => {
    it('should find length considering minLen', () => {
      const column: Column = {
        name: 'test',
        title: 'Test',
        minLen: 10,
      };
      const rows = [
        createRow('white' as COLOR, { test: 'short' }, false),
      ];
      expect(findLenOfColumn(column, rows)).toBe(10);
    });

    it('should find length considering maxLen', () => {
      const column: Column = {
        name: 'test',
        title: 'Test',
        maxLen: 5,
      };
      const rows = [
        createRow('white' as COLOR, { test: 'very long text' }, false),
      ];
      expect(findLenOfColumn(column, rows)).toBe(5);
    });

    it('should find length based on content', () => {
      const column: Column = {
        name: 'test',
        title: 'Test',
      };
      const rows = [
        createRow('white' as COLOR, { test: 'content' }, false),
      ];
      expect(findLenOfColumn(column, rows)).toBe(7); // length of 'content'
    });
  });

  describe('createHeaderAsRow', () => {
    it('should create header row from columns', () => {
      const columns: Column[] = [
        { name: 'col1', title: 'Column 1' },
        { name: 'col2', title: 'Column 2' },
      ];
      const result = createHeaderAsRow(createRow, columns);
      expect(result).toEqual({
        color: DEFAULT_HEADER_FONT_COLOR,
        separator: false,
        text: {
          col1: 'Column 1',
          col2: 'Column 2',
        },
      });
    });
  });

  describe('getWidthLimitedColumnsArray', () => {
    it('should split text into width-limited chunks', () => {
      const columns: Column[] = [
        { name: 'col1', title: 'Col 1', length: 5 },
      ];
      const row = createRow('white' as COLOR, { col1: 'This is a long text' }, false);
      const result = getWidthLimitedColumnsArray(columns, row);
      expect(result).toEqual({
        col1: ['This', 'is a', 'long', 'text'],
      });
    });

    it('should handle empty text', () => {
      const columns: Column[] = [
        { name: 'col1', title: 'Col 1', length: 5 },
      ];
      const row = createRow('white' as COLOR, { col1: '' }, false);
      const result = getWidthLimitedColumnsArray(columns, row);
      expect(result).toEqual({
        col1: [''],
      });
    });
  });
}); 