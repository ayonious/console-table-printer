import { rawColumnToInternalColumn, objIfExists } from '../../src/internalTable/input-converter';

// Test rawColumnToInternalColumn function
describe('rawColumnToInternalColumn', () => {
  it('should convert raw column options to internal column format', () => {
    const rawColumn = { name: 'col1', alignment: 'left', color: 'red' };
    const internalColumn = rawColumnToInternalColumn(rawColumn);
    expect(internalColumn.name).toBe('col1');
    expect(internalColumn.alignment).toBe('left');
    expect(internalColumn.color).toBe('red');
  });
});

// Test objIfExists function
describe('objIfExists', () => {
  it('should return an object if value exists', () => {
    const result = objIfExists('key', 'value');
    expect(result).toEqual({ key: 'value' });
  });

  it('should return an empty object if value does not exist', () => {
    const result = objIfExists('key', null);
    expect(result).toEqual({});
  });
}); 