import { Table } from '../index';

describe('Testing adding columns', () => {
  it('should allow add new columns in a chain way', () => {
    const p = new Table()
      .addColumn('foo')
      .addColumns(['bar'])
      .addRow({ foo: '1' })
      .addRows([{ bar: '2' }]);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should allow adding a single column', () => {
    const p = new Table().addColumn('singleColumn');
    p.addRow({ singleColumn: 'value' });
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should allow adding multiple columns', () => {
    const p = new Table().addColumns(['col1', 'col2']);
    p.addRow({ col1: 'value1', col2: 'value2' });
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should allow adding columns with different alignments', () => {
    const p = new Table()
      .addColumn({ name: 'leftAligned', alignment: 'left' })
      .addColumn({ name: 'rightAligned', alignment: 'right' });
    p.addRow({ leftAligned: 'left', rightAligned: 'right' });
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should allow adding columns with colors', () => {
    const p = new Table()
      .addColumn({ name: 'coloredColumn', color: 'red' });
    p.addRow({ coloredColumn: 'redValue' });
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should allow adding a complex column object with chaining', () => {
    const p = new Table()
      .addColumn({ name: 'complexColumn', alignment: 'center', color: 'blue', title: 'Complex Column' })
      .addColumn('simpleColumn')
      .addRow({ complexColumn: 'complexValue', simpleColumn: 'simpleValue' });
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should correctly set internal column properties', () => {
    const p = new Table()
      .addColumn({ 
        name: 'testCol', 
        alignment: 'center', 
        color: 'blue',
        maxLen: 20,
        title: 'Test Column'
      });

    expect(p.table.columns[0].name).toBe('testCol');
    expect(p.table.columns[0].alignment).toBe('center');
    expect(p.table.columns[0].color).toBe('blue');
    expect(p.table.columns[0].maxLen).toBe(20);
    expect(p.table.columns[0].title).toBe('Test Column');
  });

  it('should allow adding columns after rows are added', () => {
    const p = new Table()
      .addColumn('col1')
      .addRow({ col1: 'value1' })
      .addColumn('col2');

    expect(p.table.columns.length).toBe(2);
    expect(p.table.columns[1].name).toBe('col2');
    p.addRow({ col1: 'value2', col2: 'added' });
    
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle column name overrides correctly', () => {
    const p = new Table()
      .addColumn('col1')
      .addColumn({ name: 'col1', alignment: 'right' }); // Override existing column

    expect(p.table.columns.length).toBe(1);
    expect(p.table.columns[0].alignment).toBe('right');
    
    p.addRow({ col1: 'test' });
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should preserve column order when adding multiple columns', () => {
    const p = new Table()
      .addColumns(['col1', 'col2', 'col3']);

    expect(p.table.columns[0].name).toBe('col1');
    expect(p.table.columns[1].name).toBe('col2');
    expect(p.table.columns[2].name).toBe('col3');

    p.addRows([
      { col1: '1', col2: '2', col3: '3' },
      { col1: '4', col2: '5', col3: '6' }
    ]);
    
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });
});
