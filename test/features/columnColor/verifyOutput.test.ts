import { Table } from '../../../index';
import { getTableBody, getTableHeader } from '../../testUtils/getRawData';

describe('Testing column color output verification', () => {
    // Helper function to verify color column content
    const verifyColoredColumn = (content: string, expectedText: string) => {
        // When colors are disabled, the content should match exactly
        expect(content.trim()).toBe(expectedText);
    };

    // Test each color individually
    const availableColors = [
        'red', 'green', 'yellow', 'blue', 'magenta', 
        'cyan', 'white', 'crimson', 'white_bold', 'gray'
    ] as const;
    
    type ColorType = typeof availableColors[number];

    availableColors.forEach((color) => {
        it(`should correctly apply ${color} color to column`, () => {
            const p = new Table({
                shouldDisableColors: true,
            })
                .addColumn({
                    name: `${color}-col`,
                    color: color
                })
                .addRow({ [`${color}-col`]: 'test' });

            p.printTable();
            const contentLines = getTableBody(p);
            const content = contentLines[0].split('│')[1];
            
            verifyColoredColumn(content, 'test');
            expect(p.render()).toMatchSnapshot();
        });
    });

    it('should handle multiple colored columns', () => {
        const p = new Table({
            shouldDisableColors: true,
        })
            .addColumn({ name: 'red-col', color: 'red' })
            .addColumn({ name: 'green-col', color: 'green' })
            .addColumn({ name: 'blue-col', color: 'blue' })
            .addRows([
                {
                    'red-col': 'Red text',
                    'green-col': 'Green text',
                    'blue-col': 'Blue text'
                },
                {
                    'red-col': '123',
                    'green-col': '456',
                    'blue-col': '789'
                }
            ]);

        p.printTable();
        const contentLines = getTableBody(p);
        
        contentLines.forEach(line => {
            const [, redContent, greenContent, blueContent] = line.split('│');
            verifyColoredColumn(redContent, line.includes('123') ? '123' : 'Red text');
            verifyColoredColumn(greenContent, line.includes('456') ? '456' : 'Green text');
            verifyColoredColumn(blueContent, line.includes('789') ? '789' : 'Blue text');
        });

        expect(p.render()).toMatchSnapshot();
    });

    it('should handle color with different alignments', () => {
        const p = new Table({
            shouldDisableColors: true,
        })
            .addColumn({ name: 'left-red', color: 'red', alignment: 'left' })
            .addColumn({ name: 'center-green', color: 'green', alignment: 'center' })
            .addColumn({ name: 'right-blue', color: 'blue', alignment: 'right' })
            .addRows([
                {
                    'left-red': 'Left',
                    'center-green': 'Center',
                    'right-blue': 'Right'
                }
            ]);

        p.printTable();
        const contentLines = getTableBody(p);
        const [, leftContent, centerContent, rightContent] = contentLines[0].split('│');

        // Verify alignment with colored content
        expect(leftContent.startsWith(' ')).toBeTruthy();
        expect(rightContent.endsWith(' ')).toBeTruthy();
        
        // Count spaces manually for center alignment
        let leftSpaces = 0;
        let rightSpaces = 0;
        
        // Count left spaces
        for (let i = 0; i < centerContent.length; i++) {
            if (centerContent[i] === ' ') {
                leftSpaces++;
            } else {
                break;
            }
        }
        
        // Count right spaces
        for (let i = centerContent.length - 1; i >= 0; i--) {
            if (centerContent[i] === ' ') {
                rightSpaces++;
            } else {
                break;
            }
        }
        
        expect(Math.abs(leftSpaces - rightSpaces)).toBeLessThanOrEqual(1);

        expect(p.render()).toMatchSnapshot();
    });

    it('should handle column colors with row colors', () => {
        const p = new Table({
            shouldDisableColors: true,
        })
            .addColumn({ name: 'red-col', color: 'red' })
            .addColumn({ name: 'blue-col', color: 'blue' });

        p.addRow({ 'red-col': 'Red text', 'blue-col': 'Blue text' }, { color: 'green' });
        p.addRow({ 'red-col': '123', 'blue-col': '456' }, { color: 'yellow' });

        p.printTable();
        const contentLines = getTableBody(p);
        
        contentLines.forEach(line => {
            const [, redContent, blueContent] = line.split('│');
            verifyColoredColumn(redContent, line.includes('123') ? '123' : 'Red text');
            verifyColoredColumn(blueContent, line.includes('456') ? '456' : 'Blue text');
        });

        expect(p.render()).toMatchSnapshot();
    });

    it('should verify header colors', () => {
        const p = new Table({
            shouldDisableColors: true,
            columns: [
                { name: 'red-col', color: 'red' },
                { name: 'green-col', color: 'green' },
                { name: 'blue-col', color: 'blue' }
            ]
        });

        p.addRow({
            'red-col': 'test',
            'green-col': 'test',
            'blue-col': 'test'
        });

        p.printTable();
        const headerLine = getTableHeader(p);
        const [, redHeader, greenHeader, blueHeader] = headerLine.split('│');

        // Verify header content
        expect(redHeader.trim()).toBe('red-col');
        expect(greenHeader.trim()).toBe('green-col');
        expect(blueHeader.trim()).toBe('blue-col');

        expect(p.render()).toMatchSnapshot();
    });
}); 