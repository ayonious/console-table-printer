import ColoredConsoleLine, { DEFAULT_COLOR_MAP } from '../../src/utils/colored-console-line';
import { COLOR } from '../../src/models/common';

describe('ColoredConsoleLine', () => {
  describe('constructor', () => {
    it('should initialize with empty text and default color map', () => {
      const line = new ColoredConsoleLine();
      expect(line.text).toBe('');
      expect(line.colorMap).toBe(DEFAULT_COLOR_MAP);
    });

    it('should accept custom color map', () => {
      const customColorMap = {
        red: '\x1b[91m',  // bright red
        reset: '\x1b[0m'
      };
      const line = new ColoredConsoleLine(customColorMap);
      expect(line.colorMap).toBe(customColorMap);
    });
  });

  describe('addCharsWithColor', () => {
    let line: ColoredConsoleLine;

    beforeEach(() => {
      line = new ColoredConsoleLine();
    });

    it('should add colored text with valid color', () => {
      line.addCharsWithColor('red', 'test');
      expect(line.text).toBe('\x1b[31mtest\x1b[0m');
    });

    it('should add text without color for undefined color', () => {
      line.addCharsWithColor('invalid' as COLOR, 'test');
      expect(line.text).toBe('test');
    });

    it('should concatenate multiple colored segments', () => {
      line.addCharsWithColor('red', 'red');
      line.addCharsWithColor('green', 'green');
      line.addCharsWithColor('blue', 'blue');
      expect(line.text).toBe('\x1b[31mred\x1b[0m\x1b[32mgreen\x1b[0m\x1b[34mblue\x1b[0m');
    });

    it('should handle empty text', () => {
      line.addCharsWithColor('red', '');
      expect(line.text).toBe(`${DEFAULT_COLOR_MAP['red']}${DEFAULT_COLOR_MAP['reset']}`);
    });

    it('should handle special characters', () => {
      line.addCharsWithColor('red', 'test\ntest');
      expect(line.text).toBe('\x1b[31mtest\ntest\x1b[0m');
    });

    it('should handle white_bold color', () => {
      line.addCharsWithColor('white_bold', 'bold');
      expect(line.text).toBe('\x1b[01mbold\x1b[0m');
    });

    it('should handle reset color', () => {
      line.addCharsWithColor('reset', 'normal');
      expect(line.text).toBe('\x1b[0mnormal\x1b[0m');
    });
  });

  describe('renderConsole', () => {
    it('should return the complete text with all color codes', () => {
      const line = new ColoredConsoleLine();
      line.addCharsWithColor('red', 'error');
      line.addCharsWithColor('green', 'success');
      expect(line.renderConsole()).toBe('\x1b[31merror\x1b[0m\x1b[32msuccess\x1b[0m');
    });

    it('should return empty string for empty line', () => {
      const line = new ColoredConsoleLine();
      expect(line.renderConsole()).toBe('');
    });
  });
}); 