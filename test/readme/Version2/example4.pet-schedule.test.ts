import { Table } from '../../../dist';

describe('README Example 4: Pet Schedule', () => {
  test('should print pet daily schedule table', () => {
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

    // This will print the table to console during test
    petSchedule.printTable();
  });
}); 