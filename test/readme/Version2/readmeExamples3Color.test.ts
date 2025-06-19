import { Table } from '../../../index';

describe('Example: 3', () => {
  it('Coloring', () => {
    const p = new Table();
    p.addRow({ item: 'Pizza', price: 12.99, rating: '5/5' }, { color: 'red' });
    p.addRow({ item: 'Burger', price: 8.99, rating: '4/5' }, { color: 'green' });
    p.addRow({ item: 'Ramen', price: 15.99, rating: '5/5' }, { color: 'yellow' });
    p.addRow({ item: 'Salad', price: 6.99, rating: '3/5' }, { color: 'cyan' });

    // print
    const returned = p.printTable();
    expect(returned).toBeUndefined();
  });
}); 