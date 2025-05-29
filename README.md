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

### The Simple Way

```javascript
const { printTable } = require('console-table-printer');

// Let's track our favorite ice cream flavors!
const iceCreamRankings = [
  { rank: 1, flavor: 'Chocolate', rating: '5/5', votes: 123 },
  { rank: 2, flavor: 'Vanilla', rating: '4/5', votes: 92 },
  { rank: 3, flavor: 'Cookie Dough', rating: '4/5', votes: 89 },
  { rank: 4, flavor: 'Blueberry', rating: '3/5', votes: 45 },
];

printTable(iceCreamRankings);
```

Output:

![Ice Cream Rankings Table](https://raw.githubusercontent.com/console-table-printer/console-table-printer/master/static-resources/example-ice-cream.png)

### The Fancy Way

```javascript
const { Table } = require('console-table-printer');

// Create a todo list with style!
const todos = new Table();

// Add some colorful tasks
todos.addRow(
  { priority: 'HIGH', task: 'Morning run', status: 'DONE' },
  { color: 'red' }
);
todos.addRow(
  { priority: 'MED', task: 'Read a chapter', status: 'PENDING' },
  { color: 'yellow' }
);
todos.addRow(
  { priority: 'LOW', task: 'Play video games', status: 'DONE' },
  { color: 'green' }
);

todos.printTable();
```

Output:

![Colored Todo List](https://raw.githubusercontent.com/console-table-printer/console-table-printer/master/static-resources/example-todos.png)

### The Super Fancy Way

```javascript
const { Table } = require('console-table-printer');

// Let's track our superhero team!
const team = new Table({
  title: '🦸‍♂️ Superhero Squad Status',
  columns: [
    { name: 'hero', title: 'Superhero', alignment: 'left', color: 'cyan' },
    { name: 'power', title: 'Superpower', alignment: 'center' },
    { name: 'status', title: 'Mission Status', alignment: 'right' },
  ],
});

team.addRow(
  { hero: 'Spider-Woman', power: 'Web Slinging', status: 'Active' },
  { color: 'red' }
);
team.addRow(
  { hero: 'Captain Coffee', power: 'Never Sleeps', status: 'On Break' },
  { color: 'yellow' }
);
team.addRow(
  { hero: 'The Debugger', power: 'Finds All Bugs', status: 'Working' },
  { color: 'green' }
);
team.addRow(
  { hero: 'Binary Warrior', power: 'Speed Coding', status: 'Active' },
  { color: 'blue' }
);

team.printTable();
```

Output:

![Superhero Squad Table](https://raw.githubusercontent.com/console-table-printer/console-table-printer/master/static-resources/example-heroes.png)

### Column Properties

```javascript
const { Table } = require('console-table-printer');

// Track your pet's daily schedule!
const petSchedule = new Table({
  columns: [
    { name: 'time', title: 'Time', alignment: 'left', color: 'blue' },
    { name: 'activity', title: 'Activity', alignment: 'center' },
    { name: 'status', title: 'Status', maxLen: 20 },
  ],
  title: '🐕 Pet Daily Routine',
});

petSchedule.addRows([
  { time: '7:00 AM', activity: 'Morning Walk', status: 'Done' },
  { time: '8:00 AM', activity: 'Breakfast', status: 'In Progress' },
  { time: '2:00 PM', activity: 'Play Time', status: 'Waiting' },
  { time: '6:00 PM', activity: 'Evening Walk', status: 'Pending' },
], { color: 'cyan' });

petSchedule.printTable();
```

Output:

![Pet Schedule Table](https://raw.githubusercontent.com/console-table-printer/console-table-printer/master/static-resources/example-pets.png)

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