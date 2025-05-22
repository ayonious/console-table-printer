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
});
