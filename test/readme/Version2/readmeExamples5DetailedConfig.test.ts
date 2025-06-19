import { Table } from '../../../index';

describe('Example: 5', () => {
  it('Detailed Configuration', () => {
    const salesTable = new Table({
      title: '📊 Sales Report Q4 2024',
      columns: [
        { name: 'region', alignment: 'left', color: 'blue' },
        { name: 'sales', alignment: 'right', maxLen: 30 },
        { name: 'growth', title: 'Growth %' },
      ],
      rows: [
        { region: 'North America', sales: '$2.5M', growth: '+15%' },
        { region: 'Europe', sales: '$1.8M', growth: '+8%' },
        { region: 'Asia Pacific', sales: '$3.2M', growth: '+22%' },
      ],
      sort: (row1, row2) => {
        const sales1 = parseFloat(row1.sales.replace('$', '').replace('M', ''));
        const sales2 = parseFloat(row2.sales.replace('$', '').replace('M', ''));
        return sales2 - sales1;
      },
      filter: (row) => row.growth > '+10%',
      enabledColumns: ['region', 'sales'],
      disabledColumns: ['growth'],
      colorMap: {
        high_growth: '\x1b[32m',
      },
      charLength: {
        '👋': 2,
        '😅': 2,
      },
      defaultColumnOptions: {
        alignment: 'center',
        color: 'red',
        maxLen: 40,
        minLen: 20,
      },
    });

    // print
    const returned = salesTable.printTable();
    expect(returned).toBeUndefined();
  });
}); 