const COLOR_MAP = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  crimson: "\x1b[38m",
  white_bold: "\x1b[01m",
  reset: "\x1b[0m"
};

export class ColoredConsoleLine {
  text: string;

  constructor() {
    this.text = "";
  }

  addWithColor(color, text) {
    this.text += COLOR_MAP[color];
    this.text += text;
    this.text += COLOR_MAP.reset;
  }

  printConsole() {
    console.log(this.text);
    return this.text;
  }
}
