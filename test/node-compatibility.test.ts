import { printTable } from '../src/console-table-printer';

describe('Node.js Compatibility Tests', () => {
  it('should run on Node.js version 10.0.0 or higher', () => {
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0], 10);
    
    console.log(`Running on Node.js ${nodeVersion}`);
    expect(majorVersion).toBeGreaterThanOrEqual(10);
  });

  it('should support ES2017+ features required by the library', () => {
    // Test async/await support (ES2017)
    const asyncTest = async () => {
      await Promise.resolve('test');
      return 'async works';
    };
    
    expect(asyncTest).toBeDefined();
    expect(typeof asyncTest).toBe('function');

    // Test Object.entries (ES2017)
    const testObj = { a: 1, b: 2 };
    const entries = Object.entries(testObj);
    expect(entries).toEqual([['a', 1], ['b', 2]]);

    // Test Object.values (ES2017)
    const values = Object.values(testObj);
    expect(values).toEqual([1, 2]);

    // Test string padding methods (ES2017)
    expect('test'.padStart(6, '0')).toBe('00test');
    expect('test'.padEnd(6, '0')).toBe('test00');
  });

  it('should support Node.js 10+ specific features', () => {
    // Test that we have access to newer process features
    expect(process.version).toBeDefined();
    expect(process.versions).toBeDefined();
    expect(process.versions.node).toBeDefined();
    
    // Test that fs promises are available (Node.js 10+)
    // Note: We don't actually use fs in our library, but this tests Node.js 10+ availability
    const fs = require('fs');
    expect(fs.promises).toBeDefined();
    expect(typeof fs.promises.readFile).toBe('function');
  });

  it('should work with modern V8 features available in Node.js 10+', () => {
    // Test optional catch binding (Node.js 10+)
    let errorCaught = false;
    try {
      JSON.parse('invalid json');
    } catch {
      // No error parameter needed in Node.js 10+
      errorCaught = true;
    }
    expect(errorCaught).toBe(true);

    // Test Array.prototype.flat (Node.js 11+, but good to test if available)
    const nestedArray = [1, [2, 3], [4, [5, 6]]];
    if (Array.prototype.flat) {
      expect(nestedArray.flat()).toEqual([1, 2, 3, 4, [5, 6]]);
    }
  });

  it('should successfully create and render tables with Node.js 10+', async () => {
    // Test that our library actually works with Node.js 10+
    const testData = [
      { name: 'Node.js 10', feature: 'ES2018 Support', year: 2018 },
      { name: 'Node.js 12', feature: 'ES2019 Support', year: 2019 },
      { name: 'Node.js 14', feature: 'ES2020 Support', year: 2020 }
    ];

    // Mock console.log to capture output
    const originalLog = console.log;
    let output = '';
    console.log = jest.fn((str) => {
      output += str;
    });

    try {
      printTable(testData);
      expect(output).toContain('Node.js 10');
      expect(output).toContain('ES2018 Support');
      expect(output).toContain('2018');
    } finally {
      console.log = originalLog;
    }
  });

  it('should handle promises correctly with Node.js 10+ Promise implementation', async () => {
    // Test modern Promise features
    const promise1 = Promise.resolve('test1');
    const promise2 = Promise.resolve('test2');
    
    const results = await Promise.all([promise1, promise2]);
    expect(results).toEqual(['test1', 'test2']);

    // Test Promise.allSettled if available (Node.js 12.9+)
    if (Promise.allSettled) {
      const settledResults = await Promise.allSettled([
        Promise.resolve('success'),
        Promise.reject('error')
      ]);
      expect(settledResults[0].status).toBe('fulfilled');
      expect(settledResults[1].status).toBe('rejected');
    }
  });

  it('should have access to required Node.js built-in modules', () => {
    // Test that required built-in modules are available
    expect(() => require('util')).not.toThrow();
    expect(() => require('os')).not.toThrow();
    expect(() => require('path')).not.toThrow();
    
    // Test util.promisify (Node.js 8+, but important for modern Node.js)
    const util = require('util');
    expect(typeof util.promisify).toBe('function');
  });

  it('should work with Buffer methods available in Node.js 10+', () => {
    // Test Buffer.from (available in Node.js 6+, but important for compatibility)
    const buffer = Buffer.from('test', 'utf8');
    expect(buffer.toString()).toBe('test');
    
    // Test that we can create buffers from various sources
    const buffer2 = Buffer.from([1, 2, 3, 4]);
    expect(Array.from(buffer2)).toEqual([1, 2, 3, 4]);
  });
}); 