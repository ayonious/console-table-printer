# console-table-printer

> 🖥️🍭 Making your console output beautiful with colorful tables!

![NPM Downloads](https://img.shields.io/npm/dw/console-table-printer)
[![install size](https://packagephobia.com/badge?p=console-table-printer)](https://packagephobia.com/result?p=console-table-printer)
[![npm version](https://badge.fury.io/js/console-table-printer.svg)](https://badge.fury.io/js/console-table-printer)
[![codecov](https://codecov.io/gh/console-table-printer/console-table-printer/graph/badge.svg?token=SWX9VBuYUs)](https://codecov.io/gh/console-table-printer/console-table-printer)

## 📢 Important Notice

> **The official documentation has moved!**  
> Visit our new documentation site at [console-table.netlify.app/docs](https://console-table.netlify.app/docs) for:
> - Complete API reference
> - Advanced usage examples
> - Configuration options
> - Styling guide
> - TypeScript support
> - And more!

This README provides quick examples to get you started. For detailed documentation, please visit our [new documentation site](https://console-table.netlify.app/docs).

## 📦 Installation

```bash
npm install console-table-printer --save
```

## 🚀 Quick Start

### Basic Features

```javascript
import { printTable } from 'console-table-printer';

// Demonstrating basic table features
const tableFeatures = [
  { id: 1, name: 'DEFAULT_ALIGN', description: 'Text aligns left' },
  { id: 2, name: 'TRUNCATED_TEXT', description: 'Long text gets truncated' },
  { id: 3, name: 'NUMBER_ALIGN', amount: 1234.56, note: 'Numbers align right' },
  { id: 4, name: 'EMPTY_CELL', amount: null, note: 'Empty shows blank' },
];

printTable(tableFeatures);
```

### Colors and Alignment

```javascript
import { Table } from 'console-table-printer';

// Create a table demonstrating colors and alignment
const table = new Table({
  columns: [
    { name: 'feature', title: 'FEATURE', alignment: 'left' },
    { name: 'example', title: 'EXAMPLE', alignment: 'center' },
    { name: 'description', title: 'DESCRIPTION', alignment: 'right' },
  ],
});

// Add rows showing different features
table.addRow(
  { feature: 'RED_COLOR', example: 'Error State', description: 'Used for errors/warnings' },
  { color: 'red' }
);
table.addRow(
  { feature: 'GREEN_COLOR', example: 'Success State', description: 'Used for success states' },
  { color: 'green' }
);
table.addRow(
  { feature: 'CENTER_ALIGN', example: 'I AM CENTERED', description: 'This column is center-aligned' },
  { color: 'yellow' }
);
table.addRow(
  { feature: 'RIGHT_ALIGN', example: '12345', description: 'This column is right-aligned' },
  { color: 'blue' }
);

table.printTable();
```

### Advanced Features

```javascript
import { Table } from 'console-table-printer';

// Table demonstrating advanced features
const advancedTable = new Table({
  title: 'TITLE_DEMONSTRATION',
  columns: [
    { name: 'feature', title: 'FEATURE', alignment: 'left', color: 'cyan' },
    { name: 'value', title: 'VALUE', alignment: 'center', maxLen: 20 },
    { name: 'notes', title: 'NOTES', alignment: 'right' },
  ],
});

advancedTable.addRows([
  { 
    feature: 'COLUMN_COLOR', 
    value: 'Cyan Column', 
    notes: 'This column is always cyan' 
  },
  { 
    feature: 'MAX_LENGTH', 
    value: 'This text will be truncated because maxLen is set to 20 characters', 
    notes: 'Prevents long text overflow' 
  },
  { 
    feature: 'MIXED_CONTENT',
    value: '12345',
    notes: 'Numbers and text mixed'
  },
  { 
    feature: 'CUSTOM_STYLE',
    value: 'Special Format',
    notes: 'Using multiple features'
  },
], { color: 'magenta' });

advancedTable.printTable();
```

### Practical Example

```javascript
import { Table } from 'console-table-printer';

// A practical example combining multiple features
const systemStatus = new Table({
  title: 'SYSTEM STATUS DASHBOARD',
  columns: [
    { name: 'service', title: 'SERVICE', alignment: 'left' },
    { name: 'status', title: 'STATUS', alignment: 'center' },
    { name: 'response', title: 'RESPONSE TIME', alignment: 'right' },
  ],
});

systemStatus.addRow(
  { service: 'Database', status: 'ONLINE', response: '45ms' },
  { color: 'green' }
);
systemStatus.addRow(
  { service: 'API Server', status: 'WARNING', response: '120ms' },
  { color: 'yellow' }
);
systemStatus.addRow(
  { service: 'Cache', status: 'OFFLINE', response: 'N/A' },
  { color: 'red' }
);
systemStatus.addRow(
  { service: 'CDN', status: 'ONLINE', response: '20ms' },
  { color: 'green' }
);

systemStatus.printTable();
```

## 📚 Complete Documentation

The examples above are just the beginning! For comprehensive documentation, visit our official documentation site:

🔗 [console-table.netlify.app/docs](https://console-table.netlify.app/docs)

There you'll find:
- Complete API reference
- Advanced configuration options
- Custom styling guides
- More complex examples
- TypeScript usage
- Best practices
- Troubleshooting guide

### Quick Reference

Here's a quick overview of commonly used features:

#### 🎨 Available Colors
- 'red' - For urgent or error items
- 'green' - For success or completed items
- 'yellow' - For warnings or in-progress items
- 'blue' - For information or neutral items
- 'magenta' - For special highlights
- 'cyan' - For system or technical items

[View all color options →](https://console-table.netlify.app/docs/doc-color)

#### ↔️ Column Alignments
- 'left' - Left-aligned text (default)
- 'right' - Right-aligned text (great for numbers)
- 'center' - Centered text (perfect for status indicators)

[Learn more about alignments →](https://console-table.netlify.app/docs/doc-alignment)

#### 🛠️ TypeScript Support
Full TypeScript support with type definitions for colors and alignments.
[TypeScript documentation →](https://console-table.netlify.app/docs/doc-typescript)

## 📜 License

[MIT](https://github.com/console-table-printer/console-table-printer/blob/master/LICENSE)