import { Table } from '../index';
import { getTableBody, getTableHeader } from './testUtils/getRawData';

describe('Testing line breaks in table cells', () => {
  it('does not break the table', () => {
    // Create a table
    const p = new Table({
      columns: [
        { name: 'foo', alignment: 'right' },
        { name: 'bar', alignment: 'center', minLen: 40 },
        { name: 'baz', alignment: 'left', minLen: 40 },
      ],
    });

    p.addRows([
      {
        foo: 'Sed dictum',
        bar: 'Pellentesque\rhabitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas ut scelerisque felis. Etiam ut leo fringilla lacus posuere dignissim aliquet eu nulla.\n\nEtiam placerat ultricies sollicitudin. Maecenas ultrices feugiat tempor. Nam non nisi vel diam tristique commodo. Etiam sit amet nisi sagittis, fringilla tortor sed, efficitur nisl. Maecenas tincidunt lobortis dapibus.',
        baz: `* Cras ac ligula aliquet, ultrices erat quis, laoreet lorem.
* Mauris rutrum nisi et nisl sollicitudin semper.
* Nunc laoreet felis auctor diam aliquet semper.
* Integer aliquet urna imperdiet orci pulvinar, at vulputate ante consectetur.
* Pellentesque a lectus porttitor, condimentum lacus non, venenatis lacus.`,
      },
    ]);

    // print
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should make sure each column is what its expected to be', () => {
    const table = new Table({
      shouldDisableColors: true
    })
      .addColumn('single_line')
      .addColumn('multi_line')
      .addColumn('mixed_line');

    table.addRows([
      {
        single_line: 'No newlines here',
        multi_line: 'First line\nSecond line\nThird line',
        mixed_line: 'Start text\nMiddle\nEnd text'
      }
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(table), getTableBody(table)];
    expect(renderedHeader).toEqual('│      single_line │ multi_line │ mixed_line │');
    expect(renderedBody).toEqual([
      '│ No newlines here │ First line │ Start text │',
      '│                  │     Second │     Middle │',
      '│                  │       line │   End text │',
      '│                  │ Third line │            │'
    ]);
  });
});

describe('Newline Character Handling', () => {
  it('should handle basic newline characters', () => {
    const table = new Table()
      .addColumn('single_line')
      .addColumn('multi_line')
      .addColumn('mixed_line');

    table.addRows([
      {
        single_line: 'No newlines here',
        multi_line: 'First line\nSecond line\nThird line',
        mixed_line: 'Start text\nMiddle\nEnd text'
      }
    ]);

    table.printTable();
    expect(table.render()).toMatchSnapshot();
  });

  it('should handle different types of line breaks', () => {
    const table = new Table()
      .addColumn('unix_style')
      .addColumn('windows_style')
      .addColumn('mac_style');

    table.addRows([
      {
        unix_style: 'Line 1\nLine 2\nLine 3',
        windows_style: 'Line 1\r\nLine 2\r\nLine 3',
        mac_style: 'Line 1\rLine 2\rLine 3'
      }
    ]);

    table.printTable();
    expect(table.render()).toMatchSnapshot();
  });

  it('should handle newlines with different column alignments', () => {
    const table = new Table({
      columns: [
        { name: 'left_align', alignment: 'left' },
        { name: 'center_align', alignment: 'center' },
        { name: 'right_align', alignment: 'right' }
      ]
    });

    table.addRows([
      {
        left_align: 'First\nSecond\nThird',
        center_align: 'One\nTwo\nThree',
        right_align: 'Start\nMiddle\nEnd'
      }
    ]);

    table.printTable();
    expect(table.render()).toMatchSnapshot();
  });

  it('should handle newlines with column width constraints', () => {
    const table = new Table({
      columns: [
        { name: 'narrow', maxLen: 10 },
        { name: 'medium', maxLen: 20 },
        { name: 'wide', maxLen: 30 }
      ]
    });

    table.addRows([
      {
        narrow: 'Short\ntext\nhere',
        medium: 'Medium length\ntext that spans\nmultiple lines',
        wide: 'This is a longer piece of text\nthat should span across\nmultiple lines nicely'
      }
    ]);

    table.printTable();
    expect(table.render()).toMatchSnapshot();
  });

  it('should handle complex content with mixed formatting', () => {
    const table = new Table({
      columns: [
        { name: 'list', alignment: 'left', minLen: 20 },
        { name: 'paragraph', alignment: 'left', minLen: 40 },
        { name: 'code', alignment: 'left', minLen: 30 }
      ]
    });

    table.addRows([
      {
        list: '• Item 1\n• Item 2\n• Item 3',
        paragraph: 'This is a paragraph.\nIt contains multiple sentences.\nAnd spans several lines.',
        code: 'function example() {\n  console.log("test");\n  return true;\n}'
      }
    ]);

    table.printTable();
    expect(table.render()).toMatchSnapshot();
  });

  it('should handle empty lines and whitespace', () => {
    const table = new Table()
      .addColumn('empty_lines')
      .addColumn('whitespace')
      .addColumn('mixed');

    table.addRows([
      {
        empty_lines: 'Start\n\nMiddle\n\nEnd',
        whitespace: '  Indented\n    More indented\n      Most indented',
        mixed: 'Normal\n  Indented\n\nEmpty line\n    Indented again'
      }
    ]);

    table.printTable();
    expect(table.render()).toMatchSnapshot();
  });
});
