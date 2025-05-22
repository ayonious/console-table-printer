import { ALIGNMENT, COLOR } from '../models/common';
import { ColumnOptionsRaw } from '../models/external-table';
import { Column } from '../models/internal-table';
import { DEFAULT_ROW_ALIGNMENT } from '../utils/table-constants';

export const objIfExists = (key: string, val: any) => {
  if (!val) {
    return {};
  }

  return {
    [key]: val,
  };
};

export const rawColumnToInternalColumn = (
  column: ColumnOptionsRaw,
  defaultColumnStyles?: {
    alignment?: ALIGNMENT;
    color?: COLOR;
    maxLen?: number;
    minLen?: number;
  }
): Column => ({
  name: column.name,
  title: column.title ?? column.name,
  ...objIfExists('color', (column.color || defaultColumnStyles?.color) as COLOR),
  ...objIfExists('maxLen', (column.maxLen || defaultColumnStyles?.maxLen) as number),
  ...objIfExists('minLen', (column.minLen || defaultColumnStyles?.minLen) as number),
  alignment: (column.alignment || defaultColumnStyles?.alignment || DEFAULT_ROW_ALIGNMENT) as ALIGNMENT,
});
