import { Table } from '../../../index';
import { getTableBody, getTableHeader } from '../../testUtils/getRawData';

describe('Add Column Tests: Rendering', () => {
  it('should make sure each column is what its expected to be', () => {
    const p = new Table({
      shouldDisableColors: true,
    })
      .addColumn({
        name: 'complexColumn',
        alignment: 'center',
        color: 'blue',
        title: 'Complex Column',
      })
      .addColumn('simpleColumn')
      .addRow({ complexColumn: 'complexValue', simpleColumn: 'simpleValue' });

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual('│ Complex Column │ simpleColumn │');
    expect(renderedBody).toEqual(['│  complexValue  │  simpleValue │']);

    // Add snapshot test
    expect(p.render()).toMatchSnapshot();
  });

  it('should verify that addColumn preserves existing data', () => {
    const p = new Table({
      shouldDisableColors: true,
    });

    // Add initial columns and data
    p.addColumns(['col1', 'col2']).addRows([
      { col1: 'value1', col2: 'value2' },
      { col1: 'value3', col2: 'value4' },
    ]);

    // Add a new column
    p.addColumn('col3');
    p.addRows([{ col1: 'value5', col2: 'value6', col3: 'value7' }]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual('│   col1 │   col2 │   col3 │');
    expect(renderedBody).toEqual([
      '│ value1 │ value2 │        │',
      '│ value3 │ value4 │        │',
      '│ value5 │ value6 │ value7 │',
    ]);

    // Add snapshot test
    expect(p.render()).toMatchSnapshot();
  });

  it('should verify addColumn with custom properties', () => {
    const p = new Table({
      shouldDisableColors: true,
    });

    p.addColumns(['col1']).addRows([{ col1: 'value1' }]);

    // Add a column with alignment and title
    p.addColumn({
      name: 'col2',
      alignment: 'right',
      title: 'Column Two',
    });
    p.addRows([{ col1: 'value2', col2: '123' }]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual('│   col1 │ Column Two │');
    expect(renderedBody).toEqual([
      '│ value1 │            │',
      '│ value2 │        123 │',
    ]);

    // Add snapshot test
    expect(p.render()).toMatchSnapshot();
  });
});
