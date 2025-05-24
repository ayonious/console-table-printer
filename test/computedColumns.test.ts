import { Table } from '../index';

describe('Computed Columns Tests', () => {
  it('should handle basic arithmetic computations', () => {
    const p = new Table({
      columns: [
        { name: 'value1', alignment: 'right' },
        { name: 'value2', alignment: 'right' }
      ],
      computedColumns: [
        {
          name: 'sum',
          function: (row) => row.value1 + row.value2
        },
        {
          name: 'difference',
          function: (row) => row.value1 - row.value2
        },
        {
          name: 'product',
          function: (row) => row.value1 * row.value2
        }
      ]
    });

    p.addRows([
      { value1: 10, value2: 5 },
      { value1: 20, value2: 10 },
      { value1: 15, value2: 3 }
    ]);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle string manipulations', () => {
    const p = new Table({
      columns: [
        { name: 'firstName' },
        { name: 'lastName' }
      ],
      computedColumns: [
        {
          name: 'fullName',
          function: (row) => `${row.firstName} ${row.lastName}`
        },
        {
          name: 'initials',
          function: (row) => `${row.firstName[0]}.${row.lastName[0]}.`
        }
      ]
    });

    p.addRows([
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'Jane', lastName: 'Smith' },
      { firstName: 'Bob', lastName: 'Johnson' }
    ]);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle conditional computations', () => {
    const p = new Table({
      columns: [
        { name: 'score', alignment: 'right' }
      ],
      computedColumns: [
        {
          name: 'grade',
          function: (row) => {
            if (row.score >= 90) return 'A';
            if (row.score >= 80) return 'B';
            if (row.score >= 70) return 'C';
            if (row.score >= 60) return 'D';
            return 'F';
          }
        },
        {
          name: 'status',
          function: (row) => row.score >= 60 ? 'PASS' : 'FAIL'
        }
      ]
    });

    p.addRows([
      { score: 95 },
      { score: 85 },
      { score: 75 },
      { score: 65 },
      { score: 55 }
    ]);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle computations with row index', () => {
    const p = new Table({
      columns: [
        { name: 'value', alignment: 'right' }
      ],
      computedColumns: [
        {
          name: 'rowNum',
          function: (row, index) => index + 1
        },
        {
          name: 'isEvenRow',
          function: (row, index) => (index + 1) % 2 === 0 ? 'Yes' : 'No'
        },
        {
          name: 'runningTotal',
          function: (row, index, rows) => {
            let total = 0;
            for (let i = 0; i <= index; i++) {
              total += rows[i].value;
            }
            return total;
          }
        }
      ]
    });

    p.addRows([
      { value: 10 },
      { value: 20 },
      { value: 30 },
      { value: 40 }
    ]);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  // Original tests with better names
  it('should handle percentage calculations', () => {
    const p = new Table({
      columns: [
        { name: 'red_amount', color: 'red' },
        { name: 'blue_amount', alignment: 'right' },
      ],
      computedColumns: [
        {
          name: 'sum',
          function: (row) => row.red_amount + row.blue_amount,
        },
        {
          name: 'red_percent',
          function: (row) => ((row.red_amount / row.sum) * 100).toFixed(2),
        },
        {
          name: 'blue_percent',
          function: (row) => ((row.blue_amount / row.sum) * 100).toFixed(2),
        },
      ],
    });

    p.addRows([
      { red_amount: 2, blue_amount: 3 },
      { red_amount: 1, blue_amount: 1 },
      { red_amount: 5, blue_amount: 6 }
    ]);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle custom column titles', () => {
    const p = new Table({
      columns: [
        { name: 'red_amount', color: 'red' },
        { name: 'blue_amount', alignment: 'right' },
      ],
      computedColumns: [
        {
          name: 'sum',
          function: (row) => row.red_amount + row.blue_amount,
        },
        {
          name: 'red_percent',
          title: 'Red Percent',
          function: (row) => ((row.red_amount / row.sum) * 100).toFixed(2),
        },
        {
          name: 'blue_percent',
          title: 'Blue Percent',
          function: (row) => ((row.blue_amount / row.sum) * 100).toFixed(2),
        },
      ],
    });

    p.addRows([
      { red_amount: 2, blue_amount: 3 },
      { red_amount: 1, blue_amount: 1 },
      { red_amount: 5, blue_amount: 6 }
    ]);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle row metadata in computations', () => {
    const p = new Table({
      columns: [
        { name: 'red_amount', color: 'red' },
        { name: 'blue_amount', alignment: 'right' },
      ],
      computedColumns: [
        {
          name: 'row_number',
          title: 'Row Number',
          function: (row, index, rowNumbers) => index,
        },
        {
          name: 'total_rows',
          title: 'Total Rows',
          function: (row, index, rowNumbers) => rowNumbers.length,
        },
      ],
    });

    p.addRows([
      { red_amount: 2, blue_amount: 3 },
      { red_amount: 1, blue_amount: 1 },
      { red_amount: 5, blue_amount: 6 }
    ]);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });
});
