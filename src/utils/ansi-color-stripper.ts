/* eslint-disable no-control-regex */
const color8Regex = /\x1b\[\d{1,3}m/g; // \x1b[30m  \x1b[305m
const color16Regex = /\x1b\[\d{1,2};1m/g; // \x1b[30;1m
const color256Regex = /\x1b\[48;5;\d{1,3}m/g; // \x1b[48;5;101m

const stripAnsi = (str: string): string => {
  return str
    .replace(color8Regex, '')
    .replace(color16Regex, '')
    .replace(color256Regex, '');
};

export default stripAnsi;