import { COLOR, TABLE_STYLE_DETAILS } from "./table-constants";
import { ColoredConsoleLine } from "./colored-console-line";
import {
  textWithPadding,
  printTableHorizontalBorders,
  createRow,
  createHeaderAsRow,
  findMaxLenOfColumn,
  Row,
  Column
} from "./table-helpers";
import { TableInternal } from "./internal-table";

function prepareLineAndPrint(
  tableStyle: TABLE_STYLE_DETAILS,
  columns: Column[],
  row: Row
): string {
  let line = new ColoredConsoleLine();
  line.addWithColor(COLOR.white, tableStyle.vertical);
  for (let column of columns) {
    line.addWithColor(COLOR.white, " ");
    line.addWithColor(
      row.color,
      textWithPadding(
        `${row.text[column.name] || ""}`,
        column.alignment,
        column.max_ln
      )
    );
    line.addWithColor(COLOR.white, " " + tableStyle.vertical);
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
      table.columns.map(m => m.max_ln)
    )
  );

  // ║ index ║                                  text ║  value ║
  let row = createHeaderAsRow(createRow, table.columns);
  ret.push(prepareLineAndPrint(table.tableStyle, table.columns, row));

  // ╟═══════╬═══════════════════════════════════════╬════════╢
  ret.push(
    printTableHorizontalBorders(
      table.tableStyle.headerBottom,
      table.columns.map(m => m.max_ln)
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
      table.columns.map(m => m.max_ln)
    )
  );
  return ret;
}

function calculateColumnProperty(table: TableInternal) {
  for (let column of table.columns) {
    column.max_ln = findMaxLenOfColumn(column, table.rows);
  }
}

export function printTableTest(table: TableInternal): string[] {
  calculateColumnProperty(table);
  let ret: string[] = [];
  printTableHeaders(table).forEach(row => ret.push(row));
  for (let row of table.rows) {
    printRow(table, row).forEach(row => ret.push(row));
  }
  printTableEnding(table).forEach(row => ret.push(row));
  return ret;
}

export function printTable(table: TableInternal) {
  printTableTest(table);
}

export function printSimpleTableTest(rows: any[]) {
  let table = new TableInternal();
  table.addRows(rows);
  return printTableTest(table);
}

export function printSimpleTable(rows: any[]) {
  printSimpleTableTest(rows);
}
