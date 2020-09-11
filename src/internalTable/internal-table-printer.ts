import ColoredConsoleLine from '../utils/colored-console-line';
import {
  defaultRowAlignment,
  defaultHeaderAlignment,
  defaultHeaderFontColor,
  defaultRowFontColor,
  TABLE_STYLE_DETAILS,
} from '../utils/table-constants';
import {
  cellText,
  Column,
  createHeaderAsRow,
  createRow,
  renderTableHorizontalBorders,
  Row,
  textWithPadding,
} from '../utils/table-helpers';
import { TableInternal } from './internal-table';
import { preProcessColumns, preProcessRows } from './tablePreProcessors';

function renderLine(
  tableStyle: TABLE_STYLE_DETAILS,
  columns: Column[],
  row: Row,
  isHeader?: boolean
): string {
  const line = new ColoredConsoleLine();
  line.addWithColor(defaultRowFontColor, tableStyle.vertical);

  columns.forEach((column) => {
    line.addWithColor(defaultRowFontColor, ' ');
    line.addWithColor(
      (isHeader && defaultHeaderFontColor) || column.color || row.color, // column color is priotized as row color
      textWithPadding(
        `${cellText(row.text[column.name])}`,
        column.alignment || defaultRowAlignment,
        column.max_ln || 20
      )
    );
    line.addWithColor(defaultRowFontColor, ` ${tableStyle.vertical}`);
  });

  return line.renderConsole();
}

// ║ 1     ║     I would like some red wine please ║ 10.212 ║
function renderRow(table: TableInternal, row: Row): string[] {
  const ret: string[] = [];
  ret.push(renderLine(table.tableStyle, table.columns, row));
  return ret;
}

/*
                  The analysis Result
 ╔═══════╦═══════════════════════════════════════╦════════╗
*/
function renderTableTitle(table: TableInternal): string[] {
  const ret: string[] = [];

  if (table.title === undefined) {
    return ret;
  }

  const getTableWidth = () => {
    const reducer = (accumulator: number, currentValue: number) =>
      // ║ cell ║, 2 spaces + cellTextSize + one border on the left
      accumulator + currentValue + 2 + 1;
    return table.columns.map((m) => m.max_ln || 20).reduce(reducer, 1);
  };

  const titleWithPadding = textWithPadding(
    table.title as string,
    defaultHeaderAlignment,
    getTableWidth()
  );
  const styledText = new ColoredConsoleLine();
  styledText.addWithColor(defaultHeaderFontColor, titleWithPadding);
  //                  The analysis Result
  ret.push(styledText.renderConsole());
  return ret;
}

/*
 ╔═══════╦═══════════════════════════════════════╦════════╗
 ║ index ║                                  text ║  value ║
 ╟═══════╬═══════════════════════════════════════╬════════╢
*/
function renderTableHeaders(table: TableInternal): string[] {
  const ret: string[] = [];

  // ╔═══════╦═══════════════════════════════════════╦════════╗
  ret.push(
    renderTableHorizontalBorders(
      table.tableStyle.headerTop,
      table.columns.map((m) => m.max_ln || 20)
    )
  );

  // ║ index ║                                  text ║  value ║
  const row = createHeaderAsRow(createRow, table.columns);
  ret.push(renderLine(table.tableStyle, table.columns, row, true));

  // ╟═══════╬═══════════════════════════════════════╬════════╢
  ret.push(
    renderTableHorizontalBorders(
      table.tableStyle.headerBottom,
      table.columns.map((m) => m.max_ln || 20)
    )
  );

  return ret;
}

function renderTableEnding(table: TableInternal): string[] {
  const ret: string[] = [];
  // ╚═══════╩═══════════════════════════════════════╩════════╝
  ret.push(
    renderTableHorizontalBorders(
      table.tableStyle.tableBottom,
      table.columns.map((m) => m.max_ln || 20)
    )
  );
  return ret;
}

export function renderTable(table: TableInternal): string {
  preProcessColumns(table); // enable / disable cols, find maxLn of each col/ computed Columns
  preProcessRows(table); // sort and filter

  const ret: string[] = [];
  renderTableTitle(table).forEach((row) => ret.push(row));

  renderTableHeaders(table).forEach((row) => ret.push(row));

  table.rows.forEach((row) => {
    renderRow(table, row).forEach((row_) => ret.push(row_));
  });
  renderTableEnding(table).forEach((row) => ret.push(row));
  return ret.join('\n');
}

export function renderSimpleTable(rows: any[]) {
  const table = new TableInternal();
  table.addRows(rows);
  return renderTable(table);
}

export function printSimpleTable(rows: any[]) {
  console.log(renderSimpleTable(rows));
}
