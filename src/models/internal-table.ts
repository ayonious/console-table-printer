/* 
All the fields of Internal Table has to be mandatory
These fields are generated based on user input 
and during generated is some input is missing it is filled by default value.
*/

type TABLE_LINE_DETAILS_KEYS = 'left' | 'right' | 'mid' | 'other';

export type TABLE_LINE_DETAILS = {
  [key in TABLE_LINE_DETAILS_KEYS]: string;
};

export type TABLE_STYLE_DETAILS = {
  headerTop: TABLE_LINE_DETAILS;
  headerBottom: TABLE_LINE_DETAILS;
  tableBottom: TABLE_LINE_DETAILS;
  vertical: string;
};
