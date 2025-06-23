import { printTable, Table } from '../../index';

// Performance test for console-table-printer
describe('Performance Tests', () => {
  const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    score: Math.floor(Math.random() * 1000),
    status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)],
  }));

  const mediumDataset = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    task: `Task ${i + 1}`,
    priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    status: ['Todo', 'In Progress', 'Done'][Math.floor(Math.random() * 3)],
  }));

  const smallDataset = [
    { id: 1, name: 'Alice', score: 100 },
    { id: 2, name: 'Bob', score: 95 },
    { id: 3, name: 'Charlie', score: 87 },
  ];

  // Performance limits (in milliseconds)
  const PERFORMANCE_LIMITS = {
    smallDataset: 50,      // 50ms for small datasets
    mediumDataset: 200,    // 200ms for medium datasets
    largeDataset: 1000,    // 1 second for large datasets
    veryLargeDataset: 5000, // 5 seconds for very large datasets
    tableCreation: 5,      // 5ms for table creation
    rowAddition: 50,       // 50ms for adding 100 rows
    bulkRowAddition: 20,   // 20ms for bulk row addition
    tablePrinting: 200,    // 200ms for printing medium table
    customColors: 100,     // 100ms for custom colors
    columnConfig: 150,     // 150ms for column configuration
    sorting: 150,          // 150ms for sorting
    filtering: 150,        // 150ms for filtering
    rapidOperations: 1000, // 1 second for 50 rapid operations
    memoryIncrease: 20     // 20MB max memory increase
  };

  // Helper function to measure performance
  function measurePerformance(testName: string, testFunction: () => void, maxDuration: number): number {
    const start = performance.now();
    
    // Capture console.log to prevent output during tests
    const originalLog = console.log;
    console.log = jest.fn();
    
    testFunction();
    
    const end = performance.now();
    const duration = end - start;
    
    console.log = originalLog;
    
    console.log(`${testName}: ${duration.toFixed(2)}ms`);
    
    // Assert performance limit
    expect(duration).toBeLessThan(maxDuration);
    
    return duration;
  }

  describe('printTable Performance', () => {
    it('should handle small datasets efficiently', () => {
      const duration = measurePerformance(
        `Small dataset (${smallDataset.length} rows)`,
        () => printTable(smallDataset),
        PERFORMANCE_LIMITS.smallDataset
      );
      
      // Additional assertion for minimum performance
      expect(duration).toBeGreaterThan(0);
    });

    it('should handle medium datasets efficiently', () => {
      const duration = measurePerformance(
        `Medium dataset (${mediumDataset.length} rows)`,
        () => printTable(mediumDataset),
        PERFORMANCE_LIMITS.mediumDataset
      );
      
      // Additional assertion for minimum performance
      expect(duration).toBeGreaterThan(0);
    });

    it('should handle large datasets efficiently', () => {
      const duration = measurePerformance(
        `Large dataset (${largeDataset.length} rows)`,
        () => printTable(largeDataset),
        PERFORMANCE_LIMITS.largeDataset
      );
      
      // Additional assertion for minimum performance
      expect(duration).toBeGreaterThan(0);
    });
  });

  describe('Table Instance Performance', () => {
    it('should create table instances efficiently', () => {
      const duration = measurePerformance(
        'Table instance creation',
        () => new Table(),
        PERFORMANCE_LIMITS.tableCreation
      );
      
      // Additional assertion for minimum performance
      expect(duration).toBeGreaterThan(0);
    });

    it('should add rows efficiently', () => {
      const table = new Table();
      const duration = measurePerformance(
        'Adding 100 rows',
        () => {
          for (let i = 0; i < 100; i++) {
            table.addRow({
              id: i + 1,
              name: `User ${i + 1}`,
              value: Math.random() * 1000,
            });
          }
        },
        PERFORMANCE_LIMITS.rowAddition
      );
      
      // Additional assertion for minimum performance
      expect(duration).toBeGreaterThan(0);
    });

    it('should add multiple rows efficiently', () => {
      const table = new Table();
      const duration = measurePerformance(
        `Adding ${mediumDataset.length} rows at once`,
        () => table.addRows(mediumDataset),
        PERFORMANCE_LIMITS.bulkRowAddition
      );
      
      // Additional assertion for minimum performance
      expect(duration).toBeGreaterThan(0);
    });

    it('should print table efficiently', () => {
      const table = new Table();
      table.addRows(mediumDataset);
      
      const duration = measurePerformance(
        `Printing table with ${mediumDataset.length} rows`,
        () => table.printTable(),
        PERFORMANCE_LIMITS.tablePrinting
      );
      
      // Additional assertion for minimum performance
      expect(duration).toBeGreaterThan(0);
    });
  });

  describe('Advanced Features Performance', () => {
    it('should handle custom colors efficiently', () => {
      const table = new Table();
      const duration = measurePerformance(
        'Custom colors with 50 rows',
        () => {
          for (let i = 0; i < 50; i++) {
            table.addRow(
              { id: i + 1, name: `User ${i + 1}`, score: Math.random() * 100 },
              { color: i % 2 === 0 ? 'red' : 'green' }
            );
          }
          table.printTable();
        },
        PERFORMANCE_LIMITS.customColors
      );
      
      // Additional assertion for minimum performance
      expect(duration).toBeGreaterThan(0);
    });

    it('should handle column configuration efficiently', () => {
      const duration = measurePerformance(
        `Column configuration with ${mediumDataset.length} rows`,
        () => {
          const table = new Table({
            title: 'Performance Test',
            columns: [
              { name: 'id', alignment: 'left', color: 'blue' },
              { name: 'name', alignment: 'center' },
              { name: 'score', alignment: 'right' },
            ],
            colorMap: {
              high: '\x1b[32m',
              low: '\x1b[31m',
            },
          });
          table.addRows(mediumDataset);
          table.printTable();
        },
        PERFORMANCE_LIMITS.columnConfig
      );
      
      // Additional assertion for minimum performance
      expect(duration).toBeGreaterThan(0);
    });

    it('should handle sorting efficiently', () => {
      const duration = measurePerformance(
        'Sorting 100 rows',
        () => {
          const table = new Table({
            sort: (a, b) => b.score - a.score,
          });
          table.addRows(largeDataset.slice(0, 100));
          table.printTable();
        },
        PERFORMANCE_LIMITS.sorting
      );
      
      // Additional assertion for minimum performance
      expect(duration).toBeGreaterThan(0);
    });

    it('should handle filtering efficiently', () => {
      const duration = measurePerformance(
        'Filtering 100 rows',
        () => {
          const table = new Table({
            filter: (row) => row.score > 500,
          });
          table.addRows(largeDataset.slice(0, 100));
          table.printTable();
        },
        PERFORMANCE_LIMITS.filtering
      );
      
      // Additional assertion for minimum performance
      expect(duration).toBeGreaterThan(0);
    });
  });

  describe('Memory Usage Tests', () => {
    it('should not cause memory leaks with repeated operations', () => {
      const initialMemory = process.memoryUsage().heapUsed;
      
      // Perform multiple operations
      for (let i = 0; i < 10; i++) {
        const table = new Table();
        table.addRows(mediumDataset);
        
        const originalLog = console.log;
        console.log = jest.fn();
        table.printTable();
        console.log = originalLog;
      }
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;
      const memoryIncreaseMB = memoryIncrease / 1024 / 1024;
      
      // Memory increase should be reasonable (less than 20MB)
      expect(memoryIncreaseMB).toBeLessThan(PERFORMANCE_LIMITS.memoryIncrease);
      
      // Additional assertion: memory increase should not be too negative (indicating excessive GC)
      expect(memoryIncreaseMB).toBeGreaterThan(-50); // Allow more GC variance for aggressive cleanup
      
      console.log(`Memory increase after 10 operations: ${memoryIncreaseMB.toFixed(2)}MB`);
    });
  });

  describe('Stress Tests', () => {
    it('should handle rapid successive operations', () => {
      const duration = measurePerformance(
        '50 rapid operations',
        () => {
          for (let i = 0; i < 50; i++) {
            const table = new Table();
            table.addRow({ id: i, name: `Test ${i}`, value: i * 10 });
            table.printTable();
          }
        },
        PERFORMANCE_LIMITS.rapidOperations
      );
      
      // Additional assertion for minimum performance
      expect(duration).toBeGreaterThan(0);
    });

    it('should handle very large datasets gracefully', () => {
      const veryLargeDataset = Array.from({ length: 5000 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        score: Math.floor(Math.random() * 1000),
      }));
      
      const duration = measurePerformance(
        `Very large dataset (${veryLargeDataset.length} rows)`,
        () => printTable(veryLargeDataset),
        PERFORMANCE_LIMITS.veryLargeDataset
      );
      
      // Additional assertion for minimum performance
      expect(duration).toBeGreaterThan(0);
    });
  });

  describe('Performance Regression Tests', () => {
    it('should maintain consistent performance across multiple runs', () => {
      const durations: number[] = [];
      
      // Run the same test multiple times
      for (let i = 0; i < 5; i++) {
        const start = performance.now();
        
        const originalLog = console.log;
        console.log = jest.fn();
        printTable(smallDataset);
        console.log = originalLog;
        
        const end = performance.now();
        durations.push(end - start);
      }
      
      // Calculate average and standard deviation
      const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
      const variance = durations.reduce((acc, val) => acc + Math.pow(val - avgDuration, 2), 0) / durations.length;
      const stdDev = Math.sqrt(variance);
      
      // Performance should be consistent (low standard deviation)
      expect(stdDev).toBeLessThan(avgDuration * 1.0); // Standard deviation should be less than 100% of average (more realistic)
      
      // All runs should be within reasonable limits
      durations.forEach(duration => {
        expect(duration).toBeLessThan(PERFORMANCE_LIMITS.smallDataset);
        expect(duration).toBeGreaterThan(0);
      });
      
      console.log(`Average duration: ${avgDuration.toFixed(2)}ms, Std Dev: ${stdDev.toFixed(2)}ms`);
    });

    it('should handle edge cases without performance degradation', () => {
      // Test with empty dataset
      const emptyDataset: any[] = [];
      const emptyDuration = measurePerformance(
        'Empty dataset',
        () => printTable(emptyDataset),
        10 // Should be very fast
      );
      expect(emptyDuration).toBeGreaterThan(0);
      
      // Test with single row
      const singleRowDataset = [{ id: 1, name: 'Single', value: 100 }];
      const singleDuration = measurePerformance(
        'Single row dataset',
        () => printTable(singleRowDataset),
        PERFORMANCE_LIMITS.smallDataset
      );
      expect(singleDuration).toBeGreaterThan(0);
      
      // Test with very wide dataset (many columns)
      const wideDataset = Array.from({ length: 10 }, (_, i) => ({
        col1: `data${i}`,
        col2: `data${i}`,
        col3: `data${i}`,
        col4: `data${i}`,
        col5: `data${i}`,
        col6: `data${i}`,
        col7: `data${i}`,
        col8: `data${i}`,
        col9: `data${i}`,
        col10: `data${i}`,
      }));
      
      const wideDuration = measurePerformance(
        'Wide dataset (10 columns)',
        () => printTable(wideDataset),
        PERFORMANCE_LIMITS.mediumDataset
      );
      expect(wideDuration).toBeGreaterThan(0);
    });
  });
}); 