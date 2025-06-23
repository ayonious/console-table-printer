import { Table } from '../../dist/index';

// Mock console.log to capture output
let consoleOutput: string[] = [];
const originalLog = console.log;

beforeEach(() => {
  consoleOutput = [];
  console.log = jest.fn((...args: any[]) => {
    consoleOutput.push(args.join(' '));
  });
});

afterEach(() => {
  console.log = originalLog;
});

/*
Test that the package created after npm build is working correctly.
By working correctly, I mean that the package can be used to create tables and that the tables are rendered correctly.
*/

describe('Package Test Suite', () => {
  test('Basic Table Rendering', () => {
    const basicTable = new Table();
    basicTable.addRow({ id: 1, name: 'Test' });
    const basicRender = basicTable.render();

    expect(basicRender).toContain('id');
    expect(basicRender).toContain('name');
    expect(basicRender).toContain('1');
    expect(basicRender).toContain('Test');
  });

  test('Color Support', () => {
    const colorTable = new Table();
    colorTable.addRow({ id: 1, name: 'Green Row' }, { color: 'green' });
    colorTable.addRow({ id: 2, name: 'Red Row' }, { color: 'red' });
    const colorRender = colorTable.render();

    expect(colorRender).toContain('\x1b[32m'); // green color code
    expect(colorRender).toContain('\x1b[31m'); // red color code
  });

  test('Column Options', () => {
    const optionsTable = new Table({
      columns: [
        { name: 'id', alignment: 'right' },
        { name: 'name', title: 'NAME' },
      ],
    });
    optionsTable.addRow({ id: 1, name: 'Test' });
    const optionsRender = optionsTable.render();

    expect(optionsRender).toContain('NAME');
  });

  test('Data Types', () => {
    const typesTable = new Table();
    typesTable.addRows([
      { id: 1, name: 'Item 1', price: 10.99, inStock: true },
      { id: 2, name: 'Item 2', price: 20.5, inStock: false },
    ]);
    const typesRender = typesTable.render();

    expect(typesRender).toContain('10.99');
    expect(typesRender).toContain('true');
    expect(typesRender).toContain('false');
  });

  test('Sorting', () => {
    const sortTable = new Table({
      sort: (row1: any, row2: any) => row1.id - row2.id,
    });
    sortTable.addRows([
      { id: 3, name: 'Product 3', price: 30.0 },
      { id: 1, name: 'Product 1', price: 10.99 },
      { id: 2, name: 'Product 2', price: 20.5 },
    ]);
    const sortRender = sortTable.render();
    const lines = sortRender.split('\n');
    const dataLines = lines.filter((line) => line.includes('Product'));

    expect(dataLines).toHaveLength(3);
    expect(dataLines[0]).toContain('Product 1');
    expect(dataLines[1]).toContain('Product 2');
    expect(dataLines[2]).toContain('Product 3');
  });

  test('Comprehensive Features', () => {
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

    expect(comprehensiveRender).toContain('PRODUCT NAME');
    expect(comprehensiveRender).toContain('IN STOCK');
    expect(comprehensiveRender).toContain('\x1b[34m'); // blue color code
  });

  test('Error Handling', () => {
    const table = new Table();

    // Should not throw when adding valid rows
    expect(() => {
      table.addRow({ id: 1, name: 'Test' });
    }).not.toThrow();

    // Should handle empty table gracefully
    const emptyTable = new Table();
    expect(() => {
      emptyTable.render();
    }).not.toThrow();
  });

  test('Table Formatting', () => {
    const table = new Table();
    table.addRow({ id: 1, name: 'Test' });
    const render = table.render();

    // Check table border characters
    expect(render).toMatch(/[─│┌┐└┘├┤]/); // Should contain table border characters

    // Check alignment
    const lines = render.split('\n');
    expect(lines.length).toBeGreaterThan(2); // Header + data + borders
  });
}); 