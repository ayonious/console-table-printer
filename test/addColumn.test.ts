import { Table } from '../index';
import { getTableBody, getTableHeader } from './testUtils/getRawData';

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

  it('should handle columns with maxLen constraint', () => {
    const p = new Table({
      shouldDisableColors: true,
    })
      .addColumn({ name: 'trunCol', maxLen: 10 })
      .addColumn({ name: 'normalColumn' });

    // Add a row with content exceeding maxLen
    p.addRow({
      trunCol: 'This text should be truncated',
      normalCol: 'This text should not be truncated'
    });

    const contentLines = getTableBody(p);
    
    p.printTable();
    const paddingSize = 2;

    contentLines.forEach(line => {
      // Verify the truncated column's content length
      const truncatedContent = line.split('│')[1];
      expect(truncatedContent.length).toBeLessThanOrEqual(10 + paddingSize);
    });
  });

  it('should handle columns with minLen padding', () => {
    const p = new Table()
      .addColumn({ name: 'paddedColumn', minLen: 20 })
      .addColumn({ name: 'shortColumn', minLen: 10 });

    // Add a row with content shorter than minLen
    p.addRow({
      paddedColumn: 'short',
      shortColumn: 'text'
    });

    const rendered = p.render();
    const lines = rendered.split('\n');
    
    // Find the header line to check padding
    const headerLine = lines.find(line => line.includes('paddedColumn'));
    expect(headerLine?.length).toBeGreaterThanOrEqual(35); // Account for padding and borders
    
    p.printTable();
    expect(rendered).toMatchSnapshot();
  });

  // TODO: fix this test
  /*
  it('should handle columns with both minLen and maxLen', () => {
    const p = new Table()
      .addColumn({ 
        name: 'constrainedColumn',
        minLen: 10,
        maxLen: 15
      });

    // Test various content lengths
    p.addRow({ constrainedColumn: 'short' }); // Should be padded
    p.addRow({ constrainedColumn: 'just right' }); // Should fit
    p.addRow({ constrainedColumn: 'this is too long' }); // Should be truncated

    p.printTable();

    const contentLines = getTableBody(p);

    const paddingSize = 2;
    contentLines.forEach(line => {
      // Verify the truncated column's content length
      const truncatedContent = line.split('│')[1];
      expect(truncatedContent.length).toBeGreaterThanOrEqual(10 + paddingSize);
      expect(truncatedContent.length).toBeLessThanOrEqual(15 + paddingSize);
    });

  });
  */

  it('should handle column with zero minLen and maxLen', () => {
    const p = new Table()
      .addColumn({ 
        name: 'zeroConstraints',
        minLen: 0,
        maxLen: 0
      });

    p.addRow({ zeroConstraints: 'some content' });
    
    const rendered = p.render();
    expect(rendered).toContain('some content'); // Content should still be visible
    
    p.printTable();
    expect(rendered).toMatchSnapshot();
  });

  it('should handle column with equal minLen and maxLen', () => {
    const p = new Table()
      .addColumn({ 
        name: 'fixedWidth',
        minLen: 10,
        maxLen: 10
      });

    p.addRow({ fixedWidth: 'short' }); // Should be padded
    p.addRow({ fixedWidth: 'exact fit!' }); // Should fit exactly
    p.addRow({ fixedWidth: 'too long text' }); // Should be truncated

    const rendered = p.render();
    const lines = rendered.split('\n');
    
    // Check that all content lines are exactly the same length
    const contentLines = lines.filter(line => 
      line.includes('short') || 
      line.includes('exact') || 
      line.includes('too')
    );
    
    const firstLineLength = contentLines[0].length;
    contentLines.forEach(line => {
      expect(line.length).toBe(firstLineLength);
    });
    
    p.printTable();
    expect(rendered).toMatchSnapshot();
  });

  it('should make sure each column is what its expected to be', () => {
    const p = new Table({
      shouldDisableColors: true
    })
      .addColumn({ name: 'complexColumn', alignment: 'center', color: 'blue', title: 'Complex Column' })
      .addColumn('simpleColumn')
      .addRow({ complexColumn: 'complexValue', simpleColumn: 'simpleValue' });

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual('│ Complex Column │ simpleColumn │');
    expect(renderedBody).toEqual([
      '│  complexValue  │  simpleValue │'
    ]);
  });

  it('should verify that addColumn adds a new column while preserving existing data', () => {
    const p = new Table({
      shouldDisableColors: true
    });
    
    // Add initial columns and data
    p.addColumns(['col1', 'col2'])
      .addRows([
        { col1: 'value1', col2: 'value2' },
        { col1: 'value3', col2: 'value4' }
      ]);

    // Add a new column
    p.addColumn('col3');
    p.addRows([
      { col1: 'value5', col2: 'value6', col3: 'value7' }
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    
    // Verify header structure
    const headerParts = renderedHeader.split('│').map(part => part.trim());
    expect(headerParts).toContain('col3');
    expect(renderedBody).toHaveLength(3); // Three rows
    
    // Verify body structure and content
    const lastRowParts = renderedBody[2].split('│').map(part => part.trim());
    const firstRowParts = renderedBody[0].split('│').map(part => part.trim());
    const secondRowParts = renderedBody[1].split('│').map(part => part.trim());
    
    // Check empty spaces in first two rows' last column
    expect(firstRowParts[3]).toBe('');
    expect(secondRowParts[3]).toBe('');
    
    // Check the value in the last row's last column
    expect(lastRowParts[3]).toBe('value7');
    
    // Verify all rows have correct number of columns
    expect(firstRowParts.length).toBe(5); // Including empty parts at start/end
    expect(secondRowParts.length).toBe(5);
    expect(lastRowParts.length).toBe(5);
  });

  it('should verify addColumn with custom column properties', () => {
    const p = new Table({
      shouldDisableColors: true
    });
    
    p.addColumns(['col1'])
      .addRows([{ col1: 'value1' }]);

    // Add a column with alignment and title
    p.addColumn({ 
      name: 'col2',
      alignment: 'right',
      title: 'Column Two'
    });
    p.addRows([{ col1: 'value2', col2: '123' }]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    const headerParts = renderedHeader.split('│').map(part => part.trim());
    const bodyParts = renderedBody[1].split('│').map(part => part.trim());

    // Verify custom title is used
    expect(headerParts).toContain('Column Two');
    // Verify right alignment (value should be at the end of its cell)
    expect(bodyParts[2]).toBe('123');
  });

  it('should verify addColumn with multiple data types', () => {
    const p = new Table({
      shouldDisableColors: true
    });
    
    p.addColumn('col1')
      .addRows([{ col1: 'text' }]);

    // Add a column and test different data types
    p.addColumn('col2');
    p.addRows([
      { col1: 'row1', col2: 123 },
      { col1: 'row2', col2: true },
      { col1: 'row3', col2: null },
      { col1: 'row4', col2: undefined }
    ]);

    const renderedBody = getTableBody(p);
    const rows = renderedBody.map(row => row.split('│').map(part => part.trim()));

    // Verify different data types are rendered correctly
    expect(rows[1][2]).toBe('123');      // number
    expect(rows[2][2]).toBe('true');     // boolean
    expect(rows[3][2]).toBe('');         // null
    expect(rows[4][2]).toBe('');         // undefined
  });

  it('should verify addColumn maintains column order', () => {
    const p = new Table({
      shouldDisableColors: true
    });
    
    // Add columns in sequence
    p.addColumn('col1');
    p.addColumn('col2');
    p.addColumn('col3');
    
    p.addRows([{ col1: '1', col2: '2', col3: '3' }]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    const headerParts = renderedHeader.split('│').map(part => part.trim());
    const bodyParts = renderedBody[0].split('│').map(part => part.trim());

    // Verify column order is maintained
    expect(headerParts[1]).toBe('col1');
    expect(headerParts[2]).toBe('col2');
    expect(headerParts[3]).toBe('col3');

    // Verify data order matches column order
    expect(bodyParts[1]).toBe('1');
    expect(bodyParts[2]).toBe('2');
    expect(bodyParts[3]).toBe('3');
  });
});
