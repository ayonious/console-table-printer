import { printTableTest } from "../src/internal-table-printer";

describe("Example: Print a simple Table without table instance creation", () => {
  it(`simple print`, function() {
    const testCases = [
      { index: 3, text: "I would like some gelb bananen bitte", value: 100 },
      { index: 4, text: "I hope batch update is working", value: 300 }
    ];
    const tableArray: string[] = printTableTest(testCases);

    const expected = [
      "┌───────┬──────────────────────────────────────┬───────┐",
      "\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[01mindex\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01m                                text\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[01mvalue\u001b[0m\u001b[37m │\u001b[0m",
      "├───────┼──────────────────────────────────────┼───────┤",
      "\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    3\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37mI would like some gelb bananen bitte\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m  100\u001b[0m\u001b[37m │\u001b[0m",
      "\u001b[37m│\u001b[0m\u001b[37m \u001b[0m\u001b[37m    4\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m      I hope batch update is working\u001b[0m\u001b[37m │\u001b[0m\u001b[37m \u001b[0m\u001b[37m  300\u001b[0m\u001b[37m │\u001b[0m",
      "└───────┴──────────────────────────────────────┴───────┘"
    ];

    expect(JSON.stringify(tableArray)).toBe(JSON.stringify(expected));

  });
});
