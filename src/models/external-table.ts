import { Dictionary, ALIGNMENT, COLOR } from './common';

export { ALIGNMENT, COLOR };

export interface Column {
  name: string;
  title: string;
  alignment?: ALIGNMENT;
  color?: COLOR;
  maxLen?: number;
}
