import { renderTable } from '../../src/internalTable/internal-table-printer';
import { Table } from '../../index';

describe('Testing column alignment', () => {
  it('should handle basic alignment with mixed content types', () => {
    const p = new Table({
      columns: [
        { name: 'numbers', alignment: 'right' },
        { name: 'text', alignment: 'left' },
        { name: 'mixed', alignment: 'center' },
      ],
    });

    p.addRows([
      {
        numbers: 12345.67,
        text: 'Regular text',
        mixed: '!@#$%',
      },
      {
        numbers: -987.65,
        text: 'Left aligned',
        mixed: '12ABC',
      },
      {
        numbers: 0,
        text: 'Simple',
        mixed: '✓✗',
      },
    ]);

    const returned = renderTable(p.table);
    expect(returned).toMatchSnapshot();
    console.log(returned);
  });

  it('should handle alignment with Unicode and emojis', () => {
    const p = new Table({
      columns: [
        { name: 'leftEmoji', alignment: 'left', color: 'yellow' },
        { name: 'centerUnicode', alignment: 'center', color: 'cyan' },
        { name: 'rightMixed', alignment: 'right', color: 'green' },
      ],
    });

    p.addRows([
      {
        leftEmoji: '👋 Hello',
        centerUnicode: '♠♣♥♦',
        rightMixed: 'End 🎉',
      },
      {
        leftEmoji: '🌟 Star',
        centerUnicode: '→←↑↓',
        rightMixed: '⚡ Flash',
      },
      {
        leftEmoji: '🎨 Art',
        centerUnicode: '❤️💔💖',
        rightMixed: 'Done ✅',
      },
    ]);

    const returned = renderTable(p.table);
    expect(returned).toMatchSnapshot();
    console.log(returned);
  });

  it('should handle alignment with dynamic width columns', () => {
    const p = new Table({
      columns: [
        { name: 'narrow', alignment: 'left', maxLen: 10 },
        { name: 'wide', alignment: 'center', minLen: 30 },
        { name: 'adaptive', alignment: 'right' },
      ],
    });

    p.addRows([
      {
        narrow: 'Short',
        wide: 'This is centered in a wide column',
        adaptive: 'Right',
      },
      {
        narrow: 'Truncated Text',
        wide: 'Center',
        adaptive: 'This will push column width',
      },
      {
        narrow: 'ABC',
        wide: 'Wide center',
        adaptive: '12345',
      },
    ]);

    const returned = renderTable(p.table);
    expect(returned).toMatchSnapshot();
    console.log(returned);
  });

  it('should handle alignment with multi-line content', () => {
    const p = new Table({
      columns: [
        { name: 'leftList', alignment: 'left' },
        { name: 'centerParagraph', alignment: 'center' },
        { name: 'rightCode', alignment: 'right' },
      ],
    });

    p.addRows([
      {
        leftList: '• First\n• Second\n• Third',
        centerParagraph: 'Title\nContent\nFooter',
        rightCode: 'function() {\n  return;\n}',
      },
      {
        leftList: '1. One\n2. Two',
        centerParagraph: 'Start\nEnd',
        rightCode: 'x = 1;\ny = 2;',
      },
    ]);

    const returned = renderTable(p.table);
    expect(returned).toMatchSnapshot();
    console.log(returned);
  });

  it('should handle alignment with mixed colors and styles', () => {
    const p = new Table({
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

    const returned = renderTable(p.table);
    expect(returned).toMatchSnapshot();
    console.log(returned);
  });
});
