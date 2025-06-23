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

  // Performance limits
  const PERFORMANCE_LIMITS = {
    basicPrintTable: 500,    // 500ms for basic printTable
    tableInstance: 300,      // 300ms for table instance operations
    advancedFeatures: 800,   // 800ms for advanced features
    memoryLeak: 1000,        // 1 second for memory leak test
    memoryIncrease: 20       // 20MB max memory increase
  };

  // Helper function to measure performance
  function measurePerformance(testName, testFunction, maxDuration) {
    const start = performance.now();
    
    // Capture console.log to prevent output
    const originalLog = console.log;
    console.log = () => {};

    const result = testFunction();

    const end = performance.now();
    const duration = end - start;
    
    console.log = originalLog;
    
    // Assert performance limit
    if (duration > maxDuration) {
      throw new Error(`${testName} exceeded performance limit: ${duration.toFixed(2)}ms > ${maxDuration}ms`);
    }
    
    console.log(`✓ ${testName} completed in ${duration.toFixed(2)}ms`);
    
    return { result, duration };
  }

  // Test 1: Basic printTable memory usage
  function testBasicPrintTable() {
    const data = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      score: Math.floor(Math.random() * 1000)
    }));

    const initialMemory = process.memoryUsage();
    printTable(data);
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

  // Test 2: Table instance memory usage
  function testTableInstance() {
    const table = new Table();
    
    // Add 100 rows
    for (let i = 0; i < 100; i++) {
      table.addRow({
        id: i + 1,
        name: `User ${i + 1}`,
        value: Math.random() * 1000
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
        rss: finalMemory.rss - initialMemory.rss
      }
    };
  }

  // Test 3: Advanced features memory usage
  function testAdvancedFeatures() {
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

  // Run all tests with performance assertions
  console.log('Running memory usage tests with performance assertions...\n');

  try {
    const { result: basicResult, duration: basicDuration } = measurePerformance(
      'Basic printTable test',
      testBasicPrintTable,
      PERFORMANCE_LIMITS.basicPrintTable
    );
    results.tests.basicPrintTable = basicResult;
    results.tests.basicPrintTable.duration = basicDuration;

    const { result: tableResult, duration: tableDuration } = measurePerformance(
      'Table instance test',
      testTableInstance,
      PERFORMANCE_LIMITS.tableInstance
    );
    results.tests.tableInstance = tableResult;
    results.tests.tableInstance.duration = tableDuration;

    const { result: advancedResult, duration: advancedDuration } = measurePerformance(
      'Advanced features test',
      testAdvancedFeatures,
      PERFORMANCE_LIMITS.advancedFeatures
    );
    results.tests.advancedFeatures = advancedResult;
    results.tests.advancedFeatures.duration = advancedDuration;

    const { result: leakResult, duration: leakDuration } = measurePerformance(
      'Memory leak test',
      testMemoryLeak,
      PERFORMANCE_LIMITS.memoryLeak
    );
    results.tests.memoryLeak = leakResult;
    results.tests.memoryLeak.duration = leakDuration;

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
      const duration = testResult.duration ? ` (${testResult.duration.toFixed(2)}ms)` : '';
      
      console.log(`${testName}:${duration}`);
      console.log(`  Heap Used: ${heapUsedMB} MB`);
      console.log(`  RSS: ${rssMB} MB`);
      
      // Assert memory limits
      if (testResult.difference.heapUsed > PERFORMANCE_LIMITS.memoryIncrease * 1024 * 1024) {
        throw new Error(`${testName} exceeded memory limit: ${heapUsedMB}MB > ${PERFORMANCE_LIMITS.memoryIncrease}MB`);
      }
      
      console.log('');
    });

    console.log(`Detailed results saved to: ${outputPath}`);
    console.log('\n✅ All performance and memory tests passed!');

  } catch (error) {
    console.error('\n❌ Performance test failed:', error.message);
    process.exit(1);
  }
}

// Run the memory usage test
measureMemoryUsage(); 