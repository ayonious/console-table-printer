import { Column, Row } from '../models/internal-table';
import ColoredConsoleLine from '../utils/colored-console-line';
import { textWithPadding, limitWidth } from '../utils/string-utils';
import {
  defaultHeaderAlignment,
  defaultHeaderFontColor,
  defaultRowAlignment,
  defaultRowFontColor,
  TABLE_STYLE_DETAILS,
} from '../utils/table-constants';
import {
  cellText,
  createHeaderAsRow,
  createRow,
  renderTableHorizontalBorders,
  getWidthLimitedColumnsArray,
} from '../utils/table-helpers';
import { TableInternal } from './internal-table';
import { preProcessColumns, preProcessRows } from './table-pre-processors';

// ║ Bold  ║    text ║  value ║
// ║ Index ║         ║        ║
const renderLine = (
  tableStyle: TABLE_STYLE_DETAILS,
  columns: Column[],
  row: Row,
  isHeader?: boolean
): string[] => {
  // { col1: ['How', 'Is', 'Going'], col2: ['I am', 'Tom'],  }
  const widthLimitedColumnsArray = getWidthLimitedColumnsArray(columns, row);

  const ret = [];
  let currentLineIndex = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const line = new ColoredConsoleLine();
    line.addCharsWithColor(defaultRowFontColor, tableStyle.vertical);

    let atLeastOneLineHasText = false;
    // eslint-disable-next-line no-loop-func
    columns.forEach((column) => {
      const thisLineHasText =
        widthLimitedColumnsArray[column.name].length < currentLineIndex;
      atLeastOneLineHasText = atLeastOneLineHasText || thisLineHasText;

      const textForThisLine =
        (thisLineHasText &&
          widthLimitedColumnsArray[column.name][currentLineIndex]) ||
        '';

      line.addCharsWithColor(defaultRowFontColor, ' ');
      line.addCharsWithColor(
        (isHeader && defaultHeaderFontColor) || column.color || row.color, // column color is prioritized as row color
        textWithPadding(
          `${cellText(textForThisLine)}`,
          column.alignment || defaultRowAlignment,
          column.maxLen || 20
        )
      );
      line.addCharsWithColor(defaultRowFontColor, ` ${tableStyle.vertical}`);
    });

    ret.push(line.renderConsole());
    currentLineIndex += 1;
    if (!atLeastOneLineHasText) {
      break;
    }
  }

  return ret;
};

// ║ 1     ║     I would like some red wine please ║ 10.212 ║
const renderRow = (table: TableInternal, row: Row): string[] => {
  let ret: string[] = [];
  ret = ret.concat(renderLine(table.tableStyle, table.columns, row));
  return ret;
};

/*
                  The analysis Result
 ╔═══════╦═══════════════════════════════════════╦════════╗
*/
const renderTableTitle = (table: TableInternal): string[] => {
  const ret: string[] = [];

  if (table.title === undefined) {
    return ret;
  }

  const getTableWidth = () => {
    const reducer = (accumulator: number, currentValue: number) =>
      // ║ cell ║, 2 spaces + cellTextSize + one border on the left
      accumulator + currentValue + 2 + 1;
    return table.columns.map((m) => m.maxLen || 20).reduce(reducer, 1);
  };

  const titleWithPadding = textWithPadding(
    table.title as string,
    defaultHeaderAlignment,
    getTableWidth()
  );
  const styledText = new ColoredConsoleLine();
  styledText.addCharsWithColor(defaultHeaderFontColor, titleWithPadding);
  //                  The analysis Result
  ret.push(styledText.renderConsole());
  return ret;
};

/*
 ╔═══════╦═══════════════════════════════════════╦════════╗
 ║ index ║                                  text ║  value ║
 ╟═══════╬═══════════════════════════════════════╬════════╢
*/
const renderTableHeaders = (table: TableInternal): string[] => {
  let ret: string[] = [];

  // ╔═══════╦═══════════════════════════════════════╦════════╗
  ret.push(
    renderTableHorizontalBorders(
      table.tableStyle.headerTop,
      table.columns.map((m) => m.maxLen || 20)
    )
  );

  // ║ index ║                                  text ║  value ║
  const row = createHeaderAsRow(createRow, table.columns);
  ret = ret.concat(renderLine(table.tableStyle, table.columns, row, true));

  // ╟═══════╬═══════════════════════════════════════╬════════╢
  ret.push(
    renderTableHorizontalBorders(
      table.tableStyle.headerBottom,
      table.columns.map((m) => m.maxLen || 20)
    )
  );

  return ret;
};

const renderTableEnding = (table: TableInternal): string[] => {
  const ret: string[] = [];
  // ╚═══════╩═══════════════════════════════════════╩════════╝
  ret.push(
    renderTableHorizontalBorders(
      table.tableStyle.tableBottom,
      table.columns.map((m) => m.maxLen || 20)
    )
  );
  return ret;
};

export const renderTable = (table: TableInternal): string => {
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
};

export const renderSimpleTable = (rows: any[]) => {
  const table = new TableInternal();
  table.addRows(rows);
  return renderTable(table);
};

export const printSimpleTable = (rows: any[]) => {
  console.log(renderSimpleTable(rows));
};
