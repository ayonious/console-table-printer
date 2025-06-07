import { Table } from '../../../index';
import { getTableBody, getTableHeader } from '../../testUtils/getRawData';

describe('Column Color Tests', () => {
  it('should handle basic column colors', () => {
    const p = new Table()
      .addColumn({ name: 'red', color: 'red' })
      .addColumn({ name: 'green', color: 'green' })
      .addColumn({ name: 'blue', color: 'blue' });

    p.addRows([
      { red: 'Red text', green: 'Green text', blue: 'Blue text' },
      { red: '123', green: '456', blue: '789' },
    ]);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle column colors with different alignments', () => {
    const p = new Table()
      .addColumn({ name: 'left_red', color: 'red', alignment: 'left' })
      .addColumn({ name: 'center_green', color: 'green', alignment: 'center' })
      .addColumn({ name: 'right_blue', color: 'blue', alignment: 'right' });

    p.addRows([
      { left_red: 'Left', center_green: 'Center', right_blue: 'Right' },
      { left_red: '111', center_green: '222', right_blue: '333' },
    ]);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle column colors with row colors', () => {
    const p = new Table()
      .addColumn({ name: 'col1', color: 'red' })
      .addColumn({ name: 'col2', color: 'blue' });

    p.addRow({ col1: 'Red col', col2: 'Blue col' }, { color: 'green' });
    p.addRow({ col1: 'Red col', col2: 'Blue col' }, { color: 'yellow' });

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle all available colors', () => {
    const p = new Table({
      columns: [
        { name: 'color_name', alignment: 'left' },
        { name: 'sample', alignment: 'left' },
      ],
    });

    // Test all available colors
    const colors = [
      'red',
      'green',
      'yellow',
      'blue',
      'magenta',
      'cyan',
      'white',
      'crimson',
      'white_bold',
      'gray',
    ];

    colors.forEach((color) => {
      p.addRow(
        {
          color_name: color,
          sample: 'Sample Text',
        },
        { color }
      );
    });

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  // Original comprehensive test renamed for clarity
  it('should handle complex color combinations with mixed alignments', () => {
    const p = new Table({
      columns: [
        { name: 'red_left_align_index', alignment: 'left', color: 'red' },
        { name: 'right_align_text', alignment: 'right' },
        { name: 'green_value', color: 'green' },
      ],
    });

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

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });
});
