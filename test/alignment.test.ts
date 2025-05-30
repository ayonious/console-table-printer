import { Table } from '../index';
import { getTableBody, getTableHeader } from './testUtils/getRawData';

describe('Testing column alignment', () => {
  it('should handle basic left, right, and center alignments', () => {
    const p = new Table()
      .addColumn({ name: 'left', alignment: 'left' })
      .addColumn({ name: 'right', alignment: 'right' })
      .addColumn({ name: 'center', alignment: 'center' });

    p.addRow({
      left: 'left-aligned',
      right: 'right-aligned',
      center: 'centered'
    });

    const rendered = p.render();
    expect(rendered).toMatchSnapshot();

    // Verify alignment visually in console
    p.printTable();
  });

  it('should maintain alignment with varying content lengths', () => {
    const p = new Table()
      .addColumn({ name: 'left', alignment: 'left' })
      .addColumn({ name: 'right', alignment: 'right' })
      .addColumn({ name: 'center', alignment: 'center' });

    // Add rows with different content lengths
    p.addRow({
      left: 'short',
      right: 'short',
      center: 'short'
    });
    p.addRow({
      left: 'medium length',
      right: 'medium length',
      center: 'medium length'
    });
    p.addRow({
      left: 'this is a very long text',
      right: 'this is a very long text',
      center: 'this is a very long text'
    });

    const rendered = p.render();
    expect(rendered).toMatchSnapshot();

    // Verify alignment visually in console
    p.printTable();
  });

  it('should handle alignment with special characters and numbers', () => {
    const p = new Table()
      .addColumn({ name: 'leftNum', alignment: 'left' })
      .addColumn({ name: 'rightNum', alignment: 'right' })
      .addColumn({ name: 'centerSpecial', alignment: 'center' });

    p.addRows([
      {
        leftNum: 12345,
        rightNum: 67890,
        centerSpecial: '!@#$%'
      },
      {
        leftNum: -123.45,
        rightNum: 678.90,
        centerSpecial: '    spaces    '
      },
      {
        leftNum: '0000',
        rightNum: '9999',
        centerSpecial: '~~middle~~'
      }
    ]);

    const rendered = p.render();
    expect(rendered).toMatchSnapshot();

    // Verify alignment visually in console
    p.printTable();
  });

  it('should combine alignment with colors and maintain formatting', () => {
    const p = new Table()
      .addColumn({ name: 'leftRed', alignment: 'left', color: 'red' })
      .addColumn({ name: 'rightBlue', alignment: 'right', color: 'blue' })
      .addColumn({ name: 'centerGreen', alignment: 'center', color: 'green' });

    p.addRows([
      {
        leftRed: 'Red Left',
        rightBlue: 'Blue Right',
        centerGreen: 'Green Center'
      },
      {
        leftRed: 'Short',
        rightBlue: 'Medium Text',
        centerGreen: 'Very Long Center Text'
      }
    ]);

    const rendered = p.render();
    expect(rendered).toMatchSnapshot();

    // Verify alignment and colors visually in console
    p.printTable();
  });

  // Keep the original comprehensive test but rename it for clarity
  it('should handle complex alignment scenarios with mixed colors and row colors', () => {
    // Create a table
    const p = new Table({
      columns: [
        { name: 'red_left_align_index', alignment: 'left', color: 'red' },
        { name: 'right_align_text', alignment: 'right' },
        { name: 'green_value_center', alignment: 'center', color: 'green' },
      ],
    });

    // add rows with color
    p.addRow(
      {
        red_left_align_index: 2,
        right_align_text: 'This row is blue',
        green_value_center: 10.212,
      },
      { color: 'blue' }
    );
    p.addRow(
      {
        red_left_align_index: 3,
        right_align_text: 'I would like some red wine please',
        green_value_center: 10.212,
      },
      { color: 'red' }
    );
    p.addRow(
      {
        red_left_align_index: 4,
        right_align_text: 'I would like some cyan wine please',
        green_value_center: 10.212,
      },
      { color: 'cyan' }
    );
    p.addRow(
      {
        red_left_align_index: 5,
        right_align_text: 'I would like some white_bold wine please',
        green_value_center: 10.212,
      },
      { color: 'white_bold' }
    );
    p.addRow(
      {
        red_left_align_index: 7,
        right_align_text: 'I would like some green gemuse please',
        green_value_center: 20.0,
      },
      { color: 'green' }
    );
    p.addRow(
      {
        red_left_align_index: 8,
        right_align_text: 'I would like some gelb bananen bitte',
        green_value_center: 100,
      },
      { color: 'yellow' }
    );

    // print
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should make sure each column is what its expected to be', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'left', alignment: 'left' },
        { name: 'right', alignment: 'right' },
        { name: 'center', alignment: 'center' }
      ]
    });

    p.addRows([
      {
        left: 'short',
        right: 'short',
        center: 'short'
      },
      {
        left: 'medium length',
        right: 'medium length',
        center: 'medium length'
      },
      {
        left: 'this is a very long text',
        right: 'this is a very long text',
        center: 'this is a very long text'
      }
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual('│ left                     │                    right │          center          │');
    expect(renderedBody).toEqual([
      '│ short                    │                    short │          short           │',
      '│ medium length            │            medium length │      medium length       │',
      '│ this is a very long text │ this is a very long text │ this is a very long text │'
    ]);
  });

  it('should verify exact alignment positioning', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'left', alignment: 'left' },
        { name: 'right', alignment: 'right' },
        { name: 'center', alignment: 'center' }
      ]
    });

    p.addRows([
      { left: 'A', right: 'B', center: 'C' },
      { left: '123', right: '456', center: '789' },
      { left: 'long text', right: 'long text', center: 'long text' }
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    
    // Split each row into cells and verify alignment
    const rows = renderedBody.map(row => row.split('│').map(cell => cell.trim()));
    
    // First row - single characters
    expect(rows[0][1]).toBe('A');  // Left-aligned, should start at beginning
    expect(rows[0][2]).toBe('B');  // Right-aligned, should end at boundary
    expect(rows[0][3]).toBe('C');  // Center-aligned, should have equal space on both sides

    // Second row - numbers
    expect(rows[1][1]).toBe('123');  // Left-aligned numbers
    expect(rows[1][2]).toBe('456');  // Right-aligned numbers
    expect(rows[1][3]).toBe('789');  // Center-aligned numbers

    // Third row - longer text
    expect(rows[2][1]).toBe('long text');  // Left-aligned text
    expect(rows[2][2]).toBe('long text');  // Right-aligned text
    expect(rows[2][3]).toBe('long text');  // Center-aligned text

    // Verify raw output to check exact spacing
    expect(renderedBody).toEqual([
      '│ A         │         B │     C     │',
      '│ 123       │       456 │    789    │',
      '│ long text │ long text │ long text │'
    ]);
  });

  it('should verify alignment with spaces and padding', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'left', alignment: 'left' },
        { name: 'right', alignment: 'right' },
        { name: 'center', alignment: 'center' }
      ]
    });

    p.addRows([
      { left: '   spaced   ', right: '   spaced   ', center: '   spaced   ' },
      { left: 'no-space', right: 'no-space', center: 'no-space' },
      { left: ' ', right: ' ', center: ' ' }
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    
    // Split each row into cells and verify alignment with spaces
    const rows = renderedBody.map(row => row.split('│').map(cell => cell.trim()));
    
    // First row - text with spaces
    expect(rows[0][1]).toBe('spaced');  // Left-aligned should trim spaces
    expect(rows[0][2]).toBe('spaced');  // Right-aligned should trim spaces
    expect(rows[0][3]).toBe('spaced');  // Center-aligned should trim spaces

    // Second row - text without spaces
    expect(rows[1][1]).toBe('no-space');
    expect(rows[1][2]).toBe('no-space');
    expect(rows[1][3]).toBe('no-space');

    // Third row - single space
    expect(rows[2][1]).toBe('');  // Should be empty after trim
    expect(rows[2][2]).toBe('');  // Should be empty after trim
    expect(rows[2][3]).toBe('');  // Should be empty after trim

    // Verify raw output to check exact spacing
    expect(renderedBody).toEqual([
      '│    spaced    │    spaced    │    spaced    │',
      '│ no-space     │     no-space │   no-space   │',
      '│              │              │              │'
    ]);
  });

  it('should verify alignment with varying column widths', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'narrow_left', alignment: 'left' },
        { name: 'wide_right', alignment: 'right' },
        { name: 'medium_center', alignment: 'center' }
      ]
    });

    p.addRows([
      { narrow_left: 'a', wide_right: 'long text here', medium_center: 'center' },
      { narrow_left: 'b', wide_right: 'even longer text here', medium_center: 'middle' },
      { narrow_left: 'c', wide_right: 'short', medium_center: 'text' }
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    
    // Split each row into cells
    const rows = renderedBody.map(row => row.split('│').map(cell => cell.trim()));
    
    // Verify each row maintains proper alignment despite varying widths
    rows.forEach(row => {
      // Left column should always start at the beginning
      expect(row[1].startsWith(row[1].trim())).toBe(true);
      
      // Right column should always end at the boundary
      expect(row[2].endsWith(row[2].trim())).toBe(true);
      
      // Center column should have equal spacing on both sides
      const centerCell = row[3];
      const leftSpace = centerCell.indexOf(centerCell.trim());
      const rightSpace = centerCell.length - (centerCell.trim().length + leftSpace);
      expect(Math.abs(leftSpace - rightSpace)).toBeLessThanOrEqual(1);
    });

    // Verify raw output to check exact spacing
    expect(renderedBody).toEqual([
      '│ a           │        long text here │    center     │',
      '│ b           │ even longer text here │    middle     │',
      '│ c           │                 short │     text      │'
    ]);
  });

  it('should verify alignments are mutually exclusive', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'left', alignment: 'left' },
        { name: 'right', alignment: 'right' },
        { name: 'center', alignment: 'center' }
      ]
    });

    p.addRows([
      { left: 'A', right: 'B', center: 'C' },
      { left: '123', right: '456', center: '789' },
      { left: 'text', right: 'text', center: 'text' }
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    const rows = renderedBody.map(row => row.split('│'));

    // Helper function to count leading/trailing spaces
    const getSpaces = (str: string) => {
      const trimmed = str.trim();
      return {
        leading: str.indexOf(trimmed),
        trailing: str.length - (str.indexOf(trimmed) + trimmed.length)
      };
    };

    // Test each row
    rows.forEach(cells => {
      // Left-aligned cell should have:
      // - Minimal leading space (just 1 for padding)
      // - Some trailing space
      const leftSpaces = getSpaces(cells[1]);
      expect(leftSpaces.leading).toBe(1); // Just one space for padding
      expect(leftSpaces.trailing).toBeGreaterThanOrEqual(1); // At least padding space

      // Right-aligned cell should have:
      // - More leading space than trailing
      // - Minimal trailing space (just 1 for padding)
      const rightSpaces = getSpaces(cells[2]);
      expect(rightSpaces.trailing).toBe(1); // Just one space for padding
      expect(rightSpaces.leading).toBeGreaterThan(rightSpaces.trailing);

      // Center-aligned cell should have:
      // - Equal (or off by 1) leading and trailing spaces
      const centerSpaces = getSpaces(cells[3]);
      expect(Math.abs(centerSpaces.leading - centerSpaces.trailing)).toBeLessThanOrEqual(1);
      // Verify it's not left or right aligned
      expect(centerSpaces.leading).toBeGreaterThan(1); // Not left-aligned
      expect(centerSpaces.trailing).toBeGreaterThan(1); // Not right-aligned
    });
  });

  it('should verify alignment exclusivity with varying content lengths', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'left', alignment: 'left' },
        { name: 'right', alignment: 'right' },
        { name: 'center', alignment: 'center' }
      ]
    });

    const testData = [
      { left: 'short', right: 'short', center: 'short' },
      { left: 'medium length', right: 'medium length', center: 'medium length' },
      { left: 'very very long text', right: 'very very long text', center: 'very very long text' }
    ];

    p.addRows(testData);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    const rows = renderedBody.map(row => row.split('│'));

    rows.forEach((cells, idx) => {
      const content = testData[idx].left; // Same length for all columns in this row
      const contentLength = content.length;

      // Left alignment check
      const leftCell = cells[1];
      expect(leftCell.startsWith(' ' + content)).toBe(true); // Should start immediately after padding
      expect(leftCell.endsWith(' '.repeat(leftCell.length - contentLength - 1))).toBe(true);

      // Right alignment check
      const rightCell = cells[2];
      const rightTrimmed = rightCell.trim();
      expect(rightCell.endsWith(rightTrimmed + ' ')).toBe(true); // Should end with content + padding
      expect(rightCell.startsWith(' '.repeat(rightCell.length - rightTrimmed.length - 1) + rightTrimmed)).toBe(true);

      // Center alignment check
      const centerCell = cells[3];
      const centerLeadingSpaces = centerCell.indexOf(content);
      const centerTrailingSpaces = centerCell.length - (centerLeadingSpaces + contentLength);
      
      // Verify it's centered
      expect(Math.abs(centerLeadingSpaces - centerTrailingSpaces)).toBeLessThanOrEqual(1);
      // Verify it has at least one space on each side for padding
      expect(centerLeadingSpaces).toBeGreaterThanOrEqual(1);
      expect(centerTrailingSpaces).toBeGreaterThanOrEqual(1);
    });
  });

  it('should verify alignment exclusivity with special characters', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'left', alignment: 'left' },
        { name: 'right', alignment: 'right' },
        { name: 'center', alignment: 'center' }
      ]
    });

    p.addRows([
      { left: '!@#', right: '!@#', center: '!@#' },
      { left: '   ', right: '   ', center: '   ' },
      { left: '→←', right: '→←', center: '→←' }
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    const rows = renderedBody.map(row => row.split('│'));

    rows.forEach(cells => {
      const leftContent = cells[1].trim();
      const rightContent = cells[2].trim();
      const centerContent = cells[3].trim();

      // Left alignment should have minimal leading space
      expect(cells[1].startsWith(' ' + leftContent)).toBe(true);
      expect(cells[1].endsWith(' '.repeat(cells[1].length - leftContent.length - 1))).toBe(true);

      // Right alignment should have minimal trailing space
      expect(cells[2].endsWith(rightContent + ' ')).toBe(true);
      expect(cells[2].startsWith(' '.repeat(cells[2].length - rightContent.length - 1))).toBe(true);

      // Center alignment should have balanced spaces
      const centerLeadingSpaces = cells[3].indexOf(centerContent);
      const centerTrailingSpaces = cells[3].length - (centerLeadingSpaces + centerContent.length);
      
      // Verify it's centered
      expect(Math.abs(centerLeadingSpaces - centerTrailingSpaces)).toBeLessThanOrEqual(1);
      // Verify it has at least one space on each side for padding
      expect(centerLeadingSpaces).toBeGreaterThanOrEqual(1);
      expect(centerTrailingSpaces).toBeGreaterThanOrEqual(1);
    });
  });

  it('should verify alignment exclusivity with exact spacing checks', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'left', alignment: 'left' },
        { name: 'right', alignment: 'right' },
        { name: 'center', alignment: 'center' }
      ]
    });

    // Test with fixed-width content to make spacing predictable
    p.addRows([
      { left: 'xxx', right: 'xxx', center: 'xxx' },
      { left: 'yyyyy', right: 'yyyyy', center: 'yyyyy' }
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    const rows = renderedBody.map(row => row.split('│').map(cell => cell.slice(1, -1))); // Remove border spaces

    rows.forEach(cells => {
      // Left-aligned cell
      const leftCell = cells[0];
      expect(leftCell.trimRight()).toBe(leftCell.trim());
      expect(leftCell.trimLeft()).not.toBe(leftCell.trim());
      
      // Right-aligned cell
      const rightCell = cells[1];
      expect(rightCell.trimLeft()).toBe(rightCell.trim());
      expect(rightCell.trimRight()).not.toBe(rightCell.trim());
      
      // Center-aligned cell
      const centerCell = cells[2];
      const totalPadding = centerCell.length - centerCell.trim().length;
      const leftPadding = Math.floor(totalPadding / 2);
      const rightPadding = totalPadding - leftPadding;
      
      expect(centerCell.slice(0, leftPadding)).toBe(' '.repeat(leftPadding));
      expect(centerCell.slice(-rightPadding)).toBe(' '.repeat(rightPadding));
      const centerContent = centerCell.slice(leftPadding, -rightPadding);
      expect(['xxx', 'yyyyy']).toContain(centerContent);
    });
  });

  it('should verify alignment exclusivity with unicode characters', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'left', alignment: 'left' },
        { name: 'right', alignment: 'right' },
        { name: 'center', alignment: 'center' }
      ]
    });

    // Test with unicode characters to ensure proper spacing
    p.addRows([
      { left: '🎯', right: '🎯', center: '🎯' },
      { left: '💡💡', right: '💡💡', center: '💡💡' }
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    const rows = renderedBody.map(row => row.split('│').map(cell => cell.slice(1, -1))); // Remove border spaces

    rows.forEach(cells => {
      // Left-aligned cell
      const leftCell = cells[0];
      expect(leftCell.trimRight()).toBe(leftCell.trim());
      expect(leftCell.trimLeft()).not.toBe(leftCell.trim());
      
      // Right-aligned cell
      const rightCell = cells[1];
      expect(rightCell.trimLeft()).toBe(rightCell.trim());
      expect(rightCell.trimRight()).not.toBe(rightCell.trim());
      
      // Center-aligned cell
      const centerCell = cells[2];
      const leftSpaces = centerCell.length - centerCell.trimLeft().length;
      const rightSpaces = centerCell.length - centerCell.trimRight().length;
      expect(Math.abs(leftSpaces - rightSpaces)).toBeLessThanOrEqual(1); // Allow for odd-length padding
    });
  });
});
