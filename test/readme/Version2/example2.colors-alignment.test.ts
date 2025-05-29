import { Table } from '../../..';
import { getTableBody, getTableHeader } from '../../testUtils/getRawData';

describe('README Example 2: Colors and Alignment', () => {
  test('should demonstrate colors and alignment features', () => {
    const table = new Table({
      columns: [
        { name: 'feature', title: 'FEATURE', alignment: 'left' },
        { name: 'example', title: 'EXAMPLE', alignment: 'center' },
        { name: 'description', title: 'DESCRIPTION', alignment: 'right' },
      ],
    });

    table.addRow(
      { feature: 'RED_COLOR', example: 'Error State', description: 'Used for errors/warnings' },
      { color: 'red' }
    );
    table.addRow(
      { feature: 'GREEN_COLOR', example: 'Success State', description: 'Used for success states' },
      { color: 'green' }
    );
    table.addRow(
      { feature: 'CENTER_ALIGN', example: 'I AM CENTERED', description: 'This column is center-aligned' },
      { color: 'yellow' }
    );
    table.addRow(
      { feature: 'RIGHT_ALIGN', example: '12345', description: 'This column is right-aligned' },
      { color: 'blue' }
    );

    table.printTable();
  });

  test('should make sure each column is what its expected to be', () => {
    const table = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'feature', title: 'FEATURE', alignment: 'left' },
        { name: 'example', title: 'EXAMPLE', alignment: 'center' },
        { name: 'description', title: 'DESCRIPTION', alignment: 'right' },
      ],
    });

    table.addRow(
      { feature: 'RED_COLOR', example: 'Error State', description: 'Used for errors/warnings' },
      { color: 'red' }
    );
    table.addRow(
      { feature: 'GREEN_COLOR', example: 'Success State', description: 'Used for success states' },
      { color: 'green' }
    );
    table.addRow(
      { feature: 'CENTER_ALIGN', example: 'I AM CENTERED', description: 'This column is center-aligned' },
      { color: 'yellow' }
    );
    table.addRow(
      { feature: 'RIGHT_ALIGN', example: '12345', description: 'This column is right-aligned' },
      { color: 'blue' }
    );

    const [renderedHeader, renderedBody] = [getTableHeader(table), getTableBody(table)];
    expect(renderedHeader).toEqual('│ FEATURE      │    EXAMPLE    │                   DESCRIPTION │');
    expect(renderedBody).toEqual([
      '│ RED_COLOR    │  Error State  │      Used for errors/warnings │',
      '│ GREEN_COLOR  │ Success State │       Used for success states │',
      '│ CENTER_ALIGN │ I AM CENTERED │ This column is center-aligned │',
      '│ RIGHT_ALIGN  │     12345     │  This column is right-aligned │'
    ]);
  });
}); 