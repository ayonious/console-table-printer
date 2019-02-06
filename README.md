# Print Pretty tables on Your Console

[![Build Status](https://travis-ci.org/ayonious/console-table-printer.svg?branch=master)](https://travis-ci.org/ayonious/console-table-printer)
[![npm version](https://badge.fury.io/js/console-table-printer.svg)](https://badge.fury.io/js/console-table-printer)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fayonious%2Fconsole-table-printer.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fayonious%2Fconsole-table-printer?ref=badge_shield)
[![dependencies Status](https://david-dm.org/ayonious/console-table-printer/status.svg)](https://david-dm.org/ayonious/console-table-printer)
[![devDependencies Status](https://david-dm.org/ayonious/console-table-printer/dev-status.svg)](https://david-dm.org/ayonious/console-table-printer?type=dev)

## Synopsis

Printing Simple Table with Coloring rows on your console. Its useful when you want to present some tables on console. Using as less code possible you can print the table on console.

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
p.addRow({ index: 1, text: 'I would like some red wine please', value: 10.212 });
p.addRow({ index: 2, text: 'I would like some green gemuse please', value: 20.00 });
p.addRows([
    { index: 3, text: 'I would like some gelb bananen bitte', value: 100 },
    { index: 4, text: 'I hope batch update is working', value: 300}
]);

//print
p.printAll();
```

Output:

![Screenshot](https://github.com/ayonious/console-table-printer/blob/master/static-resources/screenshot-simple.png)

You can also put some color to your table like this:
```javascript
const p = new Table();
p.addRow({ index: 1, text: 'I would like some red wine please', value: 10.212 }, {color: 'red'});
p.addRow({ index: 2, text: 'I would like some green gemuse please', value: 20.00 }, {color: 'green'});
p.addRow({ index: 3, text: 'I would like some gelb bananen bitte', value: 100 }, {color: 'yellow'});
p.printAll();
```

Output:

![Screenshot](https://github.com/ayonious/console-table-printer/blob/master/static-resources/screenshot-colored.png)

## License

[MIT](https://github.com/ayonious/console-table-printer/blob/master/LICENSE)
