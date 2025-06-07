<h1 align="center">console-table-printer</h1>
<p align="center">
  <a href="https://badge.fury.io/js/console-table-printer"><img alt="npm version" src="https://badge.fury.io/js/console-table-printer.svg"></a>
  <a href="https://codecov.io/gh/ayonious/console-table-printer"><img alt="codecov" src="https://codecov.io/gh/ayonious/console-table-printer/branch/master/graph/badge.svg"></a>
</p>

## Effortless Console Tables for Node.js

Print beautiful tables in your terminal with just a few lines of code. Great for CLI tools, debugging, and data display.

---

## Install

```bash
npm install console-table-printer
```

## Quick Example

```js
const { Table } = require('console-table-printer');

const table = new Table();
table.addRow({ name: 'Alice', score: 95 });
table.addRow({ name: 'Bob', score: 87 });
table.printTable();
```

---

## Features at a Glance

- **Easy API:** Add rows/columns with objects
- **Colors:** Highlight rows or columns
- **Alignment:** Left, right, or center
- **Column width:** Set min/max for wrapping or padding

---

## More Examples

### Color Rows
```js
const table = new Table();
table.addRow({ status: 'PASS' }, { color: 'green' });
table.addRow({ status: 'FAIL' }, { color: 'red' });
table.printTable();
```

### Custom Columns
```js
const table = new Table({
  columns: [
    { name: 'id', alignment: 'right' },
    { name: 'desc', maxLen: 20 },
  ]
});
table.addRow({ id: 1, desc: 'A long description that will wrap.' });
table.printTable();
```

---

## API Highlights

- `addRow(obj, options?)` – Add a row
- `addRows(array)` – Add multiple rows
- `addColumn(nameOrObj)` – Add a column
- `printTable()` – Print to console
- `render()` – Get table as string

---

## TypeScript Support

```ts
import { Table, TableColumn } from 'console-table-printer';
const columns: TableColumn[] = [ { name: 'id', alignment: 'right' } ];
const table = new Table({ columns });
```

---

## Docs & Help

- [Full Documentation](https://console-table.netlify.app/docs)
- [GitHub Issues](https://github.com/ayonious/console-table-printer/issues)

---

MIT License · [ayonious](https://github.com/ayonious) 