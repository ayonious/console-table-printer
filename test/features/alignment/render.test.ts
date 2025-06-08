import { Table } from '../../../index';
import { getTableBody, getTableHeader } from '../../testUtils/getRawData';

describe('Alignment Tests: Rendering', () => {
  it('should render left-aligned content', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'very_long_text_column_name_for_testing', alignment: 'left' },
        { name: 'another_long_value_column_name', alignment: 'left' },
      ],
    });

    p.addRows([
      {
        very_long_text_column_name_for_testing: 'Left Text',
        another_long_value_column_name: 123,
      },
      {
        very_long_text_column_name_for_testing: 'Another Left',
        another_long_value_column_name: 456,
      },
      {
        very_long_text_column_name_for_testing: 'Third Row',
        another_long_value_column_name: 789,
      },
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual(
      '│ very_long_text_column_name_for_testing │ another_long_value_column_name │'
    );
    expect(renderedBody).toEqual([
      '│ Left Text                              │ 123                            │',
      '│ Another Left                           │ 456                            │',
      '│ Third Row                              │ 789                            │',
    ]);

    // Add snapshot test
    expect(p.render()).toMatchSnapshot();
  });

  it('should render right-aligned content', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'long_text_column_right_aligned', alignment: 'right' },
        { name: 'numeric_value_right_aligned', alignment: 'right' },
      ],
    });

    p.addRows([
      {
        long_text_column_right_aligned: 'Right Text',
        numeric_value_right_aligned: 123,
      },
      {
        long_text_column_right_aligned: 'More Right',
        numeric_value_right_aligned: 456,
      },
      {
        long_text_column_right_aligned: 'Last Right',
        numeric_value_right_aligned: 789,
      },
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual(
      '│ long_text_column_right_aligned │ numeric_value_right_aligned │'
    );
    expect(renderedBody).toEqual([
      '│                     Right Text │                         123 │',
      '│                     More Right │                         456 │',
      '│                     Last Right │                         789 │',
    ]);

    // Add snapshot test
    expect(p.render()).toMatchSnapshot();
  });

  it('should render center-aligned content', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'centered_text_column_name', alignment: 'center' },
        { name: 'centered_value_column', alignment: 'center' },
      ],
    });

    p.addRows([
      { centered_text_column_name: 'Center Text', centered_value_column: 123 },
      { centered_text_column_name: 'Middle Row', centered_value_column: 456 },
      { centered_text_column_name: 'Last Center', centered_value_column: 789 },
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual(
      '│ centered_text_column_name │ centered_value_column │'
    );
    expect(renderedBody).toEqual([
      '│        Center Text        │          123          │',
      '│        Middle Row         │          456          │',
      '│        Last Center        │          789          │',
    ]);

    // Add snapshot test
    expect(p.render()).toMatchSnapshot();
  });

  it('should render mixed alignments', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'left_aligned_column', alignment: 'left' },
        { name: 'right_aligned_column', alignment: 'right' },
        { name: 'center_aligned_column', alignment: 'center' },
      ],
    });

    p.addRows([
      {
        left_aligned_column: 'Left Text',
        right_aligned_column: 'Right Text',
        center_aligned_column: 'Center Text',
      },
      {
        left_aligned_column: 'Left2 Long',
        right_aligned_column: 'Right2 Long',
        center_aligned_column: 'Center2 Long',
      },
      {
        left_aligned_column: 'Left3 Longer',
        right_aligned_column: 'Right3 Longer',
        center_aligned_column: 'Center3 Longer',
      },
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual(
      '│ left_aligned_column │ right_aligned_column │ center_aligned_column │'
    );
    expect(renderedBody).toEqual([
      '│ Left Text           │           Right Text │      Center Text      │',
      '│ Left2 Long          │          Right2 Long │     Center2 Long      │',
      '│ Left3 Longer        │        Right3 Longer │    Center3 Longer     │',
    ]);

    // Add snapshot test
    expect(p.render()).toMatchSnapshot();
  });
});
