import { ALIGNMENT, COLOR } from '../utils/table-constants';
import { Dictionary } from './common';

/* 
All the fields of Internal Table has to be mandatory
These fields are generated based on user input 
and during generated is some input is missing it is filled by default value.
*/

export interface Column {
  name: string;
  title: string;
  alignment?: ALIGNMENT;
  color?: COLOR;
  max_ln?: number;
}

export interface Row {
  color: COLOR;
  text: Dictionary;
}
