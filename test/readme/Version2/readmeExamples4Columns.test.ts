import { Table } from '../../../index';

describe('Example: 4', () => {
  it('Columns', () => {
    const p = new Table({
      title: 'Project Status',
      columns: [
        { name: 'id', alignment: 'left', color: 'blue' },
        { name: 'project', alignment: 'left' },
        { name: 'status', title: 'Current Status' },
      ],
      colorMap: {
        urgent: '\x1b[31m',
        on_track: '\x1b[32m',
      },
    });

    p.addRow({ id: 1, project: 'Website Redesign', status: 'On Track' }, { color: 'on_track' });
    p.addRow({ id: 2, project: 'Mobile App', status: 'Behind Schedule' }, { color: 'urgent' });
    p.addRow({ id: 3, project: 'API Integration', status: 'Completed' }, { color: 'green' });

    // print
    const returned = p.printTable();
    expect(returned).toBeUndefined();
  });
}); 