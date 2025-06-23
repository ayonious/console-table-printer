import Table from './src/console-table-printer';
import {
  printSimpleTable as printTable,
  renderSimpleTable as renderTable,
} from './src/internalTable/internal-table-printer';

import {
  COLOR,
  ALIGNMENT,
  ComplexOptions,
  ColumnOptionsRaw,
  ComputedColumn,
  RowSortFunction,
  RowFilterFunction,
  DefaultColumnOptions,
} from './src/models/external-table';

export {
  Table,
  printTable,
  renderTable,
  COLOR,
  ALIGNMENT,
  ComplexOptions,
  ColumnOptionsRaw,
  ComputedColumn,
  RowSortFunction,
  RowFilterFunction,
  DefaultColumnOptions,
};
