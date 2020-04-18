import { ColoredConsoleLine } from '../utils/colored-console-line';
import { TableInternal } from './internal-table';
import {
  COLOR,
  COLUMN_ALIGNMENT,
  TABLE_STYLE_DETAILS,
} from '../utils/table-constants';
import {
  Column,
  createHeaderAsRow,
  createRow,
  findMaxLenOfColumn,
  printTableHorizontalBorders,
  Row,
  textWithPadding,
  preProcessRows,
} from '../utils/table-helpers';

function prepareLineAndPrint(
  tableStyle: TABLE_STYLE_DETAILS,
  columns: Column[],
  row: Row,
  isHeader?: boolean
): string {
  let line = new ColoredConsoleLine();
  line.addWithColor(COLOR.white, tableStyle.vertical);
  for (let column of columns) {
    line.addWithColor(COLOR.white, ' ');
    line.addWithColor(
      (isHeader && COLOR.white_bold) || column.color || row.color, // column color is priotized as row color
      textWithPadding(
        `${row.text[column.name] || ''}`,
        column.alignment || COLUMN_ALIGNMENT.right,
        column.max_ln || 20
      )
    );
    line.addWithColor(COLOR.white, ' ' + tableStyle.vertical);
  }
  return line.printConsole();
}

// ║ 1     ║     I would like some red wine please ║ 10.212 ║
function printRow(table: TableInternal, row: Row): string[] {
  let ret: string[] = [];
  ret.push(prepareLineAndPrint(table.tableStyle, table.columns, row));
  return ret;
}

/* 
 ╔═══════╦═══════════════════════════════════════╦════════╗
 ║ index ║                                  text ║  value ║
 ╟═══════╬═══════════════════════════════════════╬════════╢
*/
function printTableHeaders(table: TableInternal): string[] {
  let ret: string[] = [];

  // ╔═══════╦═══════════════════════════════════════╦════════╗
  ret.push(
    printTableHorizontalBorders(
      table.tableStyle.headerTop,
      table.columns.map((m) => m.max_ln || 20)
    )
  );

  // ║ index ║                                  text ║  value ║
  let row = createHeaderAsRow(createRow, table.columns);
  ret.push(prepareLineAndPrint(table.tableStyle, table.columns, row, true));

  // ╟═══════╬═══════════════════════════════════════╬════════╢
  ret.push(
    printTableHorizontalBorders(
      table.tableStyle.headerBottom,
      table.columns.map((m) => m.max_ln || 20)
    )
  );

  return ret;
}

function printTableEnding(table: TableInternal): string[] {
  let ret: string[] = [];
  // ╚═══════╩═══════════════════════════════════════╩════════╝
  ret.push(
    printTableHorizontalBorders(
      table.tableStyle.tableBottom,
      table.columns.map((m) => m.max_ln || 20)
    )
  );
  return ret;
}

function calculateColumnProperty(table: TableInternal) {
  for (let column of table.columns) {
    column.max_ln = findMaxLenOfColumn(column, table.rows);
  }
}

export function printTableAndGetConsoleOutput(table: TableInternal): string[] {
  calculateColumnProperty(table);
  table.rows = preProcessRows(table.rows, table.filterFunction, table.sortFunction); //sort and filter

  let ret: string[] = [];
  printTableHeaders(table).forEach((row) => ret.push(row));

  for (let row of table.rows) {
    printRow(table, row).forEach((row) => ret.push(row));
  }
  printTableEnding(table).forEach((row) => ret.push(row));
  return ret;
}

export function printTable(table: TableInternal) {
  printTableAndGetConsoleOutput(table);
}

export function printSimpleTableAndGetConsoleOutput(rows: any[]) {
  let table = new TableInternal();
  table.addRows(rows);
  return printTableAndGetConsoleOutput(table);
}

export function printSimpleTable(rows: any[]) {
  printSimpleTableAndGetConsoleOutput(rows);
}
