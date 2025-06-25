import { CharLengthDict, Row } from '../models/common';
import { ComplexOptions } from '../models/external-table';
import { Column, TableStyleDetails } from '../models/internal-table';
import ColoredConsoleLine, { ColorMap } from '../utils/colored-console-line';
import { textWithPadding } from '../utils/string-utils';
import {
  DEFAULT_COLUMN_LEN,
  DEFAULT_HEADER_ALIGNMENT,
  DEFAULT_HEADER_FONT_COLOR,
  DEFAULT_ROW_ALIGNMENT,
  DEFAULT_ROW_FONT_COLOR,
} from '../utils/table-constants';
import {
  cellText,
  createHeaderAsRow,
  createRow,
  getWidthLimitedColumnsArray,
  renderTableHorizontalBorders,
} from '../utils/table-helpers';
import TableInternal from './internal-table';
import { preProcessColumns, preProcessRows } from './table-pre-processors';

// ║ Index ║         ║        ║
const renderOneLine = (
  tableStyle: TableStyleDetails,
  columns: Column[],
  currentLineIndex: number,
  widthLimitedColumnsArray: { [key: string]: string[] },
  isHeader: boolean | undefined,
  row: Row,
  colorMap: ColorMap,
  charLength?: CharLengthDict
): string => {
  const line = new ColoredConsoleLine(colorMap);
  line.addCharsWithColor('', tableStyle.vertical); // dont Color the Column borders
  columns.forEach((column) => {
    const thisLineHasText =
      currentLineIndex < widthLimitedColumnsArray[column.name].length;

    const textForThisLine: string = thisLineHasText
      ? cellText(widthLimitedColumnsArray[column.name][currentLineIndex])
      : '';

    line.addCharsWithColor(DEFAULT_ROW_FONT_COLOR, ' ');
    line.addCharsWithColor(
      (isHeader && DEFAULT_HEADER_FONT_COLOR) || column.color || row.color,
      textWithPadding(
        textForThisLine,
        column.alignment || DEFAULT_ROW_ALIGNMENT,
        column.length || DEFAULT_COLUMN_LEN,
        charLength
      )
    );
    line.addCharsWithColor('', ` ${tableStyle.vertical}`); // dont Color the Column borders
  });
  return line.renderConsole();
};

// ║ Index ║         ║        ║
// ║ Index ║         ║        ║
// ║ Index ║         ║        ║
const renderWidthLimitedLines = (
  tableStyle: TableStyleDetails,
  columns: Column[],
  row: Row,
  colorMap: ColorMap,
  isHeader?: boolean,
  charLength?: CharLengthDict
): string[] => {
  const widthLimitedColumnsArray = getWidthLimitedColumnsArray(
    columns,
    row,
    charLength
  );

  const maxLines = Math.max(
    ...Object.values(widthLimitedColumnsArray).map((arr) => arr.length)
  );

  const ret: string[] = [];
  for (let i = 0; i < maxLines; i++) {
    ret.push(
      renderOneLine(
        tableStyle,
        columns,
        i,
        widthLimitedColumnsArray,
        isHeader,
        row,
        colorMap,
        charLength
      )
    );
  }
  return ret;
};

/*
 ╔═══════╦═══════════════════════════════════════╦════════╗
 ║ index ║                                  text ║  value ║
 ╟═══════╬═══════════════════════════════════════╬════════╢
*/
const renderTableHeaders = <T>(table: TableInternal<T>): string[] => {
  let ret: string[] = [];

  // ╔═══════╦═══════════════════════════════════════╦════════╗
  ret.push(
    renderTableHorizontalBorders(
      table.tableStyle.headerTop,
      table.columns.map((m: Column) => m.length || DEFAULT_COLUMN_LEN)
    )
  );

  // ║ index ║                                  text ║  value ║
  const row = createHeaderAsRow(createRow, table.columns);
  ret = ret.concat(
    renderWidthLimitedLines(
      table.tableStyle,
      table.columns,
      row,
      table.colorMap,
      true
    )
  );

  // ╟═══════╬═══════════════════════════════════════╬════════╢
  ret.push(
    renderTableHorizontalBorders(
      table.tableStyle.headerBottom,
      table.columns.map((m) => m.length || DEFAULT_COLUMN_LEN)
    )
  );

  return ret;
};

const renderTableBody = <T>(table: TableInternal<T>): string[] => {
  const ret: string[] = [];

  table.rows.forEach((row) => {
    ret.push(
      ...renderWidthLimitedLines(
        table.tableStyle,
        table.columns,
        row,
        table.colorMap,
        false,
        table.charLength
      )
    );
    ret.push(...renderRowSeparator(table, row));
  });

  return ret;
};

const renderRowSeparator = <T>(table: TableInternal<T>, row: Row): string[] => {
  const ret: string[] = [];
  const lastRowIndex = table.rows.length - 1;
  const currentRowIndex = table.rows.indexOf(row);

  if (currentRowIndex !== lastRowIndex && row.separator) {
    // ╟═══════╬═══════════════════════════════════════╬════════╢
    ret.push(
      renderTableHorizontalBorders(
        table.tableStyle.rowSeparator,
        table.columns.map((m) => m.length || DEFAULT_COLUMN_LEN)
      )
    );
  }
  return ret;
};

const renderTableBottom = <T>(table: TableInternal<T>): string[] => {
  const ret: string[] = [];

  // ╚═══════╩═══════════════════════════════════════╩════════╝
  ret.push(
    renderTableHorizontalBorders(
      table.tableStyle.tableBottom,
      table.columns.map((m) => m.length || DEFAULT_COLUMN_LEN)
    )
  );

  return ret;
};

export const renderTable = <T>(table: TableInternal<T>): string => {
  preProcessColumns(table);
  preProcessRows(table);

  let ret: string[] = [];

  if (table.title) {
    ret.push(table.title);
    ret.push('');
  }

  if (table.columns.length === 0) {
    return ret.join('\n');
  }

  ret = ret.concat(renderTableHeaders(table));
  ret = ret.concat(renderTableBody(table));
  ret = ret.concat(renderTableBottom(table));

  return ret.join('\n');
};

export const printSimpleTable = <T>(rows: T[]): void => {
  const table = new TableInternal<T>();
  table.addRows(rows);
  console.log(renderTable(table));
};

export const renderSimpleTable = <T>(rows: T[]): string => {
  const table = new TableInternal<T>();
  table.addRows(rows);
  return renderTable(table);
};
