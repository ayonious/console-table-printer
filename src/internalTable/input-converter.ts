import { COLOR } from '../models/common';
import { ColumnOptionsRaw } from '../models/external-table';
import { Column } from '../models/internal-table';
import { defaultRowAlignment } from '../utils/table-constants';

export const objIfExists = (key: string, val: any) => {
  if (!val) {
    return {};
  }

  return {
    [key]: val,
  };
};

export const rawColumnToInternalColumn = (
  column: ColumnOptionsRaw
): Column => ({
  name: column.name,
  title: column.title || column.name,
  ...objIfExists('color', column.color as COLOR),
  ...objIfExists('maxLen', column.maxLen),
  alignment: column.alignment || defaultRowAlignment,
});
