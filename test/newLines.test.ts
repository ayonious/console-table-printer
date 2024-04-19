import { Table } from '../index';

describe('Testing line breaks in table cells', () => {
  it('does not break the table', () => {
    // Create a table
    const p = new Table({
      columns: [
        { name: 'foo', alignment: 'right' },
        { name: 'bar', alignment: 'center', minLen: 40 },
        { name: 'baz', alignment: 'left', minLen: 40 },
      ],
    });

    p.addRows([
      {
        foo: 'Sed dictum',
        bar: 'Pellentesque\rhabitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas ut scelerisque felis. Etiam ut leo fringilla lacus posuere dignissim aliquet eu nulla.\n\nEtiam placerat ultricies sollicitudin. Maecenas ultrices feugiat tempor. Nam non nisi vel diam tristique commodo. Etiam sit amet nisi sagittis, fringilla tortor sed, efficitur nisl. Maecenas tincidunt lobortis dapibus.',
        baz: `* Cras ac ligula aliquet, ultrices erat quis, laoreet lorem.
* Mauris rutrum nisi et nisl sollicitudin semper.
* Nunc laoreet felis auctor diam aliquet semper.
* Integer aliquet urna imperdiet orci pulvinar, at vulputate ante consectetur.
* Pellentesque a lectus porttitor, condimentum lacus non, venenatis lacus.`,
      },
    ]);

    // print
    p.printTable();
    expect(p.render()).toMatchSnapshot();
  });
});
