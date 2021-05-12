import { Table } from '../index';

describe('Testing column max Width', () => {
  it('Simple Line Limit', () => {
    // Create a table
    const p = new Table({
      columns: [
        { name: 'red_left_align_index', alignment: 'left', color: 'red' },
        { name: 'right_align_text', alignment: 'right', maxLen: 10 },
        { name: 'green', alignment: 'center', color: 'green' },
      ],
    });

    // add rows with color
    p.addRow(
      {
        red_left_align_index: 2,
        right_align_text: 'This row is blue',
        green: 10.212,
      },
      { color: 'blue' }
    );
    p.addRow(
      {
        red_left_align_index: 3,
        right_align_text: 'I would like some red wine please',
        green: 10.212,
      },
      { color: 'red' }
    );
    p.addRow(
      {
        red_left_align_index: 4,
        right_align_text: 'I would like some cyan wine please',
        green: 10.212,
      },
      { color: 'cyan' }
    );
    p.addRow(
      {
        red_left_align_index: 5,
        right_align_text: 'I would like some white_bold wine please',
        green: 10.212,
      },
      { color: 'white_bold' }
    );
    p.addRow(
      {
        red_left_align_index: 6,
        right_align_text: 'I would like some crimson sky please',
        green: 10.212,
      },
      { color: 'crimson' }
    );
    p.addRow(
      {
        red_left_align_index: 7,
        right_align_text: 'I would like some green gemuse please',
        green: 20.0,
      },
      { color: 'green' }
    );
    p.addRow(
      {
        red_left_align_index: 8,
        right_align_text: 'I would like some gelb bananen bitte',
        green: 100,
      },
      { color: 'yellow' }
    );

    // print
    expect(p.render()).toMatchSnapshot();
    p.printTable();
  });

  it('Max Line Limit', () => {
    // Create a table
    const p = new Table({
      columns: [
        {
          name: 'center_left_align_index',
          alignment: 'center',
          color: 'red',
          title: 'Index',
        },
        {
          name: 'right_align_text',
          alignment: 'right',
          maxLen: 10,
          title: 'maxLen:10',
        },
        {
          name: 'green_center_align',
          alignment: 'center',
          color: 'green',
          maxLen: 8,
          title: 'maxLen:8',
        },
      ],
    });

    // add rows with color
    p.addRow({
      center_left_align_index: 1,
      right_align_text: 'This row is blue',
      green_center_align: 'This row is green column',
    });

    p.addRow({
      center_left_align_index: 10,
      right_align_text: 'This row is blue but again another line',
      green_center_align:
        'This row is green column but a little longer to make life harder',
    });

    p.addRow({
      center_left_align_index: 2,
      right_align_text: 'The last one I dont know what the color is',
      green_center_align: 'Thank god this is the last one',
    });

    // print
    expect(p.render()).toMatchSnapshot();
    p.printTable();
  });

  it('Min Line Limit', () => {
    // Create a table
    const p = new Table({
      columns: [
        {
          name: 'right_align_text',
          alignment: 'right',
          minLen: 100,
          title: 'MnWid:100,align:r',
        },
        {
          name: 'green_center_align',
          alignment: 'center',
          color: 'green',
          minLen: 20,
          title: 'MnWid:20,align:c',
        },
      ],
    });

    // add rows with color
    p.addRow({
      right_align_text: 'This row is blue',
      green_center_align: 'This row is green column',
    });

    p.addRow({
      right_align_text: 'This row is blue',
      green_center_align:
        'This row is green column but a little longer to make life harder',
    });

    p.addRow({
      right_align_text: 'The last one',
      green_center_align: 'Thank god this is the last one',
    });

    // print
    expect(p.render()).toMatchSnapshot();
    p.printTable();
  });

  it('Min/Max Line Limit', () => {
    // Create a table
    const p = new Table({
      columns: [
        {
          name: 'center_left_align_index',
          alignment: 'center',
          color: 'red',
          title: 'Index',
        },
        {
          name: 'right_align_text',
          alignment: 'right',
          minLen: 20,
          title: 'MinWidth:20',
        },
        {
          name: 'green_center_align',
          alignment: 'center',
          color: 'green',
          minLen: 10,
          maxLen: 15,
          title: 'MinWidth:10,max:15',
        },
      ],
    });

    // add rows with color
    p.addRow({
      center_left_align_index: 1,
      right_align_text: 'This row is blue',
      green_center_align: 'This row is green column',
    });

    p.addRow({
      center_left_align_index: 10,
      right_align_text: 'This row is blue but again another line',
      green_center_align:
        'This row is green column but a little longer to make life harder',
    });

    p.addRow({
      center_left_align_index: 2,
      right_align_text: 'The last one I dont know what the color is',
      green_center_align: 'Thank god this is the last one',
    });

    // print
    expect(p.render()).toMatchSnapshot();
    p.printTable();
  });
});
