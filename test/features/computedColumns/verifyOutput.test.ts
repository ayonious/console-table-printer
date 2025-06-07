import { Table } from '../../../index';
import { getTableBody, getTableHeader } from '../../testUtils/getRawData';

describe('Testing computed columns output verification', () => {
    // Helper function to verify numeric content
    const verifyNumericContent = (content: string, expectedValue: number) => {
        expect(parseFloat(content.trim())).toBe(expectedValue);
    };

    // Helper function to verify string content
    const verifyStringContent = (content: string, expectedText: string) => {
        expect(content.trim()).toBe(expectedText);
    };

    it('should verify basic arithmetic computations', () => {
        const p = new Table({
            shouldDisableColors: true,
            columns: [
                { name: 'value1', alignment: 'right' },
                { name: 'value2', alignment: 'right' }
            ],
            computedColumns: [
                {
                    name: 'sum',
                    function: (row) => row.value1 + row.value2,
                },
                {
                    name: 'difference',
                    function: (row) => row.value1 - row.value2,
                },
                {
                    name: 'product',
                    function: (row) => row.value1 * row.value2,
                }
            ]
        });

        const testData = [
            { value1: 10, value2: 5 },  // sum: 15, diff: 5, prod: 50
            { value1: 20, value2: 10 }  // sum: 30, diff: 10, prod: 200
        ];

        p.addRows(testData);
        p.printTable();

        const contentLines = getTableBody(p);
        contentLines.forEach((line, index) => {
            const [, val1, val2, sum, diff, prod] = line.split('│');
            const row = testData[index];
            
            verifyNumericContent(val1, row.value1);
            verifyNumericContent(val2, row.value2);
            verifyNumericContent(sum, row.value1 + row.value2);
            verifyNumericContent(diff, row.value1 - row.value2);
            verifyNumericContent(prod, row.value1 * row.value2);
        });

        expect(p.render()).toMatchSnapshot();
    });

    it('should verify string manipulations', () => {
        const p = new Table({
            shouldDisableColors: true,
            columns: [
                { name: 'firstName' },
                { name: 'lastName' }
            ],
            computedColumns: [
                {
                    name: 'fullName',
                    function: (row) => `${row.firstName} ${row.lastName}`,
                },
                {
                    name: 'initials',
                    function: (row) => `${row.firstName[0]}.${row.lastName[0]}.`,
                }
            ]
        });

        const testData = [
            { firstName: 'John', lastName: 'Doe' },
            { firstName: 'Jane', lastName: 'Smith' }
        ];

        p.addRows(testData);
        p.printTable();

        const contentLines = getTableBody(p);
        contentLines.forEach((line, index) => {
            const [, first, last, full, initials] = line.split('│');
            const row = testData[index];
            
            verifyStringContent(first, row.firstName);
            verifyStringContent(last, row.lastName);
            verifyStringContent(full, `${row.firstName} ${row.lastName}`);
            verifyStringContent(initials, `${row.firstName[0]}.${row.lastName[0]}.`);
        });

        expect(p.render()).toMatchSnapshot();
    });

    it('should verify conditional computations', () => {
        const p = new Table({
            shouldDisableColors: true,
            columns: [
                { name: 'score', alignment: 'right' }
            ],
            computedColumns: [
                {
                    name: 'grade',
                    function: (row) => {
                        if (row.score >= 90) return 'A';
                        if (row.score >= 80) return 'B';
                        if (row.score >= 70) return 'C';
                        if (row.score >= 60) return 'D';
                        return 'F';
                    },
                },
                {
                    name: 'status',
                    function: (row) => (row.score >= 60 ? 'PASS' : 'FAIL'),
                }
            ]
        });

        const testData = [
            { score: 95 }, // A, PASS
            { score: 85 }, // B, PASS
            { score: 55 }  // F, FAIL
        ];

        p.addRows(testData);
        p.printTable();

        const contentLines = getTableBody(p);
        contentLines.forEach((line, index) => {
            const [, score, grade, status] = line.split('│');
            const row = testData[index];
            
            verifyNumericContent(score, row.score);
            
            // Verify grade
            const expectedGrade = 
                row.score >= 90 ? 'A' :
                row.score >= 80 ? 'B' :
                row.score >= 70 ? 'C' :
                row.score >= 60 ? 'D' : 'F';
            verifyStringContent(grade, expectedGrade);
            
            // Verify status
            verifyStringContent(status, row.score >= 60 ? 'PASS' : 'FAIL');
        });

        expect(p.render()).toMatchSnapshot();
    });

    it('should verify computations with row index', () => {
        const p = new Table({
            shouldDisableColors: true,
            columns: [
                { name: 'value', alignment: 'right' }
            ],
            computedColumns: [
                {
                    name: 'rowNum',
                    function: (row, index) => index + 1,
                },
                {
                    name: 'runningTotal',
                    function: (row, index, rows) => {
                        let total = 0;
                        for (let i = 0; i <= index; i++) {
                            total += rows[i].value;
                        }
                        return total;
                    },
                }
            ]
        });

        const testData = [
            { value: 10 },
            { value: 20 },
            { value: 30 }
        ];

        p.addRows(testData);
        p.printTable();

        const contentLines = getTableBody(p);
        let runningTotal = 0;
        
        contentLines.forEach((line, index) => {
            const [, value, rowNum, total] = line.split('│');
            const row = testData[index];
            
            runningTotal += row.value;
            
            verifyNumericContent(value, row.value);
            verifyNumericContent(rowNum, index + 1);
            verifyNumericContent(total, runningTotal);
        });

        expect(p.render()).toMatchSnapshot();
    });

    it('should verify header content of computed columns', () => {
        const p = new Table({
            shouldDisableColors: true,
            columns: [
                { name: 'value1', title: 'First Value' },
                { name: 'value2', title: 'Second Value' }
            ],
            computedColumns: [
                {
                    name: 'sum',
                    title: 'Total',
                    function: (row) => row.value1 + row.value2,
                }
            ]
        });

        p.addRow({ value1: 10, value2: 20 });
        p.printTable();

        const headerLine = getTableHeader(p);
        const [, first, second, total] = headerLine.split('│');

        verifyStringContent(first, 'First Value');
        verifyStringContent(second, 'Second Value');
        verifyStringContent(total, 'Total');

        expect(p.render()).toMatchSnapshot();
    });
}); 