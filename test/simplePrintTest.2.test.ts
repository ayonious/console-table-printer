import { printSimpleTable } from '../src/internal-table-printer';

describe('Example: Print a simple Table without table instance creation', () => {
  it(`simple print`, function() {
    const testCases = [
      { index: 3, text: 'I would like some gelb bananen bitte', value: 100 },
      { index: 4, text: 'I hope batch update is working', value: 300 },
    ];
    let out = printSimpleTable(testCases);
    expect(out).toBe(undefined);
  });
});
