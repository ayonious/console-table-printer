import { Table } from '../index';

describe('Testing column alignment', () => {
  it('all kind of alignments are working', () => {
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

  it('should verify internal alignment states', () => {
    const p = new Table({
      columns: [
        { name: 'left_col', alignment: 'left' },
        { name: 'right_col', alignment: 'right' },
        { name: 'center_col', alignment: 'center' },
        { name: 'default_col' }
      ]
    });

    // Verify internal alignment states
    expect(p.table.columns[0].alignment).toBe('left');
    expect(p.table.columns[1].alignment).toBe('right');
    expect(p.table.columns[2].alignment).toBe('center');
    expect(p.table.columns[3].alignment).toBe('left'); // default alignment

    p.addRow({
      left_col: 'left text',
      right_col: 'right text',
      center_col: 'center text',
      default_col: 'default text'
    });

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle alignment changes after column creation', () => {
    const p = new Table()
      .addColumn({ name: 'col1', alignment: 'left' })
      .addColumn('col2');
    
    // Change alignment after creation
    p.table.columns[0].alignment = 'right';
    p.table.columns[1].alignment = 'center';

    expect(p.table.columns[0].alignment).toBe('right');
    expect(p.table.columns[1].alignment).toBe('center');

    p.addRow({ col1: 'changed to right', col2: 'changed to center' });
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle mixed content types with different alignments', () => {
    const p = new Table({
      columns: [
        { name: 'numbers', alignment: 'right' },
        { name: 'text', alignment: 'left' },
        { name: 'mixed', alignment: 'center' }
      ]
    });

    p.addRows([
      { numbers: 123, text: 'abc', mixed: '123abc' },
      { numbers: -456.78, text: 'longer text here', mixed: true },
      { numbers: 0, text: '', mixed: null }
    ]);

    expect(p.table.columns[0].alignment).toBe('right');
    expect(p.table.columns[1].alignment).toBe('left');
    expect(p.table.columns[2].alignment).toBe('center');

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle unicode characters with different alignments', () => {
    const p = new Table({
      columns: [
        { name: 'left_emoji', alignment: 'left' },
        { name: 'right_emoji', alignment: 'right' },
        { name: 'center_emoji', alignment: 'center' }
      ]
    });

    p.addRows([
      { left_emoji: '😀', right_emoji: '🎉', center_emoji: '🌟' },
      { left_emoji: '😀 text', right_emoji: 'text 🎉', center_emoji: '🌟 text 🌟' }
    ]);

    expect(p.table.columns[0].alignment).toBe('left');
    expect(p.table.columns[1].alignment).toBe('right');
    expect(p.table.columns[2].alignment).toBe('center');

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle alignment with unicode characters', () => {
    const p = new Table({
      columns: [
        { name: 'left_emoji', alignment: 'left' },
        { name: 'right_emoji', alignment: 'right' },
        { name: 'center_emoji', alignment: 'center' }
      ],
      charLength: {
        '😀': 2,
        '🎉': 2,
        '🌟': 2
      }
    });

    p.addRows([
      { left_emoji: '😀', right_emoji: '🎉', center_emoji: '🌟' },
      { left_emoji: '😀 text', right_emoji: 'text 🎉', center_emoji: '🌟 text 🌟' }
    ]);

    expect(p.table.columns[0].alignment).toBe('left');
    expect(p.table.columns[1].alignment).toBe('right');
    expect(p.table.columns[2].alignment).toBe('center');

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle alignment with very long content', () => {
    const p = new Table({
      columns: [
        { name: 'left_long', alignment: 'left', maxLen: 20 },
        { name: 'right_long', alignment: 'right', maxLen: 20 },
        { name: 'center_long', alignment: 'center', maxLen: 20 }
      ]
    });

    const longText = 'This is a very long text that should be truncated';
    p.addRows([
      { 
        left_long: longText,
        right_long: longText,
        center_long: longText
      }
    ]);

    expect(p.table.columns[0].alignment).toBe('left');
    expect(p.table.columns[1].alignment).toBe('right');
    expect(p.table.columns[2].alignment).toBe('center');
    expect(p.table.columns[0].maxLen).toBe(20);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });
});
