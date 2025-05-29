import { Table } from '../../..';

describe('README Example 2: Todo List', () => {
  test('should print colored todo list', () => {
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

    // This will print the table to console during test
    todos.printTable();
  });
}); 