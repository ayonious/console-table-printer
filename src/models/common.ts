import { alignments, colors } from '../utils/table-constants';

export type ALIGNMENT = typeof alignments[number];

export type COLOR = typeof colors[number];
export interface Dictionary {
  [key: string]: any;
}
export interface Row {
  color: COLOR;
  text: Dictionary;
}
