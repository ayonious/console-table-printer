import { COLOR, Table, ALIGNMENT } from '../index';
import { getTableBody, getTableHeader } from './testUtils/getRawData';

describe('Testing column alignment', () => {
  it('all kind of alignments are working', () => {
    // Create a table

    const red_color: COLOR = 'red';
    const green_color: COLOR = 'green';
    const left_alignment: ALIGNMENT = 'left';
    const center_alignment: ALIGNMENT = 'center';

    const p = new Table({
      columns: [
        {
          name: 'red_left_align_index',
          alignment: 'left',
          color: red_color,
        },
        { name: 'right_align_text', alignment: left_alignment },
        {
          name: 'green_value_center',
          alignment: center_alignment,
          color: green_color,
        },
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
    // print
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should allow chaining add methods', () => {
    const p = new Table()
      .addColumn('foo')
      .addColumns(['bar'])
      .addRow({ foo: '1' })
      .addRows([{ bar: '2' }]);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should make sure each column is what its expected to be', () => {
    const red_color: COLOR = 'red';
    const green_color: COLOR = 'green';
    const left_alignment: ALIGNMENT = 'left';
    const center_alignment: ALIGNMENT = 'center';

    const p = new Table({
      shouldDisableColors: true,
      columns: [
        {
          name: 'red_left_align_index',
          alignment: 'left',
          color: red_color,
        },
        { name: 'right_align_text', alignment: left_alignment },
        {
          name: 'green_value_center',
          alignment: center_alignment,
          color: green_color,
        },
      ],
    });

    p.addRow({
      red_left_align_index: 2,
      right_align_text: 'This row is blue',
      green_value_center: 10.212,
    });

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual(
      '│ red_left_align_index │ right_align_text │ green_value_center │'
    );
    expect(renderedBody).toEqual([
      '│ 2                    │ This row is blue │       10.212       │',
    ]);
  });
});
