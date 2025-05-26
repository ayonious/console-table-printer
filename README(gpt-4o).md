<h1 align="center">console-table-printer</h1>
<p align="center">
  <a href="https://badge.fury.io/js/console-table-printer"><img alt="npm version" src="https://badge.fury.io/js/console-table-printer.svg"></a>
  <a href="https://codecov.io/gh/ayonious/console-table-printer"><img alt="codecov" src="https://codecov.io/gh/ayonious/console-table-printer/branch/master/graph/badge.svg"></a>
</p>

## Simple Console Tables for Node.js

Easily create and print beautiful tables in your terminal. Ideal for CLI applications, debugging, and data visualization.

---

## Installation

```bash
npm install console-table-printer
```

## Quick Start

```js
const { Table } = require('console-table-printer');

const table = new Table();
table.addRow({ name: 'Charlie', score: 92 });
table.addRow({ name: 'Dana', score: 88 });
table.printTable();
```

---

## Key Features

- **Intuitive API:** Add rows and columns effortlessly
- **Color Support:** Highlight important data
- **Flexible Alignment:** Left, right, or center
- **Customizable Width:** Define min/max for columns

---

## Usage Examples

### Highlight Rows
```js
const table = new Table();
table.addRow({ status: 'SUCCESS' }, { color: 'green' });
table.addRow({ status: 'ERROR' }, { color: 'red' });
table.printTable();
```

### Define Columns
```js
const table = new Table({
  columns: [
    { name: 'id', alignment: 'right' },
    { name: 'description', maxLen: 25 },
  ]
});
table.addRow({ id: 1, description: 'A detailed description that wraps.' });
table.printTable();
```

---

## API Overview

- `addRow(object, options?)` – Add a single row
- `addRows(array)` – Add multiple rows
- `addColumn(nameOrObject)` – Add a single column
- `printTable()` – Output table to console
- `render()` – Return table as a string

---

## TypeScript Integration

```ts
import { Table, TableColumn } from 'console-table-printer';
const columns: TableColumn[] = [ { name: 'id', alignment: 'right' } ];
const table = new Table({ columns });
```

---

## Resources

- [Complete Documentation](https://console-table.netlify.app/docs)
- [Report Issues](https://github.com/ayonious/console-table-printer/issues)

---

MIT License · [ayonious](https://github.com/ayonious) 