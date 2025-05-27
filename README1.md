<h1 align="center">console-table-printer</h1>
<h3 align="center">🖥️🍭Printing Pretty Tables on your console</h3>
<p align="center">
  <a href="https://codecov.io/gh/ayonious/console-table-printer">
    <img alt="codecov" src="https://codecov.io/gh/ayonious/console-table-printer/branch/master/graph/badge.svg">
  </a>
  <a href="https://badge.fury.io/js/console-table-printer">
    <img alt="npm version" src="https://badge.fury.io/js/console-table-printer.svg">
  </a>
  <a href="https://packagephobia.now.sh/result?p=console-table-printer">
    <img alt="install size" src="https://packagephobia.now.sh/badge?p=console-table-printer@latest">
  </a>
</p>
<p align="center">
  <a href="https://github.com/prettier/prettier">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=plastic">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
</p>

## What is this?

A lightweight Node.js library for creating beautiful tables in your console/terminal. Perfect for CLI apps, debugging, or displaying data during development.

## Quick Start

```bash
npm install console-table-printer
```

## Usage

### Basic Table

```javascript
const { Table } = require('console-table-printer');

// Create a table
const table = new Table();

// Add some rows
table.addRow({ name: 'John', age: 30, city: 'New York' });
table.addRow({ name: 'Jane', age: 25, city: 'San Francisco' });

// Print it
table.printTable();
```

### Colorful Tables

Add some color to make your data pop:

```javascript
const table = new Table();

// Add colored rows
table.addRow({ name: 'Error', status: 'Failed' }, { color: 'red' });
table.addRow({ name: 'Success', status: 'Passed' }, { color: 'green' });
table.addRow({ name: 'Warning', status: 'Pending' }, { color: 'yellow' });

table.printTable();
```

### Custom Columns

Define column properties for better formatting:

```javascript
const table = new Table({
  columns: [
    { name: 'id', alignment: 'left', color: 'blue' },
    { name: 'name', alignment: 'right', maxLen: 20 },
    { name: 'status', title: 'Job Status' }  // Custom column header
  ]
});

table.addRows([
  { id: 1, name: 'Task One', status: 'Done' },
  { id: 2, name: 'Task Two', status: 'Pending' }
]);

table.printTable();
```

## Advanced Features

### Column Properties

- `alignment`: 'left' | 'right' | 'center'
- `color`: Apply color to entire column
- `maxLen`: Maximum column width (text wraps automatically)
- `minLen`: Minimum column width (adds padding)
- `title`: Custom column header text

### Row Options

```javascript
table.addRow(
  { id: 1, status: 'Critical' },
  { 
    color: 'red',      // Row color
    separator: true    // Add separator line after this row
  }
);
```

### Table Configuration

```javascript
const table = new Table({
  title: 'System Status',           // Table title
  columns: [...],                   // Column definitions
  sort: (a, b) => a.id - b.id,     // Sort function
  filter: row => row.active,        // Filter function
  enabledColumns: ['id', 'status'], // Show only these columns
  defaultColumnOptions: {           // Default settings for all columns
    alignment: 'center',
    color: 'white',
    maxLen: 30
  }
});
```

## Available Colors

- Basic: 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'
- Custom: Define your own colors using ANSI codes

## TypeScript Support

Full TypeScript support with type definitions for all options and configurations.

```typescript
import { Table, TableColumn, Color } from 'console-table-printer';

const columns: TableColumn[] = [
  { name: 'id', alignment: 'left' as const }
];
```

## Need More?

Check out our [full documentation](https://console-table.netlify.app/docs) for:
- More examples
- Advanced formatting
- Custom styling
- API reference

## CLI

There is also a CLI tool for printing Tables on Terminal directly [table-printer-cli](https://www.npmjs.com/package/table-printer-cli)

## License

[MIT](https://github.com/ayonious/console-table-printer/blob/master/LICENSE) 