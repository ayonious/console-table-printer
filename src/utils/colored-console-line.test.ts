import ColoredConsoleLine, { DEFAULT_COLOR_MAP } from './colored-console-line';

describe('ColoredConsoleLine', () => {
  it('should initialize with empty text', () => {
    const line = new ColoredConsoleLine();
    expect(line.text).toBe('');
  });

  it('should initialize with default color map', () => {
    const line = new ColoredConsoleLine();
    expect(line.colorMap).toEqual(DEFAULT_COLOR_MAP);
  });

  it('should initialize with custom color map', () => {
    const customColorMap = {
      red: '\x1b[31m',
      reset: '\x1b[0m',
    };
    const line = new ColoredConsoleLine(customColorMap);
    expect(line.colorMap).toEqual(customColorMap);
  });

  describe('addCharsWithColor', () => {
    it('should add colored text when color exists in map', () => {
      const line = new ColoredConsoleLine();
      line.addCharsWithColor('red', 'test');
      expect(line.text).toBe('\x1b[31mtest\x1b[0m');
    });

    it('should add plain text when color does not exist in map', () => {
      const line = new ColoredConsoleLine();
      line.addCharsWithColor('nonexistent' as any, 'test');
      expect(line.text).toBe('test');
    });

    it('should concatenate multiple colored texts', () => {
      const line = new ColoredConsoleLine();
      line.addCharsWithColor('red', 'red');
      line.addCharsWithColor('blue', 'blue');
      expect(line.text).toBe('\x1b[31mred\x1b[0m\x1b[34mblue\x1b[0m');
    });
  });

  describe('renderConsole', () => {
    it('should return the current text', () => {
      const line = new ColoredConsoleLine();
      line.addCharsWithColor('red', 'test');
      expect(line.renderConsole()).toBe('\x1b[31mtest\x1b[0m');
    });

    it('should return empty string for new instance', () => {
      const line = new ColoredConsoleLine();
      expect(line.renderConsole()).toBe('');
    });
  });
});
