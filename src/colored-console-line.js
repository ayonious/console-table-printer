const COLOR_MAP = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    white: '\x1b[37m',
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    crimson: "\x1b[38m",
    white_bold: '\x1b[01m',
    reset: "\x1b[0m"
};

class ColoredConsoleLine {
    constructor() {
        this.text = '';
    }

    addWithColor(color, text) {
        this.text += COLOR_MAP[color];
        this.text += text;
        this.text += COLOR_MAP.reset;
    }

    printConsole() {
        console.log(this.text);
    }
}

module.exports = {
    ColoredConsoleLine
}
