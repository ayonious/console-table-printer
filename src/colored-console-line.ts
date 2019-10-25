import { COLOR } from "./table-constants";

const COLOR_MAP = {
  [COLOR.red]: "\x1b[31m",
  [COLOR.green]: "\x1b[32m",
  [COLOR.yellow]: "\x1b[33m",
  [COLOR.blue]: "\x1b[34m",
  [COLOR.magenta]: "\x1b[35m",
  [COLOR.cyan]: "\x1b[36m",
  [COLOR.white]: "\x1b[37m",
  [COLOR.crimson]: "\x1b[38m",
  [COLOR.white_bold]: "\x1b[01m",
  [COLOR.reset]: "\x1b[0m"
};

export class ColoredConsoleLine {
  text: string;

  constructor() {
    this.text = "";
  }

  addWithColor(color:COLOR, text: string) {
    this.text += COLOR_MAP[color];
    this.text += text;
    this.text += COLOR_MAP[COLOR.reset];
  }

  printConsole(): string {
    console.log(this.text);
    return this.text;
  }
}
