import { Table } from '../../../index';
import { getTableBody, getTableHeader } from '../../testUtils/getRawData';

describe('Alignment Tests: Rendering', () => {
  it('should render left-aligned content', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'text', alignment: 'left' },
        { name: 'value', alignment: 'left' },
      ],
    });

    p.addRow({ text: 'Left Text', value: 123 });

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual('│ text      │ value │');
    expect(renderedBody).toEqual(['│ Left Text │ 123   │']);
  });

  it('should render right-aligned content', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'text', alignment: 'right' },
        { name: 'value', alignment: 'right' },
      ],
    });

    p.addRow({ text: 'Right Text', value: 123 });

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual('│       text │ value │');
    expect(renderedBody).toEqual(['│ Right Text │   123 │']);
  });

  it('should render center-aligned content', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'text', alignment: 'center' },
        { name: 'value', alignment: 'center' },
      ],
    });

    p.addRow({ text: 'Center Text', value: 123 });

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual('│    text     │ value │');
    expect(renderedBody).toEqual(['│ Center Text │  123  │']);
  });

  it('should render mixed alignments', () => {
    const p = new Table({
      shouldDisableColors: true,
      columns: [
        { name: 'left', alignment: 'left' },
        { name: 'right', alignment: 'right' },
        { name: 'center', alignment: 'center' },
      ],
    });

    p.addRow({ left: 'Left', right: 'Right', center: 'Center' });

    const [renderedHeader, renderedBody] = [getTableHeader(p), getTableBody(p)];
    expect(renderedHeader).toEqual('│ left │ right │ center │');
    expect(renderedBody).toEqual(['│ Left │ Right │ Center │']);
  });
});
