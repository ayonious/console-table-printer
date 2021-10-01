import { Table } from '../index';

describe('General tests', () => {
  it('should yield the same state when adding rows during instantation than with method', () => {
    const rows = [{ foo: '1', bar: '2' }];

    const table1 = new Table();
    table1.addRows(rows);

    const table2 = new Table({ rows });

    expect(table1.table).toStrictEqual(table2.table);
  });
});
