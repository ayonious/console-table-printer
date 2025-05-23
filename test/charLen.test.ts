import { Table } from '../index';

describe('Example: Print a simple Table with Custom char len', () => {
  it('Custom char len is working', () => {
    // Create a table
    const p = new Table({
      charLength: {
        '👋': 2,
        '😅': 2,
        '🚌': 2,
        '👩‍👩‍👧': 2,
      },
    });

    // add rows with color
    p.addRows([
      // adding multiple rows are possible
      {
        Description: '👩‍👩‍👧',
        emoji: '😅',
      },
    ]);

    // print
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });
});

describe('Testing character length handling', () => {
  it('should handle basic emoji character lengths', () => {
    const p = new Table({
      charLength: {
        '👋': 2,
        '😅': 2,
        '🚌': 2,
        '👩‍👩‍👧': 2,
      },
    });

    p.addRows([
      {
        Description: '👩‍👩‍👧',
        emoji: '😅',
      },
    ]);

    // Verify internal state
    expect(p.table.charLength['👋']).toBe(2);
    expect(p.table.charLength['😅']).toBe(2);
    
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle mixed text and emoji content', () => {
    const p = new Table({
      charLength: {
        '🌟': 2,
        '📝': 2
      },
      columns: [
        { name: 'mixed_content', maxLen: 20 }
      ]
    });

    p.addRows([
      { mixed_content: 'Hello 🌟 World' },
      { mixed_content: '📝 Notes here' },
      { mixed_content: 'Regular text' }
    ]);

    expect(p.table.charLength['🌟']).toBe(2);
    expect(p.table.charLength['📝']).toBe(2);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle multiple emoji in sequence', () => {
    const p = new Table({
      charLength: {
        '😀': 2,
        '😃': 2,
        '😄': 2
      }
    });

    p.addColumn({ name: 'emoji_sequence', maxLen: 15 });
    p.addRows([
      { emoji_sequence: '😀😃😄' },
      { emoji_sequence: '😀 😃 😄' }
    ]);

    // Each emoji should count as 2 characters
    expect(p.table.charLength['😀']).toBe(2);
    expect(p.table.charLength['😃']).toBe(2);
    expect(p.table.charLength['😄']).toBe(2);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle complex unicode characters', () => {
    const p = new Table({
      charLength: {
        '👨‍👩‍👧‍👦': 2,  // Family emoji
        '🏳️‍🌈': 2,      // Rainbow flag
        '👨‍💻': 2       // Man technologist
      },
      columns: [
        { name: 'complex_unicode', maxLen: 25 }
      ]
    });

    p.addRows([
      { complex_unicode: 'Family: 👨‍👩‍👧‍👦' },
      { complex_unicode: 'Pride: 🏳️‍🌈' },
      { complex_unicode: 'Work: 👨‍💻' }
    ]);

    // Verify complex unicode handling
    expect(p.table.charLength['👨‍👩‍👧‍👦']).toBe(2);
    expect(p.table.charLength['🏳️‍🌈']).toBe(2);
    expect(p.table.charLength['👨‍💻']).toBe(2);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle dynamic charLength updates', () => {
    const p = new Table({
      charLength: {
        '🌍': 2
      }
    });

    // Add more character lengths after table creation
    p.table.charLength['🌎'] = 2;
    p.table.charLength['🌏'] = 2;

    p.addColumn('planets');
    p.addRows([
      { planets: '🌍 Earth' },
      { planets: '🌎 Americas' },
      { planets: '🌏 Asia' }
    ]);

    expect(p.table.charLength['🌍']).toBe(2);
    expect(p.table.charLength['🌎']).toBe(2);
    expect(p.table.charLength['🌏']).toBe(2);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });
});
