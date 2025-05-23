import { Table } from '../index';

describe('Testing customized colors', () => {
  it('should verify internal custom color states', () => {
    const p = new Table({
      columns: [
        { name: 'col1', color: 'custom_purple' },
        { name: 'col2', color: 'custom_orange' }
      ],
      colorMap: {
        custom_purple: '\x1b[35;1m',  // bright purple
        custom_orange: '\x1b[38;5;208m'  // orange using 256-color mode
      }
    });

    // Verify color map is properly set
    expect(p.table.colorMap.custom_purple).toBe('\x1b[35;1m');
    expect(p.table.colorMap.custom_orange).toBe('\x1b[38;5;208m');
    expect(p.table.columns[0].color).toBe('custom_purple');
    expect(p.table.columns[1].color).toBe('custom_orange');

    p.addRow({
      col1: 'Purple text',
      col2: 'Orange text'
    });

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle mixing custom and default colors', () => {
    const p = new Table({
      columns: [
        { name: 'custom_col', color: 'custom_pink' },
        { name: 'default_col', color: 'red' },
        { name: 'no_color' }
      ],
      colorMap: {
        custom_pink: '\x1b[38;5;219m'  // pink using 256-color mode
      }
    });

    p.addRows([
      {
        custom_col: 'Custom pink',
        default_col: 'Default red',
        no_color: 'No color'
      },
      {
        custom_col: 'Row override',
        default_col: 'Row override',
        no_color: 'Row override'
      }, { color: 'blue' }  // Row color override
    ]);

    expect(p.table.columns[0].color).toBe('custom_pink');
    expect(p.table.columns[1].color).toBe('red');
    expect(p.table.columns[2].color).toBeUndefined();

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle multiple custom colors in colorMap', () => {
    const p = new Table({
      columns: [
        { name: 'status', alignment: 'center' }
      ],
      colorMap: {
        success: '\x1b[38;5;40m',    // bright green
        warning: '\x1b[38;5;220m',   // bright yellow
        error: '\x1b[38;5;196m',     // bright red
        info: '\x1b[38;5;33m'        // bright blue
      }
    });

    p.addRows([
      { status: 'SUCCESS' }, { color: 'success' },
      { status: 'WARNING' }, { color: 'warning' },
      { status: 'ERROR' }, { color: 'error' },
      { status: 'INFO' }, { color: 'info' }
    ]);

    // Verify colorMap is properly set
    expect(p.table.colorMap.success).toBe('\x1b[38;5;40m');
    expect(p.table.colorMap.warning).toBe('\x1b[38;5;220m');
    expect(p.table.colorMap.error).toBe('\x1b[38;5;196m');
    expect(p.table.colorMap.info).toBe('\x1b[38;5;33m');

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle color map updates after table creation', () => {
    const p = new Table({
      columns: [
        { name: 'message', alignment: 'left' }
      ],
      colorMap: {
        custom1: '\x1b[38;5;50m'  // initial color
      }
    });

    // Add more colors after table creation
    p.table.colorMap.custom2 = '\x1b[38;5;51m';
    p.table.colorMap.custom3 = '\x1b[38;5;52m';

    p.addRows([
      { message: 'Using initial color' }, { color: 'custom1' },
      { message: 'Using added color 1' }, { color: 'custom2' },
      { message: 'Using added color 2' }, { color: 'custom3' }
    ]);

    expect(p.table.colorMap.custom1).toBe('\x1b[38;5;50m');
    expect(p.table.colorMap.custom2).toBe('\x1b[38;5;51m');
    expect(p.table.colorMap.custom3).toBe('\x1b[38;5;52m');

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle color disabling with custom colors', () => {
    const p = new Table({
      columns: [
        { name: 'col1', color: 'custom_color1' },
        { name: 'col2', color: 'red' }
      ],
      colorMap: {
        custom_color1: '\x1b[38;5;200m'
      },
      shouldDisableColors: true
    });

    p.addRows([
      {
        col1: 'Should be uncolored',
        col2: 'Should be uncolored'
      },
      {
        col1: 'Still uncolored',
        col2: 'Still uncolored'
      }, { color: 'custom_color1' }  // Should be ignored
    ]);

    // Verify colors are disabled
    expect(p.table.colorMap).toEqual({});
    
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  // Original test cases preserved
  it('Custom column colors are working', () => {
    // Create a table
    const p = new Table({
      columns: [
        { name: 'red_left_align_index', alignment: 'left', color: 'red' },
        { name: 'right_align_text', alignment: 'right' },
        { name: 'green_value', color: 'green' },
      ],
      colorMap: {
        custom_green: '\x1b[32m', // define customized color
      },
    });

    // add rows with custom color
    p.addRow(
      {
        red_left_align_index: 2,
        right_align_text: 'This is my defined Green',
        green_value: 10.212,
      },
      { color: 'custom_green' } // custom color
    );
    p.addRow(
      {
        red_left_align_index: 3,
        right_align_text: 'This row is blue as well',
        green_value: 10.212,
      },
      { color: 'blue' }
    );
    p.addRow(
      {
        red_left_align_index: 4,
        right_align_text: 'This row is green',
        green_value: 10.212,
      },
      { color: 'green' }
    );

    // print
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('Disabling color works', () => {
    // Create a table
    const p = new Table({
      columns: [
        { name: 'red_left_align_index', alignment: 'left' },
        { name: 'right_align_text', alignment: 'right' },
        { name: 'green_value' },
      ],
      shouldDisableColors: true,
    });

    // add rows with custom color
    p.addRow(
      {
        red_left_align_index: 2,
        right_align_text: 'This is my defined Green',
        green_value: 10.212,
      },
      { color: 'custom_green' } // custom color
    );
    p.addRow(
      {
        red_left_align_index: 3,
        right_align_text: 'This row is blue as well',
        green_value: 10.212,
      },
      { color: 'blue' }
    );
    p.addRow(
      {
        red_left_align_index: 4,
        right_align_text: 'This row is green',
        green_value: 10.212,
      },
      { color: 'green' }
    );

    // print
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });
});
