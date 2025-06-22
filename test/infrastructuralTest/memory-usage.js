const { printTable, Table } = require('../../dist/index');

// Memory usage test for console-table-printer
function measureMemoryUsage() {
  const results = {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    tests: {}
  };

  // Test 1: Basic printTable memory usage
  function testBasicPrintTable() {
    const initialMemory = process.memoryUsage();
    
    const data = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      score: Math.floor(Math.random() * 1000)
    }));

    // Capture console.log to prevent output
    const originalLog = console.log;
    console.log = () => {};

    printTable(data);

    const finalMemory = process.memoryUsage();
    console.log = originalLog;

    return {
      initial: initialMemory,
      final: finalMemory,
      difference: {
        heapUsed: finalMemory.heapUsed - initialMemory.heapUsed,
        heapTotal: finalMemory.heapTotal - initialMemory.heapTotal,
        external: finalMemory.external - initialMemory.external,
        rss: finalMemory.rss - initialMemory.rss
      }
    };
  }

  // Test 2: Table instance memory usage
  function testTableInstance() {
    const initialMemory = process.memoryUsage();
    
    const table = new Table();
    
    // Add 100 rows
    for (let i = 0; i < 100; i++) {
      table.addRow({
        id: i + 1,
        name: `User ${i + 1}`,
        value: Math.random() * 1000
      });
    }

    // Capture console.log to prevent output
    const originalLog = console.log;
    console.log = () => {};

    table.printTable();

    const finalMemory = process.memoryUsage();
    console.log = originalLog;

    return {
      initial: initialMemory,
      final: finalMemory,
      difference: {
        heapUsed: finalMemory.heapUsed - initialMemory.heapUsed,
        heapTotal: finalMemory.heapTotal - initialMemory.heapTotal,
        external: finalMemory.external - initialMemory.external,
        rss: finalMemory.rss - initialMemory.rss
      }
    };
  }

  // Test 3: Advanced features memory usage
  function testAdvancedFeatures() {
    const initialMemory = process.memoryUsage();
    
    const table = new Table({
      title: 'Memory Test',
      columns: [
        { name: 'id', alignment: 'left', color: 'blue' },
        { name: 'name', alignment: 'center' },
        { name: 'score', alignment: 'right' }
      ],
      colorMap: {
        high: '\x1b[32m',
        low: '\x1b[31m'
      },
      sort: (a, b) => b.score - a.score,
      filter: (row) => row.score > 500
    });

    const data = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      score: Math.floor(Math.random() * 1000)
    }));

    table.addRows(data);

    // Capture console.log to prevent output
    const originalLog = console.log;
    console.log = () => {};

    table.printTable();

    const finalMemory = process.memoryUsage();
    console.log = originalLog;

    return {
      initial: initialMemory,
      final: finalMemory,
      difference: {
        heapUsed: finalMemory.heapUsed - initialMemory.heapUsed,
        heapTotal: finalMemory.heapTotal - initialMemory.heapTotal,
        external: finalMemory.external - initialMemory.external,
        rss: finalMemory.rss - initialMemory.rss
      }
    };
  }

  // Test 4: Memory leak detection
  function testMemoryLeak() {
    const initialMemory = process.memoryUsage();
    
    // Perform multiple operations
    for (let i = 0; i < 10; i++) {
      const table = new Table();
      
      const data = Array.from({ length: 50 }, (_, j) => ({
        id: j + 1,
        name: `User ${j + 1}`,
        value: Math.random() * 1000
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
        rss: finalMemory.rss - initialMemory.rss
      }
    };
  }

  // Run all tests
  console.log('Running memory usage tests...\n');

  results.tests.basicPrintTable = testBasicPrintTable();
  console.log('✓ Basic printTable test completed');

  results.tests.tableInstance = testTableInstance();
  console.log('✓ Table instance test completed');

  results.tests.advancedFeatures = testAdvancedFeatures();
  console.log('✓ Advanced features test completed');

  results.tests.memoryLeak = testMemoryLeak();
  console.log('✓ Memory leak test completed');

  // Save results to file
  const fs = require('fs');
  const path = require('path');
  
  const outputPath = path.join(process.cwd(), 'memory-usage.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

  // Print summary
  console.log('\n=== Memory Usage Summary ===');
  console.log(`Node.js Version: ${results.nodeVersion}`);
  console.log(`Platform: ${results.platform} ${results.arch}`);
  console.log(`Timestamp: ${results.timestamp}\n`);

  Object.entries(results.tests).forEach(([testName, testResult]) => {
    const heapUsedMB = (testResult.difference.heapUsed / 1024 / 1024).toFixed(2);
    const rssMB = (testResult.difference.rss / 1024 / 1024).toFixed(2);
    
    console.log(`${testName}:`);
    console.log(`  Heap Used: ${heapUsedMB} MB`);
    console.log(`  RSS: ${rssMB} MB`);
    console.log('');
  });

  console.log(`Detailed results saved to: ${outputPath}`);
}

// Run the memory usage test
measureMemoryUsage(); 