import { Table } from '../../../index';
import { getTableBody, getTableHeader } from '../../testUtils/getRawData';

describe('Rendered Table content verification', () => {
  it('should make sure each column is what its expected to be', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'red_left_align_index', alignment: 'left', color: 'red' },
        { name: 'right_align_text', alignment: 'right' },
        { name: 'green_value', color: 'green' },
      ],
      colorMap: {
        custom_green: '\x1b[32m', // define customized color
      },
    });

    p.addRows([
      {
        red_left_align_index: 2,
        right_align_text: 'This is my defined Green',
        green_value: 10.212,
      },
      {
        red_left_align_index: 3,
        right_align_text: 'This row is blue as well',
        green_value: 10.212,
      },
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual(
      '│ red_left_align_index │         right_align_text │ green_value │'
    );
    expect(renderedBody).toEqual([
      '│ 2                    │ This is my defined Green │      10.212 │',
      '│ 3                    │ This row is blue as well │      10.212 │',
    ]);

    // Add snapshot test
    expect(p.render()).toMatchSnapshot();
  });
});
