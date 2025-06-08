import { Table } from '../../../index';
import { getTableBody, getTableHeader } from '../../testUtils/getRawData';

describe('Default Column Styles: Rendering Tests', () => {
  it('should render table with default column styles', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'name_center_maxlen15' },
        { name: 'age_center_maxlen15' },
        { name: 'city_center_maxlen15' },
      ],
      defaultColumnOptions: {
        alignment: 'center',
        maxLen: 15,
      },
    });

    p.addRows([
      {
        name_center_maxlen15: 'John Doe',
        age_center_maxlen15: 30,
        city_center_maxlen15: 'New York',
      },
      {
        name_center_maxlen15: 'Jane Smith',
        age_center_maxlen15: 25,
        city_center_maxlen15: 'Los Angeles',
      },
      {
        name_center_maxlen15: 'Bob Johnson',
        age_center_maxlen15: 35,
        city_center_maxlen15: 'Chicago',
      },
    ]);

    expect([getTableHeader(p), ...getTableBody(p)]).toEqual([
      '│ name_center_maxlen15 │ age_center_maxlen15 │ city_center_maxlen15 │',
      '│       John Doe       │         30          │       New York       │',
      '│      Jane Smith      │         25          │     Los Angeles      │',
      '│     Bob Johnson      │         35          │       Chicago        │',
    ]);

    // Add snapshot test
    expect(p.render()).toMatchSnapshot();
  });

  it('should render table with default left alignment', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'name_left_maxlen15' },
        { name: 'age_left_maxlen15' },
        { name: 'city_left_maxlen15' },
      ],
      defaultColumnOptions: {
        alignment: 'left',
        maxLen: 15,
      },
    });

    p.addRows([
      {
        name_left_maxlen15: 'John Doe',
        age_left_maxlen15: 30,
        city_left_maxlen15: 'New York',
      },
      {
        name_left_maxlen15: 'Jane Smith',
        age_left_maxlen15: 25,
        city_left_maxlen15: 'Los Angeles',
      },
      {
        name_left_maxlen15: 'Bob Johnson',
        age_left_maxlen15: 35,
        city_left_maxlen15: 'Chicago',
      },
    ]);

    expect([getTableHeader(p), ...getTableBody(p)]).toEqual([
      '│ name_left_maxlen15 │ age_left_maxlen15 │ city_left_maxlen15 │',
      '│ John Doe           │ 30                │ New York           │',
      '│ Jane Smith         │ 25                │ Los Angeles        │',
      '│ Bob Johnson        │ 35                │ Chicago            │',
    ]);

    // Add snapshot test
    expect(p.render()).toMatchSnapshot();
  });

  it('should render table with default right alignment', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'name_right_maxlen15' },
        { name: 'age_right_maxlen15' },
        { name: 'city_right_maxlen15' },
      ],
      defaultColumnOptions: {
        alignment: 'right',
        maxLen: 15,
      },
    });

    p.addRows([
      {
        name_right_maxlen15: 'John Doe',
        age_right_maxlen15: 30,
        city_right_maxlen15: 'New York',
      },
      {
        name_right_maxlen15: 'Jane Smith',
        age_right_maxlen15: 25,
        city_right_maxlen15: 'Los Angeles',
      },
      {
        name_right_maxlen15: 'Bob Johnson',
        age_right_maxlen15: 35,
        city_right_maxlen15: 'Chicago',
      },
    ]);

    expect([getTableHeader(p), ...getTableBody(p)]).toEqual([
      '│ name_right_maxlen15 │ age_right_maxlen15 │ city_right_maxlen15 │',
      '│            John Doe │                 30 │            New York │',
      '│          Jane Smith │                 25 │         Los Angeles │',
      '│         Bob Johnson │                 35 │             Chicago │',
    ]);

    // Add snapshot test
    expect(p.render()).toMatchSnapshot();
  });

  it('should render table with mixed alignments and maxLen', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'id_center_maxlen5', maxLen: 5 },
        { name: 'desc_left_maxlen20', alignment: 'left', maxLen: 20 },
        { name: 'amount_right_align', alignment: 'right' },
      ],
      defaultColumnOptions: {
        alignment: 'center',
        maxLen: 10,
      },
    });

    p.addRows([
      {
        id_center_maxlen5: 1,
        desc_left_maxlen20: 'First item with a very long description',
        amount_right_align: 100.5,
      },
      {
        id_center_maxlen5: 2,
        desc_left_maxlen20: 'Second item',
        amount_right_align: 200.75,
      },
      {
        id_center_maxlen5: 3,
        desc_left_maxlen20: 'Third',
        amount_right_align: 300.25,
      },
    ]);

    expect([getTableHeader(p), ...getTableBody(p)]).toEqual([
      '│ id_center_maxlen5 │ desc_left_maxlen20   │ amount_right_align │',
      '│         1         │ First item with a    │              100.5 │',
      '│                   │ very long            │                    │',
      '│                   │ description          │                    │',
      '│         2         │ Second item          │             200.75 │',
      '│         3         │ Third                │             300.25 │',
    ]);

    // Add snapshot test
    expect(p.render()).toMatchSnapshot();
  });

  it('should render table with computed columns using default styles', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'first_center_maxlen12' },
        { name: 'last_center_maxlen12' },
      ],
      computedColumns: [
        {
          name: 'full_computed_center',
          function: (row) =>
            `${row.first_center_maxlen12} ${row.last_center_maxlen12}`,
        },
      ],
      defaultColumnOptions: {
        alignment: 'center',
        maxLen: 12,
      },
    });

    p.addRows([
      { first_center_maxlen12: 'John', last_center_maxlen12: 'Doe' },
      { first_center_maxlen12: 'Jane', last_center_maxlen12: 'Smith' },
      { first_center_maxlen12: 'Bob', last_center_maxlen12: 'Johnson' },
    ]);

    expect([getTableHeader(p), ...getTableBody(p)]).toEqual([
      '│ first_center_maxlen12 │ last_center_maxlen12 │ full_computed_center │',
      '│         John          │         Doe          │       John Doe       │',
      '│         Jane          │        Smith         │      Jane Smith      │',
      '│          Bob          │       Johnson        │     Bob Johnson      │',
    ]);

    // Add snapshot test
    expect(p.render()).toMatchSnapshot();
  });

  it('should render table with row separators and default styles', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'task_center_maxlen15' },
        { name: 'status_center_maxlen15' },
      ],
      defaultColumnOptions: {
        alignment: 'center',
        maxLen: 15,
      },
      rowSeparator: true,
    });

    p.addRows([
      { task_center_maxlen15: 'Task 1', status_center_maxlen15: 'Done' },
      { task_center_maxlen15: 'Task 2', status_center_maxlen15: 'Pending' },
      { task_center_maxlen15: 'Task 3', status_center_maxlen15: 'Failed' },
    ]);

    expect(p.render().split('\n')).toEqual([
      '┌──────────────────────┬────────────────────────┐',
      '│ task_center_maxlen15 │ status_center_maxlen15 │',
      '├──────────────────────┼────────────────────────┤',
      '│        Task 1        │          Done          │',
      '├──────────────────────┼────────────────────────┤',
      '│        Task 2        │        Pending         │',
      '├──────────────────────┼────────────────────────┤',
      '│        Task 3        │         Failed         │',
      '└──────────────────────┴────────────────────────┘',
    ]);

    // Add snapshot test
    expect(p.render()).toMatchSnapshot();
  });

  it('should render table with defaultColumnOptions without specifying columns', () => {
    const p = new Table({
      shouldDisableColors: true,
      defaultColumnOptions: {
        alignment: 'center',
        maxLen: 12,
        minLen: 8,
        color: 'blue',
      },
    });

    // Add rows with different data types and lengths
    p.addRows([
      {
        id: 1,
        name: 'John Smith',
        salary: 50000.5,
        status: 'Active',
        notes: 'This is a very long note that should be wrapped due to maxLen',
      },
      {
        id: 2,
        name: 'Jane Doe',
        salary: 60000.75,
        status: 'On Leave',
        notes: 'Short note',
      },
      {
        id: 3,
        name: 'Bob Wilson',
        salary: 45000.25,
        status: 'Inactive',
        notes: 'Another note here',
      },
    ]);

    expect([getTableHeader(p), ...getTableBody(p)]).toEqual([
      '│      id      │     name     │    salary    │    status    │    notes     │',
      '│      1       │  John Smith  │   50000.5    │    Active    │  This is a   │',
      '│              │              │              │              │  very long   │',
      '│              │              │              │              │  note that   │',
      '│              │              │              │              │  should be   │',
      '│              │              │              │              │ wrapped due  │',
      '│              │              │              │              │  to maxLen   │',
      '│      2       │   Jane Doe   │   60000.75   │   On Leave   │  Short note  │',
      '│      3       │  Bob Wilson  │   45000.25   │   Inactive   │ Another note │',
      '│              │              │              │              │     here     │',
    ]);

    // Add snapshot test
    expect(p.render()).toMatchSnapshot();
  });
});
