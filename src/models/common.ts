import { ALIGNMENTS, COLORS } from '../utils/table-constants';

/**
 * Text alignment options for table columns
 */
export type ALIGNMENT = (typeof ALIGNMENTS)[number];

/**
 * Available colors for text and styling
 */
export type COLOR = (typeof COLORS)[number];

/**
 * Generic dictionary type for key-value pairs
 */
export interface Dictionary {
  [key: string]: any;
}

/**
 * Mapping of characters to their display lengths (useful for special characters like emojis)
 */
export interface CharLengthDict {
  [key: string]: number;
}

/**
 * Internal representation of a table row with styling and content
 */
export interface Row {
  /** Text color for this row */
  color: COLOR;
  /** Whether to add a separator line after this row */
  separator: boolean;
  /** The actual data content of the row */
  text: Dictionary;
}
