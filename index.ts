import Table from './src/console-table-printer';
import {
  printSimpleTable as printTable,
  renderSimpleTable as renderTable,
} from './src/internalTable/internal-table-printer';

import { COLOR, ALIGNMENT } from './src/models/external-table';
import { ColorMap, DEFAULT_COLOR_MAP } from './src/utils/colored-console-line';

export { Table, printTable, renderTable, COLOR, ALIGNMENT };
