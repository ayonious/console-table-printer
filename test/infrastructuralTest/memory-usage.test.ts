import { printTable, Table } from '../../index';

// Memory usage test for console-table-printer
describe('Memory Usage Tests', () => {
  // Performance limits
  const PERFORMANCE_LIMITS = {
    basicPrintTable: 500, // 500ms for basic printTable
    tableInstance: 300, // 300ms for table instance operations
    advancedFeatures: 800, // 800ms for advanced features
    memoryLeak: 1000, // 1 second for memory leak test
    memoryIncrease: 20, // 20MB max memory increase
  };

  // Helper function to measure performance
  function measurePerformance(
    testName: string,
    testFunction: () => any,
    maxDuration: number
  ) {
    const start = performance.now();

    // Capture console.log to prevent output
    const originalLog = console.log;
    console.log = () => {};

    const result = testFunction();

    const end = performance.now();
    const duration = end - start;

    console.log = originalLog;

    // Assert performance limit
    expect(duration).toBeLessThan(maxDuration);

    console.log(`✓ ${testName} completed in ${duration.toFixed(2)}ms`);

    return { result, duration };
  }

  // Test data
  const testData = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    score: Math.floor(Math.random() * 1000),
  }));

  describe('Basic printTable memory usage', () => {
    it('should not consume excessive memory', () => {
      const { result } = measurePerformance(
        'Basic printTable test',
        () => {
          const initialMemory = process.memoryUsage();
          printTable(testData);
          const finalMemory = process.memoryUsage();

          return {
            initial: initialMemory,
            final: finalMemory,
            difference: {
              heapUsed: finalMemory.heapUsed - initialMemory.heapUsed,
              heapTotal: finalMemory.heapTotal - initialMemory.heapTotal,
              external: finalMemory.external - initialMemory.external,
              rss: finalMemory.rss - initialMemory.rss,
            },
          };
        },
        PERFORMANCE_LIMITS.basicPrintTable
      );

      const heapUsedMB = result.difference.heapUsed / 1024 / 1024;
      const rssMB = result.difference.rss / 1024 / 1024;

      // Memory usage should be reasonable
      expect(heapUsedMB).toBeLessThan(PERFORMANCE_LIMITS.memoryIncrease);
      expect(rssMB).toBeLessThan(PERFORMANCE_LIMITS.memoryIncrease);

      console.log(`Heap Used: ${heapUsedMB.toFixed(2)}MB`);
      console.log(`RSS: ${rssMB.toFixed(2)}MB`);
    });
  });

  describe('Table instance memory usage', () => {
    it('should not consume excessive memory with table instances', () => {
      const { result } = measurePerformance(
        'Table instance test',
        () => {
          const table = new Table();

          // Add 100 rows
          for (let i = 0; i < 100; i++) {
            table.addRow({
              id: i + 1,
              name: `User ${i + 1}`,
              value: Math.random() * 1000,
            });
          }

          const initialMemory = process.memoryUsage();
          table.printTable();
          const finalMemory = process.memoryUsage();

          return {
            initial: initialMemory,
            final: finalMemory,
            difference: {
              heapUsed: finalMemory.heapUsed - initialMemory.heapUsed,
              heapTotal: finalMemory.heapTotal - initialMemory.heapTotal,
              external: finalMemory.external - initialMemory.external,
              rss: finalMemory.rss - initialMemory.rss,
            },
          };
        },
        PERFORMANCE_LIMITS.tableInstance
      );

      const heapUsedMB = result.difference.heapUsed / 1024 / 1024;
      const rssMB = result.difference.rss / 1024 / 1024;

      // Memory usage should be reasonable
      expect(heapUsedMB).toBeLessThan(PERFORMANCE_LIMITS.memoryIncrease);
      expect(rssMB).toBeLessThan(PERFORMANCE_LIMITS.memoryIncrease);

      console.log(`Heap Used: ${heapUsedMB.toFixed(2)}MB`);
      console.log(`RSS: ${rssMB.toFixed(2)}MB`);
    });
  });

  describe('Advanced features memory usage', () => {
    it('should not consume excessive memory with advanced features', () => {
      const { result } = measurePerformance(
        'Advanced features test',
        () => {
          const table = new Table({
            title: 'Memory Test',
            columns: [
              { name: 'id', alignment: 'left', color: 'blue' },
              { name: 'name', alignment: 'center' },
              { name: 'score', alignment: 'right' },
            ],
            colorMap: {
              high: '\x1b[32m',
              low: '\x1b[31m',
            },
            sort: (a: any, b: any) => b.score - a.score,
            filter: (row: any) => row.score > 500,
          });

          table.addRows(testData);

          const initialMemory = process.memoryUsage();
          table.printTable();
          const finalMemory = process.memoryUsage();

          return {
            initial: initialMemory,
            final: finalMemory,
            difference: {
              heapUsed: finalMemory.heapUsed - initialMemory.heapUsed,
              heapTotal: finalMemory.heapTotal - initialMemory.heapTotal,
              external: finalMemory.external - initialMemory.external,
              rss: finalMemory.rss - initialMemory.rss,
            },
          };
        },
        PERFORMANCE_LIMITS.advancedFeatures
      );

      const heapUsedMB = result.difference.heapUsed / 1024 / 1024;
      const rssMB = result.difference.rss / 1024 / 1024;

      // Memory usage should be reasonable
      expect(heapUsedMB).toBeLessThan(PERFORMANCE_LIMITS.memoryIncrease);
      expect(rssMB).toBeLessThan(PERFORMANCE_LIMITS.memoryIncrease);

      console.log(`Heap Used: ${heapUsedMB.toFixed(2)}MB`);
      console.log(`RSS: ${rssMB.toFixed(2)}MB`);
    });
  });

  describe('Memory leak detection', () => {
    it('should not cause memory leaks with repeated operations', () => {
      const { result } = measurePerformance(
        'Memory leak test',
        () => {
          const initialMemory = process.memoryUsage();

          // Perform multiple operations
          for (let i = 0; i < 10; i++) {
            const table = new Table();

            const data = Array.from({ length: 50 }, (_, j) => ({
              id: j + 1,
              name: `User ${j + 1}`,
              value: Math.random() * 1000,
            }));

            table.addRows(data);

            // Capture console.log to prevent output
            const originalLog = console.log;
            console.log = () => {};
            table.printTable();
            console.log = originalLog;
          }

          // Force garbage collection
          if (global.gc) {
            global.gc();
          }

          const finalMemory = process.memoryUsage();

          return {
            initial: initialMemory,
            final: finalMemory,
            difference: {
              heapUsed: finalMemory.heapUsed - initialMemory.heapUsed,
              heapTotal: finalMemory.heapTotal - initialMemory.heapTotal,
              external: finalMemory.external - initialMemory.external,
              rss: finalMemory.rss - initialMemory.rss,
            },
          };
        },
        PERFORMANCE_LIMITS.memoryLeak
      );

      const heapUsedMB = result.difference.heapUsed / 1024 / 1024;
      const rssMB = result.difference.rss / 1024 / 1024;

      // Memory usage should be reasonable (allow for some GC variance)
      expect(heapUsedMB).toBeLessThan(PERFORMANCE_LIMITS.memoryIncrease);
      expect(heapUsedMB).toBeGreaterThan(-50); // Allow for aggressive GC
      expect(rssMB).toBeLessThan(PERFORMANCE_LIMITS.memoryIncrease);

      console.log(`Heap Used: ${heapUsedMB.toFixed(2)}MB`);
      console.log(`RSS: ${rssMB.toFixed(2)}MB`);
    });
  });
});
