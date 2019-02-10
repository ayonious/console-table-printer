# Print Pretty tables on Your Console

[![Build Status](https://travis-ci.org/ayonious/console-table-printer.svg?branch=master)](https://travis-ci.org/ayonious/console-table-printer)
[![npm version](https://badge.fury.io/js/console-table-printer.svg)](https://badge.fury.io/js/console-table-printer)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fayonious%2Fconsole-table-printer.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fayonious%2Fconsole-table-printer?ref=badge_shield)
[![dependencies Status](https://david-dm.org/ayonious/console-table-printer/status.svg)](https://david-dm.org/ayonious/console-table-printer)
[![devDependencies Status](https://david-dm.org/ayonious/console-table-printer/dev-status.svg)](https://david-dm.org/ayonious/console-table-printer?type=dev)

## Synopsis

Printing Simple Table with Coloring rows on your console. Its useful when you want to present some tables on console.

## Installation

```bash
npm install console-table-printer --save
```

## Basic Example

```javascript
const {Table} = require('console-table-printer');

//Create a table
const p = new Table();

//add rows with color
p.addRow({ index: 1, text: 'red wine please', value: 10.212 });
p.addRow({ index: 2, text: 'green gemuse please', value: 20.00 });
p.addRows([ //adding multiple rows are possible
    { index: 3, text: 'gelb bananen bitte', value: 100 },
    { index: 4, text: 'update is working', value: 300}
]);

//print
p.printAll();
```

Output:

![Screenshot](https://cdn.jsdelivr.net/gh/ayonious/console-table-printer@master/static-resources/screenshot-simple.png)

You can also put some color to your table like this:
```javascript
const p = new Table();
p.addRow({ index: 1, text: 'red wine', value: 10.212 }, {color: 'red'});
p.addRow({ index: 2, text: 'green gemuse', value: 20.00 }, {color: 'green'});
p.addRow({ index: 3, text: 'gelb bananen', value: 100 }, {color: 'yellow'});
p.printAll();
```

Output:

![Screenshot](https://cdn.jsdelivr.net/gh/ayonious/console-table-printer@master/static-resources/screenshot-colored.png)

Documentation

### Table instance creation
3 ways to Table Instance creation:

1. Simplest way `new Table()`

2. Only with column names: `new Table(['column1', 'column2', 'column3'])`

3. Detailed way of creating table instance

```javascript
new Table({
    style: 'fatBorder', //style of border of the table
    columns: [
        {name: 'column1', alignment: 'left'}, //with alignment
        {name: 'column2', alignment: 'right'},
        {name: 'column3'}
    ]
});
```

### Functions

`addRow(rowObjet, options)` adding single row.
`addRows(rowObjets)` adding multiple rows. array of row object. This case options will be applied to all the objects in row
`addColumn(columnObject)` adding single column
`addColumns(columnObjects)` adding multiple columns
`printTable()` Prints the table on your console

### possible `color` values for rows

* red
* green
* yellow
* white
* blue
* magenta
* cyan
* crimson
* white_bold

### possible border Style of table

thinBorder
┌────────────┬─────┬──────┐
│ foo        │ bar │ baz  │
├────────────┼─────┼──────┤
│ frobnicate │ bar │ quuz │
└────────────┴─────┴──────┘

fatBorder:
╔══════╦═════╦══════╗
║ hob  ║ foo ║ mia  ║
╟══════╬═════╬══════╢
║ ball ║ fox ║ mama ║
╚══════╩═════╩══════╝

Example for creating fat border Table `new Table({style: 'fatBorder'});`

## License

[MIT](https://github.com/ayonious/console-table-printer/blob/master/LICENSE)
