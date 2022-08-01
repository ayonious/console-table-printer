import { renderTable } from '../../src/internalTable/internal-table-printer';
import { Table } from '../../index';

describe('Testing column alignment', () => {
  it('all kind of alignments are working', () => {
    // Create a table
    const p = new Table({
      title: 'Some Random Title',
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
        red_left_align_index: 6,
        right_align_text: 'I would like some crimson sky please',
        green_value_center: 10.212,
      },
      { color: 'crimson' }
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
    const returned = renderTable(p.table);
    expect(returned).toMatchSnapshot();
    console.log(returned);
  });

  it('Simpler title test', () => {
    // Create a table
    const p = new Table({
      title: 'Some Random Title',
      columns: [
        { name: 'red_left_align_index', alignment: 'left' },
        { name: 'green_value_center', alignment: 'center', color: 'green' },
        { name: 'col1' },
        { name: 'col2' },
        { name: 'col2' },
      ],
    });

    // add rows with color
    p.addRow({
      red_left_align_index: 3,
      green_value_center: 10.212,
    });
    p.addRow({
      red_left_align_index: 4,
      green_value_center: 10.212,
    });
    p.addRow({
      red_left_align_index: 5,
      green_value_center: 10.212,
    });

    // print
    const returned = renderTable(p.table);
    expect(returned).toMatchSnapshot();
    console.log(returned);
  });
});
