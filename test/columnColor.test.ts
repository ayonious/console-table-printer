import { Table } from '../index';

describe('Testing column colors', () => {
  it('should verify internal color states', () => {
    const p = new Table({
      columns: [
        { name: 'red_col', color: 'red' },
        { name: 'blue_col', color: 'blue' },
        { name: 'green_col', color: 'green' },
        { name: 'default_col' }
      ]
    });

    // Verify internal color states
    expect(p.table.columns[0].color).toBe('red');
    expect(p.table.columns[1].color).toBe('blue');
    expect(p.table.columns[2].color).toBe('green');
    expect(p.table.columns[3].color).toBeUndefined(); // default has no color

    p.addRow({
      red_col: 'red text',
      blue_col: 'blue text',
      green_col: 'green text',
      default_col: 'default text'
    });

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle color changes after column creation', () => {
    const p = new Table()
      .addColumn({ name: 'col1', color: 'red' })
      .addColumn('col2');
    
    // Change color after creation
    p.table.columns[0].color = 'blue';
    p.table.columns[1].color = 'green';

    expect(p.table.columns[0].color).toBe('blue');
    expect(p.table.columns[1].color).toBe('green');

    p.addRow({ col1: 'changed to blue', col2: 'changed to green' });
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle row and column color combinations', () => {
    const p = new Table({
      columns: [
        { name: 'red_col', color: 'red' },
        { name: 'blue_col', color: 'blue' }
      ]
    });

    p.addRows([
      { red_col: 'red column', blue_col: 'blue column' },
      { red_col: 'with green row', blue_col: 'with green row' }, { color: 'green' },
      { red_col: 'with yellow row', blue_col: 'with yellow row' }, { color: 'yellow' }
    ]);

    expect(p.table.columns[0].color).toBe('red');
    expect(p.table.columns[1].color).toBe('blue');

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle all available colors', () => {
    const p = new Table({
      columns: [
        { name: 'red', color: 'red' },
        { name: 'green', color: 'green' },
        { name: 'yellow', color: 'yellow' },
        { name: 'blue', color: 'blue' },
        { name: 'magenta', color: 'magenta' },
        { name: 'cyan', color: 'cyan' },
        { name: 'white', color: 'white' },
        { name: 'white_bold', color: 'white_bold' },
        { name: 'crimson', color: 'crimson' }
      ]
    });

    p.addRow({
      red: 'red text',
      green: 'green text',
      yellow: 'yellow text',
      blue: 'blue text',
      magenta: 'magenta text',
      cyan: 'cyan text',
      white: 'white text',
      white_bold: 'bold text',
      crimson: 'crimson text'
    });

    // Verify all colors are set correctly
    expect(p.table.columns[0].color).toBe('red');
    expect(p.table.columns[1].color).toBe('green');
    expect(p.table.columns[2].color).toBe('yellow');
    expect(p.table.columns[3].color).toBe('blue');
    expect(p.table.columns[4].color).toBe('magenta');
    expect(p.table.columns[5].color).toBe('cyan');
    expect(p.table.columns[6].color).toBe('white');
    expect(p.table.columns[7].color).toBe('white_bold');
    expect(p.table.columns[8].color).toBe('crimson');

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle color with unicode characters', () => {
    const p = new Table({
      columns: [
        { name: 'red_emoji', color: 'red' },
        { name: 'blue_emoji', color: 'blue' },
        { name: 'green_emoji', color: 'green' }
      ],
      charLength: {
        '❤️': 2,
        '💙': 2,
        '💚': 2
      }
    });

    p.addRows([
      { red_emoji: '❤️', blue_emoji: '💙', green_emoji: '💚' },
      { red_emoji: '❤️ text', blue_emoji: 'text 💙', green_emoji: '💚 colored' }
    ]);

    expect(p.table.columns[0].color).toBe('red');
    expect(p.table.columns[1].color).toBe('blue');
    expect(p.table.columns[2].color).toBe('green');

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle colors with different alignments and lengths', () => {
    const p = new Table({
      columns: [
        { name: 'left_red', color: 'red', alignment: 'left', maxLen: 15 },
        { name: 'center_blue', color: 'blue', alignment: 'center', maxLen: 15 },
        { name: 'right_green', color: 'green', alignment: 'right', maxLen: 15 }
      ]
    });

    const longText = 'This text is too long and will be truncated';
    p.addRows([
      { left_red: longText, center_blue: longText, right_green: longText },
      { left_red: 'short', center_blue: 'short', right_green: 'short' }
    ]);

    expect(p.table.columns[0].color).toBe('red');
    expect(p.table.columns[0].alignment).toBe('left');
    expect(p.table.columns[0].maxLen).toBe(15);

    expect(p.table.columns[1].color).toBe('blue');
    expect(p.table.columns[1].alignment).toBe('center');
    expect(p.table.columns[1].maxLen).toBe(15);

    expect(p.table.columns[2].color).toBe('green');
    expect(p.table.columns[2].alignment).toBe('right');
    expect(p.table.columns[2].maxLen).toBe(15);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  // Original test case preserved
  it('column colors are working', () => {
    // Create a table
    const p = new Table({
      columns: [
        { name: 'red_left_align_index', alignment: 'left', color: 'red' },
        { name: 'right_align_text', alignment: 'right' },
        { name: 'green_value', color: 'green' },
      ],
    });

    // add rows with color
    p.addRow(
      {
        red_left_align_index: 2,
        right_align_text: 'This row is blue',
        green_value: 10.212,
      },
      { color: 'blue' }
    );
    p.addRow(
      {
        red_left_align_index: 3,
        right_align_text: 'I would like some red wine please',
        green_value: 10.212,
      },
      { color: 'red' }
    );
    p.addRow(
      {
        red_left_align_index: 4,
        right_align_text: 'I would like some cyan wine please',
        green_value: 10.212,
      },
      { color: 'cyan' }
    );
    p.addRow(
      {
        red_left_align_index: 5,
        right_align_text: 'I would like some white_bold wine please',
        green_value: 10.212,
      },
      { color: 'white_bold' }
    );
    p.addRow(
      {
        red_left_align_index: 7,
        right_align_text: 'I would like some green gemuse please',
        green_value: 20.0,
      },
      { color: 'green' }
    );
    p.addRow(
      {
        red_left_align_index: 8,
        right_align_text: 'I would like some gelb bananen bitte',
        green_value: 100,
      },
      { color: 'yellow' }
    );

    // print
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });
});
