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

  // TODO: fix this test
  /*
  it('should handle columns with maxLen constraint', () => {
    const p = new Table()
      .addColumn({ name: 'truncatedColumn', maxLen: 10 })
      .addColumn({ name: 'normalColumn' });

    // Add a row with content exceeding maxLen
    p.addRow({
      truncatedColumn: 'This text should be truncated',
      normalColumn: 'This text should not be truncated'
    });

    const rendered = p.render();
    const lines = rendered.split('\n');
    
    // Find the line with the content (should be the third line, after header and separator)
    const contentLine = lines[2];
    // Verify the truncated column's content length
    const truncatedContent = contentLine.split('│')[1].trim();
    expect(truncatedContent.length).toBeLessThanOrEqual(10);
    
    p.printTable();
    expect(rendered).toMatchSnapshot();
  });
  */

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

    const rendered = p.render();
    const lines = rendered.split('\n');
    
    // Get content lines (skip header and separator)
    const contentLines = lines.slice(2, -1);
    
    contentLines.forEach(line => {
      const content = line.split('│')[1].trim();
      // Content should be between minLen and maxLen
      expect(content.length).toBeGreaterThanOrEqual(10);
      expect(content.length).toBeLessThanOrEqual(15);
    });
    
    p.printTable();
    expect(rendered).toMatchSnapshot();
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
});
