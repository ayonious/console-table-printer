import Table from './src/console-table-printer';
import {
  printSimpleTable as printTable,
  renderSimpleTable as renderTable,
} from './src/internalTable/internal-table-printer';

import { ALIGNMENT, COLOR } from './src/models/external-table';
import { stripAnsi } from './src/utils/console-utils';

export { ALIGNMENT, COLOR, Table, printTable, renderTable, stripAnsi };
