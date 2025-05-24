import { Table } from '../index';

describe('Example: Print a simple Table with cell colors', () => {
  it('foreign alphabets are working', () => {
    // Create a table
    const p = new Table();

    // add rows with color
    p.addRows([
      // adding multiple rows are possible
      {
        Description: 'Some alphabets 这里是中文这里是中文这里是中文',
        'Ticket No': 'ISSUE-1231',
      },
      {
        Description: 'Some Summary 这里是中文这里是中文',
        'Ticket No': 'ISSUE-22222',
      },
      {
        Description: 'Description 这里是中文',
        'Ticket No': 'ISSUE-Foreign',
      },
    ]);

    // print
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('coloring is working', () => {
    // Create a table
    const p = new Table();

    p.addRow(
      {
        'Ticket No': 'ISSUE-1231',
        Description: 'Some alphabets 这里是中文这里是中文这里是中文',
      },
      { color: 'blue' }
    );

    p.addRow(
      {
        'Ticket No': 'ISSUE-22222',
        Description: 'Some Summary 这里是中文这里是中文',
      },
      { color: 'red' }
    );

    p.addRow(
      {
        'Ticket No': 'ISSUE-1',
        Description: 'Description 这里是中文',
      },
      { color: 'white_bold' }
    );
    // print
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });

  it('customized border is working', () => {
    // Create a table
    const p = new Table({
      style: {
        /*
            Style: (red)
            ╔══════╦═════╦══════╗
            ║ hob  ║ foo ║ mia  ║
            ╟══════╬═════╬══════╢
            ║ ball ║ fox ║ mama ║
            ╚══════╩═════╩══════╝
            */
        headerTop: {
          left: '\x1b[31m╔\x1b[0m',
          mid: '\x1b[31m╦\x1b[0m',
          right: '\x1b[31m╗\x1b[0m',
          other: '\x1b[31m═\x1b[0m',
        },
        headerBottom: {
          left: '\x1b[31m╟\x1b[0m',
          mid: '\x1b[31m╬\x1b[0m',
          right: '\x1b[31m╢\x1b[0m',
          other: '\x1b[31m═\x1b[0m',
        },
        tableBottom: {
          left: '\x1b[31m╚\x1b[0m',
          mid: '\x1b[31m╩\x1b[0m',
          right: '\x1b[31m╝\x1b[0m',
          other: '\x1b[31m═\x1b[0m',
        },
        vertical: '\x1b[31m║\x1b[0m',
      },
    });

    p.addRow(
      {
        'Ticket No': 'ISSUE-1231',
        Description: 'Some alphabets 这里是中文这里是中文这里是中文',
      },
      { color: 'blue' }
    );

    p.addRow(
      {
        'Ticket No': 'ISSUE-22222',
        Description: 'Some Summary 这里是中文这里是中文',
      },
      { color: 'red' }
    );

    p.addRow(
      {
        'Ticket No': 'ISSUE-1',
        Description: 'Description 这里是中文',
      },
      { color: 'white_bold' }
    );
    // print
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });
});

describe('Foreign Language and Special Character Support', () => {
  it('should handle Chinese characters correctly', () => {
    const table = new Table()
      .addColumn('description')
      .addColumn('identifier');

    table.addRows([
      {
        description: '简单的中文',
        identifier: 'BASIC-001',
      },
      {
        description: '这是一个较长的中文句子，包含标点符号。',
        identifier: 'LONG-002',
      },
      {
        description: '混合 Chinese 和 English 文字',
        identifier: 'MIXED-003',
      }
    ]);

    table.printTable();
    expect(table.render()).toMatchSnapshot();
  });

  it('should handle various Unicode characters', () => {
    const table = new Table()
      .addColumn('language')
      .addColumn('text')
      .addColumn('description');

    table.addRows([
      {
        language: 'Japanese',
        text: 'こんにちは世界',
        description: 'Hello World in Japanese'
      },
      {
        language: 'Korean',
        text: '안녕하세요',
        description: 'Hello in Korean'
      },
      {
        language: 'Arabic',
        text: 'مرحبا بالعالم',
        description: 'Hello World in Arabic'
      },
      {
        language: 'Russian',
        text: 'Привет мир',
        description: 'Hello World in Russian'
      },
      {
        language: 'Greek',
        text: 'Γεια σας κόσμε',
        description: 'Hello World in Greek'
      }
    ]);

    table.printTable();
    expect(table.render()).toMatchSnapshot();
  });

  it('should handle mixed text with emojis', () => {
    const table = new Table()
      .addColumn('category')
      .addColumn('content')
      .addColumn('emoji');

    table.addRows([
      {
        category: 'Greeting',
        content: 'Hello 你好 안녕하세요',
        emoji: '👋'
      },
      {
        category: 'Food',
        content: '寿司 🍣 초밥',
        emoji: '🍱'
      },
      {
        category: 'Weather',
        content: '晴れ ☀️ 맑음',
        emoji: '🌤'
      }
    ]);

    table.printTable();
    expect(table.render()).toMatchSnapshot();
  });

  it('should handle text with different directionality', () => {
    const table = new Table()
      .addColumn('direction')
      .addColumn('content')
      .addColumn('description');

    table.addRows([
      {
        direction: 'LTR',
        content: 'English text',
        description: 'Left-to-right text'
      },
      {
        direction: 'RTL',
        content: 'نص عربي',
        description: 'Right-to-left text'
      },
      {
        direction: 'Mixed',
        content: 'Hello مرحبا 你好',
        description: 'Mixed direction text'
      }
    ]);

    table.printTable();
    expect(table.render()).toMatchSnapshot();
  });

  it('should handle special characters and symbols', () => {
    const table = new Table()
      .addColumn('type')
      .addColumn('symbols')
      .addColumn('description');

    table.addRows([
      {
        type: 'Mathematical',
        symbols: '∑∏∆∇∫√',
        description: 'Math symbols'
      },
      {
        type: 'Currency',
        symbols: '¥€$₹£₽',
        description: 'Currency symbols'
      },
      {
        type: 'Punctuation',
        symbols: '¡¿—–…',
        description: 'Special punctuation'
      },
      {
        type: 'Diacritics',
        symbols: 'áéíóúñ',
        description: 'Letters with accents'
      }
    ]);

    table.printTable();
    expect(table.render()).toMatchSnapshot();
  });
});
