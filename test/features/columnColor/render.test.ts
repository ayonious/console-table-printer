import { Table } from '../../../index';
import { getTableBody, getTableHeader } from '../../testUtils/getRawData';

describe('Column Color Tests: Rendering', () => {
  it('should make sure each column is what its expected to be', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'red_left_align_index', alignment: 'left', color: 'red' },
        { name: 'right_align_text', alignment: 'right' },
        { name: 'green_value', color: 'green' },
      ],
    });

    p.addRows([
      {
        red_left_align_index: 2,
        right_align_text: 'This row is blue',
        green_value: 10.212,
      },
      {
        red_left_align_index: 3,
        right_align_text: 'I would like some red wine please',
        green_value: 10.212,
      },
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual(
      '│ red_left_align_index │                  right_align_text │ green_value │'
    );
    expect(renderedBody).toEqual([
      '│ 2                    │                  This row is blue │      10.212 │',
      '│ 3                    │ I would like some red wine please │      10.212 │',
    ]);

    // Add snapshot test
    expect(p.render()).toMatchSnapshot();
  });
});
