# Print Pretty tables on Your Console

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
