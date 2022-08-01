import {
  renderSimpleTable,
  printSimpleTable,
} from '../../src/internalTable/internal-table-printer';

describe('Example: Print a simple Table without table instance creation', () => {
  it('simple print', () => {
    const testCases = [
      { index: 3, text: 'I would like some gelb bananen bitte', value: 100 },
      { index: 4, text: 'I hope batch update is working', value: 300 },
    ];
    const tableStr: string = renderSimpleTable(testCases);

    expect(tableStr).toMatchSnapshot();
  });

  it('Make sure this function works dont throw exception', () => {
    const testCases = [
      { index: 3, text: 'I would like some gelb bananen bitte', value: 100 },
      { index: 4, text: 'I hope batch update is working', value: 300 },
    ];
    printSimpleTable(testCases);
  });
});
