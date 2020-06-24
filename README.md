<h1 align="center">console-table-printer</h1>
<h3 align="center">🖥️🍭Printing Pretty Tables on your console</h3>
<p align="center">
  <a href="https://travis-ci.org/ayonious/console-table-printer">
    <img alt="Build Status" src="https://travis-ci.org/ayonious/console-table-printer.svg?branch=master">
  </a>
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
  <a href="https://david-dm.org/ayonious/console-table-printer">
    <img alt="dependencies Status" src="https://david-dm.org/ayonious/console-table-printer/status.svg">
  </a>
  <a href="https://david-dm.org/ayonious/console-table-printer?type=dev">
    <img alt="devDependencies Status" src="https://david-dm.org/ayonious/console-table-printer/dev-status.svg">
  </a>
</p>
<p align="center">
  <a href="https://github.com/prettier/prettier">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=plastic">
  </a>
</p>

## Synopsis

Printing Simple Table with Coloring rows on your console. Its useful when you want to present some tables on console using js.

## Installation

```bash
npm install console-table-printer --save
```

## Basic Example

```javascript
const { printTable } = require('console-table-printer');

//Create a table
const testCases = [
  { index: 3, text: 'I would like some gelb bananen bitte', value: 100 },
  { index: 4, text: 'I hope batch update is working', value: 300 },
];

//print
printTable(testCases);
```

Output:

![Screenshot](https://cdn.jsdelivr.net/gh/ayonious/console-table-printer@master/static-resources/quick-print.png)

You can also create a Table instance and print it:

```javascript
const { Table } = require('console-table-printer');

//Create a table
const p = new Table();

//add rows with color
p.addRow({ index: 1, text: 'red wine please', value: 10.212 });
p.addRow({ index: 2, text: 'green gemuse please', value: 20.0 });
p.addRows([
  //adding multiple rows are possible
  { index: 3, text: 'gelb bananen bitte', value: 100 },
  { index: 4, text: 'update is working', value: 300 },
]);

//print
p.printTable();
```

![Screenshot](https://cdn.jsdelivr.net/gh/ayonious/console-table-printer@master/static-resources/screenshot-simple.png)

You can also put some color to your table like this:

```javascript
const p = new Table();
p.addRow({ index: 1, text: 'red wine', value: 10.212 }, { color: 'red' });
p.addRow({ index: 2, text: 'green gemuse', value: 20.0 }, { color: 'green' });
p.addRow({ index: 3, text: 'gelb bananen', value: 100 }, { color: 'yellow' });
p.printTable();
```

![Screenshot](https://cdn.jsdelivr.net/gh/ayonious/console-table-printer@master/static-resources/screenshot-colored.png)

You can also put properties based on columns (color/alignment)

```javascript
const p = new Table({
  columns: [
    { name: 'index', alignment: 'left', color: 'blue' }, //with alignment and color
    { name: 'text', alignment: 'right' },
  ],
});

p.addRow({ index: 1, text: 'red wine', value: 10.212 }, { color: 'green' });
p.addRow({ index: 2, text: 'green gemuse', value: 20.0 });
p.addRow(
  { index: 3, text: 'gelb bananen', value: 100, is_priority_today: 'Y' },
  { color: 'yellow' }
);
p.addRow(
  { index: 3, text: 'rosa hemd wie immer', value: 100 },
  { color: 'cyan' }
);
p.printTable();
```

![Screenshot](https://cdn.jsdelivr.net/gh/ayonious/console-table-printer@master/static-resources/screenshot-thin-border-column-props.2.png)

## CLI

There is also a CLI tool for printing Tables on Terminal directly [table-printer-cli](https://www.npmjs.com/package/table-printer-cli)

## Documentation

### Table instance creation

3 ways to Table Instance creation:

1. Simplest way `new Table()`

2. Only with column names: `new Table(['column1', 'column2', 'column3'])`

3. Detailed way of creating table instance

```javascript
new Table({
  style: 'fatBorder', //style of border of the table, (optional)
  title: 'Title of the Table', // A text showsup on top of table (optoinal)
  columns: [
    { name: 'column1', alignment: 'left', color: 'red' }, //with alignment and color
    { name: 'column2', alignment: 'right' },
    { name: 'column3' },
  ],
  sort: (row1, row2) => row2.column1 - row1.column1, // sorting order of rows (optional), this is normal js sort function for Array.sort
  filter: (row) => row.column1 < 3, // filtering rows (optional)
  enabledColumns: ['column1'], // array of columns that you want to see, all other will be ignored (optional)
  disabledColumns: ['column2'], // array of columns that you DONT want to see, these will always be hidden
});
```

### Functions

- `addRow(rowObjet, options)` adding single row.
- `addRows(rowObjets)` adding multiple rows. array of row object. This case options will be applied to all the objects in row
- `addColumn(columnObject)` adding single column
- `addColumns(columnObjects)` adding multiple columns
- `printTable()` Prints the table on your console

### possible `color` values for rows

- red
- green
- yellow
- white
- blue
- magenta
- cyan
- crimson
- white_bold

Example usage: To Create a row of color blue

```js
table.addRow(rowObject, { color: 'blue' });
```

### possible `alignment` values for columns

- left
- right
- center

### possible border Style of table

- thinBorder

![Screenshot](https://cdn.jsdelivr.net/gh/ayonious/console-table-printer@master/static-resources/screenshot-thin-border.png)

- fatBorder:

![Screenshot](https://cdn.jsdelivr.net/gh/ayonious/console-table-printer@master/static-resources/screenshot-fat-border.png)

Example for creating fat border Table `new Table({style: 'fatBorder'});`

## License

[MIT](https://github.com/ayonious/console-table-printer/blob/master/LICENSE)
