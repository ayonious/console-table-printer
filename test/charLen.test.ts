import { Table } from '../index';
import { getTableBody, getTableHeader } from './testUtils/getRawData';

describe('Character Length Handling Tests', () => {
  it('should handle basic emoji characters with custom lengths', () => {
    const p = new Table({
      charLength: {
        '👍': 2,
        '❤️': 2,
        '🌟': 2
      }
    });

    p.addRows([
      { name: 'Like', emoji: '👍', description: 'Thumbs up' },
      { name: 'Love', emoji: '❤️', description: 'Heart' },
      { name: 'Star', emoji: '🌟', description: 'Star rating' }
    ]);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle complex emoji combinations', () => {
    const p = new Table({
      charLength: {
        '👨‍👩‍👧‍👦': 2,  // Family
        '🏃‍♂️': 2,     // Man running
        '👩‍💻': 2,     // Woman technologist
        '🌈': 2        // Rainbow
      }
    });

    p.addRows([
      { type: 'Family', emoji: '👨‍👩‍👧‍👦', description: 'Complete family' },
      { type: 'Activity', emoji: '🏃‍♂️', description: 'Running person' },
      { type: 'Profession', emoji: '👩‍💻', description: 'Developer' },
      { type: 'Symbol', emoji: '🌈', description: 'Rainbow' }
    ]);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle mixed emoji and text content', () => {
    const p = new Table({
      charLength: {
        '🎉': 2,
        '📝': 2,
        '⭐': 1,
        '✨': 1
      }
    });

    p.addRows([
      { 
        title: 'Celebration 🎉',
        content: 'Party time!',
        rating: '⭐⭐⭐'
      },
      { 
        title: 'Notes 📝',
        content: 'Take notes',
        rating: '⭐⭐'
      },
      { 
        title: 'Special ✨',
        content: 'Sparkles',
        rating: '⭐'
      }
    ]);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle emoji with different width specifications', () => {
    const p = new Table({
      charLength: {
        '🌍': 3,  // Extra wide
        '📱': 2,  // Standard wide
        '•': 1,   // Normal width
        '→': 1    // Normal width
      }
    });

    p.addRows([
      { 
        symbol: '🌍',
        description: 'Globe (width: 3)',
        example: '🌍 World'
      },
      { 
        symbol: '📱',
        description: 'Phone (width: 2)',
        example: '📱 Mobile'
      },
      { 
        symbol: '•',
        description: 'Bullet (width: 1)',
        example: '• Point'
      },
      { 
        symbol: '→',
        description: 'Arrow (width: 1)',
        example: '→ Next'
      }
    ]);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should handle emojis in different column alignments', () => {
    const p = new Table({
      columns: [
        { name: 'left', alignment: 'left' },
        { name: 'center', alignment: 'center' },
        { name: 'right', alignment: 'right' }
      ],
      charLength: {
        '🎯': 2,
        '🎨': 2,
        '🎲': 2
      }
    });

    p.addRows([
      { 
        left: '🎯 Target',
        center: '🎨 Art',
        right: '🎲 Game'
      },
      { 
        left: 'Target 🎯',
        center: 'Art 🎨',
        right: 'Game 🎲'
      }
    ]);

    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('should make sure each column is what its expected to be', () => {
    const p = new Table({
      shouldDisableColors: true,
      charLength: {
        '🎯': 2,
        '🎨': 2,
        '🎲': 2
      },
      columns: [
        { name: 'left', alignment: 'left' },
        { name: 'center', alignment: 'center' },
        { name: 'right', alignment: 'right' }
      ]
    });

    p.addRows([
      { 
        left: '🎯 Target',
        center: '🎨 Art',
        right: '🎲 Game'
      },
      { 
        left: 'Target 🎯',
        center: 'Art 🎨',
        right: 'Game 🎲'
      }
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual('│ left      │ center │   right │');
    expect(renderedBody).toEqual([
      '│ 🎯 Target │ 🎨 Art │ 🎲 Game │',
      '│ Target 🎯 │ Art 🎨 │ Game 🎲 │'
    ]);
  });

  it('should verify that columns maintain consistent width with different character lengths', () => {
    const p = new Table({
      shouldDisableColors: true,
      charLength: {
        '👍': 2,  // Thumbs up
        '🌟': 2,  // Star
        '❤️': 2,  // Heart
        '→': 1,   // Arrow
        '•': 1    // Bullet
      },
      columns: [
        { name: 'emoji_start', alignment: 'left', minLen: 12 },
        { name: 'emoji_middle', alignment: 'center', minLen: 12 },
        { name: 'emoji_end', alignment: 'right', minLen: 12 }
      ]
    });

    p.addRows([
      {
        emoji_start: '👍 Text',
        emoji_middle: 'Text 🌟 Text',
        emoji_end: 'Text ❤️'
      },
      {
        emoji_start: '→ Normal',
        emoji_middle: '• Center •',
        emoji_end: 'End →'
      }
    ]);

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual('│ emoji_start  │ emoji_middle │    emoji_end │');
    expect(renderedBody).toEqual([
      '│ 👍 Text      │ Text 🌟 Text │      Text ❤️ │',
      '│ → Normal     │ • Center •  │        End → │'
    ]);
  });
});
