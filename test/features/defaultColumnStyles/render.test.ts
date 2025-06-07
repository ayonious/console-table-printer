import { Table } from '../../../index';
import { getTableBody, getTableHeader } from '../../testUtils/getRawData';

describe('Default Column Styles: Rendering Tests', () => {
  it('should render table with default column styles', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [{ name: 'name' }, { name: 'age' }, { name: 'city' }],
      defaultColumnOptions: {
        alignment: 'center',
        maxLen: 15,
      },
    });

    p.addRows([
      { name: 'John Doe', age: 30, city: 'New York' },
      { name: 'Jane Smith', age: 25, city: 'Los Angeles' },
      { name: 'Bob Johnson', age: 35, city: 'Chicago' },
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual(
      '│      name       │       age       │      city       │'
    );
    expect(renderedBody).toEqual([
      '│    John Doe     │       30        │    New York     │',
      '│   Jane Smith    │       25        │   Los Angeles   │',
      '│   Bob Johnson   │       35        │     Chicago     │',
    ]);
  });

  it('should render table with mixed alignments and maxLen', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'id', maxLen: 5 },
        { name: 'description', alignment: 'left', maxLen: 20 },
        { name: 'amount', alignment: 'right' },
      ],
      defaultColumnOptions: {
        alignment: 'center',
        maxLen: 10,
      },
    });

    p.addRows([
      {
        id: 1,
        description: 'First item with a very long description',
        amount: 100.5,
      },
      { id: 2, description: 'Second item', amount: 200.75 },
      { id: 3, description: 'Third', amount: 300.25 },
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual(
      '│  id   │ description          │     amount │'
    );
    expect(renderedBody).toEqual([
      '│   1   │ First item with a    │      100.5 │',
      '│       │ very long            │            │',
      '│       │ description          │            │',
      '│   2   │ Second item          │     200.75 │',
      '│   3   │ Third                │     300.25 │',
    ]);
  });

  it('should render table with computed columns using default styles', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [{ name: 'firstName' }, { name: 'lastName' }],
      computedColumns: [
        {
          name: 'fullName',
          function: (row) => `${row.firstName} ${row.lastName}`,
        },
      ],
      defaultColumnOptions: {
        alignment: 'center',
        maxLen: 12,
      },
    });

    p.addRows([
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'Jane', lastName: 'Smith' },
      { firstName: 'Bob', lastName: 'Johnson' },
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual(
      '│  firstName   │   lastName   │   fullName   │'
    );
    expect(renderedBody).toEqual([
      '│     John     │     Doe      │   John Doe   │',
      '│     Jane     │    Smith     │  Jane Smith  │',
      '│     Bob      │   Johnson    │ Bob Johnson  │',
    ]);
  });

  it('should render table with row separators and default styles', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [{ name: 'task' }, { name: 'status' }],
      defaultColumnOptions: {
        alignment: 'center',
        maxLen: 15,
      },
      rowSeparator: true,
    });

    p.addRows([
      { task: 'Task 1', status: 'Done' },
      { task: 'Task 2', status: 'Pending' },
      { task: 'Task 3', status: 'Failed' },
    ]);

    const rendered = p.render();
    expect(rendered).toContain('│      task       │     status      │');
    expect(rendered).toContain('│     Task 1      │      Done       │');
    expect(rendered).toContain('├─────────────────┼─────────────────┤');
    expect(rendered).toContain('│     Task 2      │     Pending     │');
    expect(rendered).toContain('│     Task 3      │     Failed      │');
  });
});
