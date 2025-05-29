import { Table } from '../../../index';

describe('Example: 3', () => {
  it('Coloring', () => {
    const p = new Table();
    p.addRow({ description: 'red wine', value: 10.212 }, { color: 'red' });
    p.addRow({ description: 'green gemuse', value: 20.0 }, { color: 'green' });
    p.addRow({ description: 'gelb bananen', value: 100 }, { color: 'yellow' });

    // print
    const returned = p.printTable();
    expect(returned).toBeUndefined();
  });
});
