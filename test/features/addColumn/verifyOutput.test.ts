import { Table } from '../../../index';
import { getTableBody, getTableHeader } from '../../testUtils/getRawData';


describe('Testing add columnd and verifying the output', () => {
  [20, 30, 40, 50, 60, 100].forEach(len => {
    it(`should handle columns with maxLen constraint ${len}`, () => {

      const columnName = `trunCol:maxLen:${len}`;

      const p = new Table({
        shouldDisableColors: true,
      })
        .addColumn({ name: columnName, maxLen: len })
        .addColumn({ name: 'normalColumn' });

      p.addRow({
        [columnName]: 'This text should be truncated',
        normalColumn: 'This text should not be truncated',
        emptyColumn: '',
      });

      const contentLines = getTableBody(p);

      p.printTable();

      const paddingSize = 2;

      contentLines.forEach(line => {
        // Verify the truncated column's content length
        const truncatedContent = line.split('│')[1];
        expect(truncatedContent.length).toBeLessThanOrEqual(len + paddingSize);
      });
    });
  });

  [20, 30, 40, 50, 60, 100].forEach(len => {
    it(`should handle columns with minLen constraint ${len}`, () => {
      const columnName = `paddedColumn:minLen:${len}`;

      const p = new Table({
        shouldDisableColors: true,
      })
        .addColumn({ name: columnName, minLen: len })
        .addColumn({ name: 'normalColumn' }).addRows([{
          [columnName]: 'This text should be padded',
          normalColumn: 'This text should not be padded',
          emptyColumn: '',
        },
        {
          [columnName]: 'This text should be padded again',
          normalColumn: 'This text should not be padded again',
          emptyColumn: '',
        },
        {
          [columnName]: 'This text should be padded again and again',
          normalColumn: 'This text should not be padded again and again',
          emptyColumn: '',
        },
      ]);
      const contentLines = getTableBody(p);

      p.printTable();

      const paddingSize = 2;

      contentLines.forEach(line => {
        // Verify the truncated column's content length
        const truncatedContent = line.split('│')[1];
        expect(truncatedContent.length).toBeGreaterThanOrEqual(len + paddingSize);  
      });
    });
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

  /*
  
  // TODO: fix this test
  it('should handle column with zero minLen and maxLen', () => {
    const p = new Table({
      shouldDisableColors: true
    })
      .addColumn({
        name: 'zeroConstraints',
        minLen: 0,
        maxLen: 0
      });

    // Test various content lengths
    const testData = [
      { input: '', description: 'empty string' },
      { input: 'short text', description: 'normal text' },
      { input: 'this is a very long text that should not be constrained', description: 'long text' }
    ];

    testData.forEach(({ input }) => {
      p.addRow({ zeroConstraints: input });
    });

    const contentLines = getTableBody(p);

    // Verify each line contains exactly what was input (no padding/truncation)
    testData.forEach(({ input }, index) => {
      const content = contentLines[index].split('│')[1].trim();
      expect(content).toBe(input);
    });

    // Verify different line lengths are preserved
    const lengths = contentLines.map(line => line.split('│')[1].trim().length);
    expect(lengths[0]).toBe(0); // empty string
    expect(lengths[1]).toBe(10); // "short text"
    expect(lengths[2]).toBe(48); // long text

    // Verify the table still renders properly
    const rendered = p.render();
    expect(rendered).toMatchSnapshot();

    p.printTable();
  });


  */

  [15, 20, 30].forEach(fixedLen => {
    it(`should handle column with fixed length ${fixedLen} (minLen = maxLen)`, () => {
      const p = new Table({
        shouldDisableColors: true
      })
        .addColumn({
          name: `fixedWidth:${fixedLen}`,
          minLen: fixedLen,
          maxLen: fixedLen
        });

      // Test various content lengths
      const testData = [
        { input: 'short', description: 'shorter than fixed length' },
        { input: 'x'.repeat(fixedLen), description: 'exactly fixed length' },
        { input: 'this is a very long text that needs truncation', description: 'longer than fixed length' }
      ];

      testData.forEach(({ input }) => {
        p.addRow({ [`fixedWidth:${fixedLen}`]: input });
      });

      const contentLines = getTableBody(p);
      const headerLine = getTableHeader(p);
      const paddingSize = 2; // Account for standard padding

      p.printTable();

      // All lines should have exactly the same length
      const expectedLength = Math.max(fixedLen + paddingSize);
      contentLines.forEach(line => {
        const content = line.split('│')[1];
        expect(content.length).toBe(expectedLength);
      });
    });
  });

  [10, 5].forEach(fixedLen => {
    it(`should handle column with fixed length ${fixedLen} (minLen = maxLen), but headers are longer`, () => {
      const p = new Table({
        shouldDisableColors: true
      })
        .addColumn({
          name: `fixedWidth:${fixedLen}`,
          minLen: fixedLen,
          maxLen: fixedLen
        });

      // Test various content lengths
      const testData = [
        { input: 'short', description: 'shorter than fixed length' },
        { input: 'x'.repeat(fixedLen), description: 'exactly fixed length' },
        { input: 'this is a very long text that needs truncation', description: 'longer than fixed length' }
      ];

      testData.forEach(({ input }) => {
        p.addRow({ [`fixedWidth:${fixedLen}`]: input });
      });

      const contentLines = getTableBody(p);
      const headerLine = getTableHeader(p);
      const paddingSize = 2; // Account for standard padding

      p.printTable();

      // All lines should have exactly the same length
      const expectedLength = Math.max(fixedLen + paddingSize);
      contentLines.forEach(line => {
        const content = line.split('│')[1];
        expect(content.length).toBe(expectedLength);
      });
    });
  });

  [
    { min: 10, max: 15 },
    { min: 15, max: 25 },
    { min: 20, max: 30 },
    { min: 30, max: 40 }
  ].forEach(({ min, max }) => {
    it(`should handle column with minLen ${min} and maxLen ${max}`, () => {
      const p = new Table({
        shouldDisableColors: true
      })
        .addColumn({ 
          name: `col:min${min}:max${max}`,
          minLen: min,
          maxLen: max
        });

      // Test various content lengths
      const testData = [
        { input: 'short', description: 'shorter than minLen' },
        { input: 'perfect size text'.padEnd(min, ' '), description: 'exactly minLen' },
        { input: 'this is a longer text that should be truncated'.padEnd(max + 10, '!'), description: 'longer than maxLen' }
      ];

      testData.forEach(({ input }) => {
        p.addRow({ [`col:min${min}:max${max}`]: input });
      });

      const contentLines = getTableBody(p);
      const paddingSize = 2; // Account for standard padding

      p.printTable();

      contentLines.forEach(line => {
        const content = line.split('│')[1];
        // Content should be between minLen and maxLen (including padding)
        expect(content.length).toBeGreaterThanOrEqual(min + paddingSize);
        expect(content.length).toBeLessThanOrEqual(max + paddingSize);
      });
    });
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
