import Table from './src/console-table-printer';
import {
  printSimpleTable,
  renderSimpleTable,
} from './src/internalTable/internal-table-printer';

import { COLOR, ALIGNMENT } from './src/models/external-table';

export { Table, printSimpleTable as printTable, renderSimpleTable as renderTable, COLOR, ALIGNMENT };
