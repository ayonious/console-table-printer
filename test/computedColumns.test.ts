import { Table } from '../index';

describe('Testing computed columns', () => {
  it('should verify internal computed column states', () => {
    const p = new Table({
      columns: [
        { name: 'value1', color: 'red' },
        { name: 'value2', color: 'blue' }
      ],
      computedColumns: [
        {
          name: 'sum',
          function: (row) => row.value1 + row.value2,
          color: 'green'
        },
        {
          name: 'difference',
          function: (row) => row.value1 - row.value2,
          alignment: 'right'
        }
      ]
    });

    // Verify computed columns are properly added
    expect(p.table.columns.length).toBe(4);
    expect(p.table.columns[2].name).toBe('sum');
    expect(p.table.columns[3].name).toBe('difference');
    expect(p.table.columns[2].color).toBe('green');
    expect(p.table.columns[3].alignment).toBe('right');

    p.addRow({ value1: 10, value2: 5 });
    
    // Verify computed values
    const renderedTable = p.render();
    expect(renderedTable).toContain('15'); // sum
    expect(renderedTable).toContain('5');  // difference
    expect(renderedTable).toMatchSnapshot();
  });

  it('should handle complex computations and formatting', () => {
    const p = new Table({
      columns: [
        { name: 'price', alignment: 'right' },
        { name: 'quantity', alignment: 'right' }
      ],
      computedColumns: [
        {
          name: 'total',
          function: (row) => (row.price * row.quantity).toFixed(2),
          alignment: 'right'
        },
        {
          name: 'discount',
          function: (row) => {
            const total = row.price * row.quantity;
            return total > 100 ? '10%' : 'N/A';
          },
          alignment: 'center'
        },
        {
          name: 'final_price',
          function: (row) => {
            const total = row.price * row.quantity;
            return total > 100 ? 
              (total * 0.9).toFixed(2) : 
              total.toFixed(2);
          },
          color: 'green',
          alignment: 'right'
        }
      ]
    });

    p.addRows([
      { price: 20, quantity: 2 },   // Below discount threshold
      { price: 50, quantity: 3 }    // Above discount threshold
    ]);

    const renderedTable = p.render();
    expect(renderedTable).toContain('40.00');  // First row total
    expect(renderedTable).toContain('150.00'); // Second row total
    expect(renderedTable).toContain('N/A');    // First row no discount
    expect(renderedTable).toContain('10%');    // Second row has discount
    expect(renderedTable).toMatchSnapshot();
  });

  it('should handle computed columns depending on other computed columns', () => {
    const p = new Table({
      columns: [
        { name: 'value', alignment: 'right' }
      ],
      computedColumns: [
        {
          name: 'doubled',
          function: (row) => row.value * 2
        },
        {
          name: 'quadrupled',
          function: (row) => row.doubled * 2
        },
        {
          name: 'summary',
          function: (row) => `${row.value} → ${row.doubled} → ${row.quadrupled}`
        }
      ]
    });

    p.addRows([
      { value: 5 },
      { value: 10 }
    ]);

    const renderedTable = p.render();
    expect(renderedTable).toContain('5 → 10 → 20');
    expect(renderedTable).toContain('10 → 20 → 40');
    expect(renderedTable).toMatchSnapshot();
  });

  it('should handle error cases in computed columns', () => {
    const p = new Table({
      columns: [
        { name: 'value', alignment: 'right' }
      ],
      computedColumns: [
        {
          name: 'safe_division',
          function: (row) => {
            try {
              return (100 / row.value).toFixed(2);
            } catch (e) {
              return 'Error';
            }
          }
        },
        {
          name: 'status',
          function: (row) => row.value > 0 ? 'Valid' : 'Invalid',
          color: 'green'
        }
      ]
    });

    p.addRows([
      { value: 20 },
      { value: 0 },
      { value: -10 }
    ]);

    const renderedTable = p.render();
    expect(renderedTable).toContain('5.00');   // 100/20
    expect(renderedTable).toContain('Error');  // 100/0
    expect(renderedTable).toContain('Valid');
    expect(renderedTable).toContain('Invalid');
    expect(renderedTable).toMatchSnapshot();
  });

  it('should handle computed columns with different styles', () => {
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
            return 'F';
          },
          color: 'yellow',
          alignment: 'center'
        },
        {
          name: 'status',
          function: (row) => row.score >= 70 ? 'PASS' : 'FAIL',
          color: 'green',
          alignment: 'center'
        }
      ]
    });

    p.addRows([
      { score: 95 },
      { score: 85 },
      { score: 75 },
      { score: 65 }
    ]);

    expect(p.table.columns[1].name).toBe('grade');
    expect(p.table.columns[2].name).toBe('status');
    expect(p.table.columns[1].alignment).toBe('center');
    expect(p.table.columns[2].alignment).toBe('center');
    expect(p.table.columns[1].color).toBe('yellow');
    expect(p.table.columns[2].color).toBe('green');

    const renderedTable = p.render();
    expect(renderedTable).toContain('A');
    expect(renderedTable).toContain('B');
    expect(renderedTable).toContain('C');
    expect(renderedTable).toContain('F');
    expect(renderedTable).toContain('PASS');
    expect(renderedTable).toContain('FAIL');
    expect(renderedTable).toMatchSnapshot();
  });

  // Original test cases preserved
  it('Computed Columns are working', () => {
    // Create a table
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

    // add rows with color
    p.addRow({
      red_amount: 2,
      blue_amount: 3,
    });
    p.addRow({
      red_amount: 1,
      blue_amount: 1,
    });
    p.addRow({
      red_amount: 5,
      blue_amount: 6,
    });

    // print
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('Computed Columns are working with Title', () => {
    // Create a table
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

    // add rows with color
    p.addRow({
      red_amount: 2,
      blue_amount: 3,
    });
    p.addRow({
      red_amount: 1,
      blue_amount: 1,
    });
    p.addRow({
      red_amount: 5,
      blue_amount: 6,
    });

    // print
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });
});
