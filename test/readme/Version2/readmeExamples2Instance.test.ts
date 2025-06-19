import { Table } from '../../../index';

describe('Example: 2', () => {
  it('Instance', () => {
    // Create a game leaderboard
    const leaderboard = new Table();

    // Add players with their scores
    leaderboard.addRow({
      rank: 1,
      player: 'Alice',
      score: 1250,
      level: 'Master',
    });
    leaderboard.addRow({
      rank: 2,
      player: 'Bob',
      score: 1180,
      level: 'Expert',
    });
    leaderboard.addRows([
      { rank: 3, player: 'Charlie', score: 1050, level: 'Advanced' },
      { rank: 4, player: 'Diana', score: 920, level: 'Intermediate' },
    ]);

    // Print the leaderboard
    const returned = leaderboard.printTable();

    expect(returned).toBeUndefined();
  });
});
