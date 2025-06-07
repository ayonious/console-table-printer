<h1 align="center">console-table-printer</h1>
<h3 align="center">🖥️ Beautiful tables for your terminal</h3>
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

## Why use this?

Turn messy console output into beautiful, readable tables. Perfect for:
- 🔧 **CLI tools** - Display data in a clean format
- 🐛 **Debugging** - Visualize arrays and objects
- 📊 **Data analysis** - Present results clearly
- 🚀 **Development** - Better logging and monitoring

## Install

```bash
npm install console-table-printer
```

## 30-Second Start

```javascript
const { Table } = require('console-table-printer');

const table = new Table();
table.addRow({ name: 'Alice', score: 95 });
table.addRow({ name: 'Bob', score: 87 });
table.printTable();
```

**Output:**
```
┌───────┬───────┐
│ name  │ score │
├───────┼───────┤
│ Alice │    95 │
│ Bob   │    87 │
└───────┴───────┘
```

## Common Use Cases

### 1. Display API Response Data

```javascript
const { Table } = require('console-table-printer');

// Your API data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', active: true },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', active: false }
];

const table = new Table();
table.addRows(users);
table.printTable();
```

### 2. Show Test Results

```javascript
const table = new Table();

// Add results with colors
table.addRow({ test: 'Login', result: 'PASS' }, { color: 'green' });
table.addRow({ test: 'Payment', result: 'FAIL' }, { color: 'red' });
table.addRow({ test: 'Logout', result: 'SKIP' }, { color: 'yellow' });

table.printTable();
```

### 3. Monitor System Status

```javascript
const table = new Table({
  title: '🖥️  System Health Check',
  columns: [
    { name: 'service', title: 'Service', alignment: 'left' },
    { name: 'status', title: 'Status', alignment: 'center' },
    { name: 'uptime', title: 'Uptime', alignment: 'right' }
  ]
});

table.addRow({ service: 'Database', status: '✅ Online', uptime: '99.9%' });
table.addRow({ service: 'API Server', status: '❌ Down', uptime: '85.2%' });
table.addRow({ service: 'Cache', status: '✅ Online', uptime: '100%' });

table.printTable();
```

## Styling Your Tables

### Colors Made Simple

```javascript
const table = new Table();

// Row colors
table.addRow({ level: 'ERROR', message: 'Database connection failed' }, { color: 'red' });
table.addRow({ level: 'WARN', message: 'High memory usage' }, { color: 'yellow' });
table.addRow({ level: 'INFO', message: 'Server started successfully' }, { color: 'green' });

table.printTable();
```

### Column Formatting

```javascript
const table = new Table({
  columns: [
    { name: 'id', alignment: 'right', color: 'cyan' },
    { name: 'product', maxLen: 20 },  // Wrap long text
    { name: 'price', alignment: 'right', minLen: 10 }  // Minimum width
  ]
});

table.addRows([
  { id: 1, product: 'MacBook Pro 16-inch with M3 chip', price: '$2,499' },
  { id: 2, product: 'iPhone 15', price: '$799' }
]);

table.printTable();
```

## Real-World Examples

### Database Query Results

```javascript
const { Table } = require('console-table-printer');

// Simulate database results
const queryResults = [
  { user_id: 1001, username: 'alice_dev', last_login: '2024-01-15', status: 'active' },
  { user_id: 1002, username: 'bob_admin', last_login: '2024-01-14', status: 'inactive' },
  { user_id: 1003, username: 'charlie_user', last_login: '2024-01-16', status: 'active' }
];

const table = new Table({
  title: 'User Query Results',
  columns: [
    { name: 'user_id', title: 'ID', alignment: 'right' },
    { name: 'username', title: 'Username' },
    { name: 'last_login', title: 'Last Login' },
    { name: 'status', title: 'Status', alignment: 'center' }
  ]
});

// Add rows with conditional coloring
queryResults.forEach(user => {
  const color = user.status === 'active' ? 'green' : 'red';
  table.addRow(user, { color });
});

table.printTable();
```

### Performance Metrics

```javascript
const metrics = [
  { endpoint: '/api/users', requests: 1250, avg_time: '45ms', errors: 2 },
  { endpoint: '/api/orders', requests: 890, avg_time: '120ms', errors: 0 },
  { endpoint: '/api/products', requests: 2100, avg_time: '30ms', errors: 5 }
];

const table = new Table({
  title: '📊 API Performance Report',
  columns: [
    { name: 'endpoint', title: 'Endpoint', alignment: 'left', maxLen: 20 },
    { name: 'requests', title: 'Requests', alignment: 'right' },
    { name: 'avg_time', title: 'Avg Time', alignment: 'center' },
    { name: 'errors', title: 'Errors', alignment: 'right' }
  ]
});

metrics.forEach(metric => {
  // Color rows based on error count
  const color = metric.errors === 0 ? 'green' : metric.errors < 5 ? 'yellow' : 'red';
  table.addRow(metric, { color });
});

table.printTable();
```

## Configuration Options

### Table-Level Settings

```javascript
const table = new Table({
  title: 'My Data',                    // Table title
  columns: [...],                      // Column definitions
  sort: (a, b) => a.name.localeCompare(b.name),  // Sort function
  filter: row => row.active === true,  // Filter function
  enabledColumns: ['name', 'email'],   // Show only these columns
  defaultColumnOptions: {              // Apply to all columns
    alignment: 'center',
    color: 'white',
    maxLen: 25
  }
});
```

### Column Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `name` | string | Column identifier | `'user_id'` |
| `title` | string | Display name | `'User ID'` |
| `alignment` | string | Text alignment | `'left'`, `'center'`, `'right'` |
| `color` | string | Text color | `'red'`, `'green'`, `'blue'` |
| `maxLen` | number | Maximum width | `20` |
| `minLen` | number | Minimum width | `10` |

### Available Colors

**Basic Colors:** `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `black`

**Custom Colors:**
```javascript
const table = new Table({
  colorMap: {
    orange: '\x1b[38;5;208m',  // Custom orange color
    purple: '\x1b[35m'         // Custom purple color
  }
});
```

## TypeScript Support

```typescript
import { Table, TableColumn } from 'console-table-printer';

interface User {
  id: number;
  name: string;
  email: string;
}

const columns: TableColumn[] = [
  { name: 'id', alignment: 'right' },
  { name: 'name', alignment: 'left' },
  { name: 'email', alignment: 'left', maxLen: 30 }
];

const table = new Table({ columns });
```

## Quick Reference

### Essential Methods

```javascript
// Create table
const table = new Table();
const table = new Table(['col1', 'col2']);  // Simple columns
const table = new Table({ columns: [...] }); // Advanced setup

// Add data
table.addRow({ name: 'John', age: 30 });
table.addRow(data, { color: 'red' });
table.addRows([data1, data2]);

// Add columns
table.addColumn('newColumn');
table.addColumn({ name: 'col', alignment: 'center' });

// Display
table.printTable();
const output = table.render();  // Get as string
```

## Need Help?

- 📖 **Full Documentation:** [console-table.netlify.app](https://console-table.netlify.app/docs)
- 🐛 **Issues:** [GitHub Issues](https://github.com/ayonious/console-table-printer/issues)
- 💡 **Examples:** Check the `/examples` folder in the repo

## License

MIT © [ayonious](https://github.com/ayonious) 