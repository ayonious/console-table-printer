import { Table } from '../../..';
import { getTableBody } from '../../testUtils/getTableBody';

describe('README Example 4: Practical Example', () => {
  test('should demonstrate a practical system status dashboard', () => {
    const systemStatus = new Table({
      title: 'SYSTEM STATUS DASHBOARD',
      columns: [
        { name: 'service', title: 'SERVICE', alignment: 'left' },
        { name: 'status', title: 'STATUS', alignment: 'center' },
        { name: 'response', title: 'RESPONSE TIME', alignment: 'right' },
      ],
    });

    systemStatus.addRow(
      { service: 'Database', status: 'ONLINE', response: '45ms' },
      { color: 'green' }
    );
    systemStatus.addRow(
      { service: 'API Server', status: 'WARNING', response: '120ms' },
      { color: 'yellow' }
    );
    systemStatus.addRow(
      { service: 'Cache', status: 'OFFLINE', response: 'N/A' },
      { color: 'red' }
    );
    systemStatus.addRow(
      { service: 'CDN', status: 'ONLINE', response: '20ms' },
      { color: 'green' }
    );

    systemStatus.printTable();
  });

  test('should make sure each column is what its expected to be', () => {
    const systemStatus = new Table({
      shouldDisableColors: true,
      title: 'SYSTEM STATUS DASHBOARD',
      columns: [
        { name: 'service', title: 'SERVICE', alignment: 'left' },
        { name: 'status', title: 'STATUS', alignment: 'center' },
        { name: 'response', title: 'RESPONSE TIME', alignment: 'right' },
      ],
    });

    systemStatus.addRow(
      { service: 'Database', status: 'ONLINE', response: '45ms' },
      { color: 'green' }
    );
    systemStatus.addRow(
      { service: 'API Server', status: 'WARNING', response: '120ms' },
      { color: 'yellow' }
    );
    systemStatus.addRow(
      { service: 'Cache', status: 'OFFLINE', response: 'N/A' },
      { color: 'red' }
    );
    systemStatus.addRow(
      { service: 'CDN', status: 'ONLINE', response: '20ms' },
      { color: 'green' }
    );

    systemStatus.printTable();
    const rendered = getTableBody(systemStatus);
    expect(rendered).toEqual([
      '│ Database   │ ONLINE  │          45ms │',
      '│ API Server │ WARNING │         120ms │',
      '│ Cache      │ OFFLINE │           N/A │',
      '│ CDN        │ ONLINE  │          20ms │',
    ]);
  });
}); 