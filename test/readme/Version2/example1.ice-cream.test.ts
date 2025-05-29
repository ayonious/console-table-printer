import { printTable } from '../../..';

describe('README Example 1: Ice Cream Rankings', () => {
  test('should print ice cream rankings table', () => {
    const iceCreamRankings = [
      { rank: 1, flavor: 'Chocolate', rating: '5/5', votes: 123 },
      { rank: 2, flavor: 'Vanilla', rating: '4/5', votes: 92 },
      { rank: 3, flavor: 'Cookie Dough', rating: '4/5', votes: 89 },
      { rank: 4, flavor: 'Blueberry', rating: '3/5', votes: 45 },
    ];

    // This will print the table to console during test
    printTable(iceCreamRankings);
  });
}); 