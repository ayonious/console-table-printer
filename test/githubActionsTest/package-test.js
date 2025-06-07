const { Table } = require('console-table-printer');
const assert = require('assert');

function runAllTests() {
  // Test 1: Basic Table Rendering
  console.log('Running basic table rendering tests...');
  const basicTable = new Table();
  basicTable.addRow({ id: 1, name: 'Test' });
  const basicRender = basicTable.render();
  assert(basicRender.includes('id'), 'Table should contain column header "id"');
  assert(
    basicRender.includes('name'),
    'Table should contain column header "name"'
  );
  assert(basicRender.includes('1'), 'Table should contain value "1"');
  assert(basicRender.includes('Test'), 'Table should contain value "Test"');

  // Test 2: Color Support
  console.log('Running color support tests...');
  const colorTable = new Table();
  colorTable.addRow({ id: 1, name: 'Green Row' }, { color: 'green' });
  colorTable.addRow({ id: 2, name: 'Red Row' }, { color: 'red' });
  const colorRender = colorTable.render();
  assert(
    colorRender.includes('\x1b[32m'),
    'Table should contain green color code'
  );
  assert(
    colorRender.includes('\x1b[31m'),
    'Table should contain red color code'
  );

  // Test 3: Column Options
  console.log('Running column options tests...');
  const optionsTable = new Table({
    columns: [
      { name: 'id', alignment: 'right' },
      { name: 'name', title: 'NAME' },
    ],
  });
  optionsTable.addRow({ id: 1, name: 'Test' });
  const optionsRender = optionsTable.render();
  assert(
    optionsRender.includes('NAME'),
    'Table should contain custom column title "NAME"'
  );

  // Test 4: Data Types
  console.log('Running data types tests...');
  const typesTable = new Table();
  typesTable.addRows([
    { id: 1, name: 'Item 1', price: 10.99, inStock: true },
    { id: 2, name: 'Item 2', price: 20.5, inStock: false },
  ]);
  const typesRender = typesTable.render();
  assert(
    typesRender.includes('10.99'),
    'Table should contain float value "10.99"'
  );
  assert(
    typesRender.includes('true'),
    'Table should contain boolean value "true"'
  );
  assert(
    typesRender.includes('false'),
    'Table should contain boolean value "false"'
  );

  // Test 5: Sorting
  console.log('Running sorting tests...');
  const sortTable = new Table({
    sort: (row1, row2) => row1.id - row2.id,
  });
  sortTable.addRows([
    { id: 3, name: 'Product 3', price: 30.0 },
    { id: 1, name: 'Product 1', price: 10.99 },
    { id: 2, name: 'Product 2', price: 20.5 },
  ]);
  const sortRender = sortTable.render();
  const lines = sortRender.split('\n');
  const dataLines = lines.filter((line) => line.includes('Product'));
  assert(dataLines.length === 3, 'Expected 3 data lines');
  assert(dataLines[0].includes('Product 1'), 'First row should be Product 1');
  assert(dataLines[1].includes('Product 2'), 'Second row should be Product 2');
  assert(dataLines[2].includes('Product 3'), 'Third row should be Product 3');

  // Test 6: Comprehensive Features
  console.log('Running comprehensive feature tests...');
  const comprehensiveTable = new Table({
    title: 'Comprehensive Test Table',
    columns: [
      { name: 'id', alignment: 'right', color: 'blue' },
      { name: 'name', title: 'PRODUCT NAME', maxLen: 20 },
      { name: 'price', alignment: 'left' },
      { name: 'stock', title: 'IN STOCK' },
    ],
  });
  comprehensiveTable.addRows([
    {
      id: 1,
      name: 'Very Long Product Name That Should be Truncated',
      price: 10.99,
      stock: true,
    },
    { id: 2, name: 'Product 2', price: 20.5, stock: false },
  ]);
  const comprehensiveRender = comprehensiveTable.render();
  assert(
    comprehensiveRender.includes('PRODUCT NAME'),
    'Custom column title not found'
  );
  assert(
    comprehensiveRender.includes('IN STOCK'),
    'Custom column title not found'
  );
  assert(comprehensiveRender.includes('\x1b[34m'), 'Blue color code not found');

  console.log('✅ All tests passed successfully!');

  // Print a sample table for visual verification
  console.log('\nVisual verification of table formatting:');
  comprehensiveTable.printTable();
}

try {
  runAllTests();
} catch (error) {
  console.error('❌ Test failed:', error.message);
  process.exit(1);
}
