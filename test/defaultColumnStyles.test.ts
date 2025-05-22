import { Table } from '../index';

describe('Testing defaultColumnStyles in Table', () => {
  it('should apply default styles to columns when not specified', () => {
    const defaultStyles = { alignment: 'center', color: 'blue', maxLen: 50 };
    const p = new Table({
      columns: [
        { name: 'col1' },
        { name: 'col2', alignment: 'left' },
      ],
      defaultColumnStyles: defaultStyles,
    });

    p.addRow({ col1: 'value1', col2: 'value2' });
    const rendered = p.render();
    expect(rendered).toContain('value1');
    expect(rendered).toContain('value2');
    // Check if default styles are applied
    expect(p.table.columns[0].alignment).toBe('center');
    expect(p.table.columns[0].color).toBe('blue');
    expect(p.table.columns[0].maxLen).toBe(50);
    // Check if specified styles override defaults
    expect(p.table.columns[1].alignment).toBe('left');

    // print
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });
});
