import { printTable } from '../../index';

describe('Example: 1', () => {
  it('Basic', () => {
    // Create a table
    const testCases = [
      { Rank: 3, text: 'I would like some Yellow', value: 100 },
      { Rank: 4, text: 'I hope batch update is working', value: 300 },
    ];

    // print
    const returned = printTable(testCases);
    expect(returned).toBeUndefined();
  });
});
