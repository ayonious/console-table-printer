const { printTable, Table } = require('../../dist/index');

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

  // Helper function to measure performance
  function measurePerformance(testName, testFunction, maxDuration) {
    const start = performance.now();
    
    // Capture console.log to prevent output during tests
    const originalLog = console.log;
    console.log = jest.fn();
    
    testFunction();
    
    const end = performance.now();
    const duration = end - start;
    
    console.log = originalLog;
    
    console.log(`${testName}: ${duration.toFixed(2)}ms`);
    expect(duration).toBeLessThan(maxDuration);
    
    return duration;
  }

  describe('printTable Performance', () => {
    it('should handle small datasets efficiently', () => {
      measurePerformance(
        `Small dataset (${smallDataset.length} rows)`,
        () => printTable(smallDataset),
        100
      );
    });

    it('should handle medium datasets efficiently', () => {
      measurePerformance(
        `Medium dataset (${mediumDataset.length} rows)`,
        () => printTable(mediumDataset),
        500
      );
    });

    it('should handle large datasets efficiently', () => {
      measurePerformance(
        `Large dataset (${largeDataset.length} rows)`,
        () => printTable(largeDataset),
        2000
      );
    });
  });

  describe('Table Instance Performance', () => {
    it('should create table instances efficiently', () => {
      measurePerformance(
        'Table instance creation',
        () => new Table(),
        10
      );
    });

    it('should add rows efficiently', () => {
      const table = new Table();
      measurePerformance(
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
        100
      );
    });

    it('should add multiple rows efficiently', () => {
      const table = new Table();
      measurePerformance(
        `Adding ${mediumDataset.length} rows at once`,
        () => table.addRows(mediumDataset),
        50
      );
    });

    it('should print table efficiently', () => {
      const table = new Table();
      table.addRows(mediumDataset);
      
      measurePerformance(
        `Printing table with ${mediumDataset.length} rows`,
        () => table.printTable(),
        500
      );
    });
  });

  describe('Advanced Features Performance', () => {
    it('should handle custom colors efficiently', () => {
      const table = new Table();
      measurePerformance(
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
        300
      );
    });

    it('should handle column configuration efficiently', () => {
      measurePerformance(
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
        400
      );
    });

    it('should handle sorting efficiently', () => {
      measurePerformance(
        'Sorting 100 rows',
        () => {
          const table = new Table({
            sort: (a, b) => b.score - a.score,
          });
          table.addRows(largeDataset.slice(0, 100));
          table.printTable();
        },
        300
      );
    });

    it('should handle filtering efficiently', () => {
      measurePerformance(
        'Filtering 100 rows',
        () => {
          const table = new Table({
            filter: (row) => row.score > 500,
          });
          table.addRows(largeDataset.slice(0, 100));
          table.printTable();
        },
        300
      );
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
      
      // Memory increase should be reasonable (less than 10MB)
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
      console.log(`Memory increase after 10 operations: ${(memoryIncrease / 1024 / 1024).toFixed(2)}MB`);
    });
  });

  describe('Stress Tests', () => {
    it('should handle rapid successive operations', () => {
      measurePerformance(
        '50 rapid operations',
        () => {
          for (let i = 0; i < 50; i++) {
            const table = new Table();
            table.addRow({ id: i, name: `Test ${i}`, value: i * 10 });
            table.printTable();
          }
        },
        2000
      );
    });

    it('should handle very large datasets gracefully', () => {
      const veryLargeDataset = Array.from({ length: 5000 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        score: Math.floor(Math.random() * 1000),
      }));
      
      measurePerformance(
        `Very large dataset (${veryLargeDataset.length} rows)`,
        () => printTable(veryLargeDataset),
        10000
      );
    });
  });
}); 