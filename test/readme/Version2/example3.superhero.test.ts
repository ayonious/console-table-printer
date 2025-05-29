import { Table } from '../../..';

describe('README Example 3: Superhero Squad', () => {
  test('should print superhero squad status table', () => {
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

    // This will print the table to console during test
    team.printTable();
  });
}); 