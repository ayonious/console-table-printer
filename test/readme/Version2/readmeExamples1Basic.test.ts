import { printTable } from '../../../index';

describe('Example: 1', () => {
  it('Basic', () => {
    // Create a simple task list
    const tasks = [
      { id: 1, task: 'Fix login bug', priority: 'High', status: 'In Progress' },
      {
        id: 2,
        task: 'Update documentation',
        priority: 'Medium',
        status: 'Done',
      },
      { id: 3, task: 'Add unit tests', priority: 'High', status: 'Todo' },
    ];

    // Print the table
    const returned = printTable(tasks);
    expect(returned).toBeUndefined();
  });
});
