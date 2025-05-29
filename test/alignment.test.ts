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

  it('should verify that each alignment type properly aligns content', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'left_col', alignment: 'left', minLen: 15 },
        { name: 'right_col', alignment: 'right', minLen: 15 },
        { name: 'center_col', alignment: 'center', minLen: 15 }
      ]
    });

    // Test with different length content
    p.addRows([
      {
        left_col: 'short',
        right_col: 'short',
        center_col: 'short'
      },
      {
        left_col: 'medium length',
        right_col: 'medium length',
        center_col: 'medium length'
      },
      {
        left_col: 'very long content',
        right_col: 'very long content',
        center_col: 'very long content'
      }
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual('│ left_col          │         right_col │    center_col     │');
    expect(renderedBody).toEqual([
      '│ short             │             short │       short       │',
      '│ medium length     │     medium length │   medium length   │',
      '│ very long content │ very long content │ very long content │'
    ]);
  });
});
