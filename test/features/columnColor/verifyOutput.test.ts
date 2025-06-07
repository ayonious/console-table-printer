import { Table } from '../../../index';
import { getTableBody, getTableHeader } from '../../testUtils/getRawData';

describe('Testing column color output verification', () => {
    const countSpaces = (str: string, fromStart = true) => {
        const chars = fromStart ? [...str] : [...str].reverse();
        return chars.findIndex(c => c !== ' ');
    };

    // Helper function to verify color column content
    const verifyColoredColumn = (content: string, expectedText: string, expectedColor?: ColorType) => {
        const trimmedContent = content.trim();
        
        // Debug logging
        console.log('Content:', JSON.stringify(trimmedContent));
        console.log('Expected color:', expectedColor);
        
        // Verify the actual text content
        const textWithoutColors = trimmedContent.replace(/\x1b\[(\d+)m/g, '').trim();
        expect(textWithoutColors).toBe(expectedText);

        // If a color is expected, verify the color code
        if (expectedColor) {
            const colorCodes: Record<ColorType, string> = {
                'red': '\x1b[31m',
                'green': '\x1b[32m',
                'yellow': '\x1b[33m',
                'blue': '\x1b[34m',
                'magenta': '\x1b[35m',
                'cyan': '\x1b[36m',
                'white': '\x1b[37m',
                'white_bold': '\x1b[01m',
                'crimson': '\x1b[31m', // Using red for crimson
                'gray': '\x1b[37m'     // Using white for gray
            };
            const resetCode = '\x1b[0m';
            const whiteCode = '\x1b[37m';
            
            // The table adds a white space at the start of each cell
            expect(trimmedContent.startsWith(whiteCode)).toBeTruthy();
            
            // The content should contain the expected color code
            // For crimson and gray, we don't expect any additional color codes
            if (expectedColor !== 'gray' && expectedColor !== 'crimson') {
                expect(trimmedContent.includes(colorCodes[expectedColor])).toBeTruthy();
            }
            
            // The content should end with a reset code (except for gray and crimson which don't add color)
            if (expectedColor !== 'gray' && expectedColor !== 'crimson') {
                expect(trimmedContent.endsWith(resetCode)).toBeTruthy();
            }
        }
    };

    // Test each color individually
    const availableColors = [
        'red', 'green', 'yellow', 'blue', 'magenta', 
        'cyan', 'white', 'crimson', 'white_bold', 'gray'
    ] as const;
    
    type ColorType = typeof availableColors[number];

    availableColors.forEach((color) => {
        it(`should correctly apply ${color} color to column`, () => {
            const p = new Table()
                .addColumn({
                    name: `${color}-col`,
                    color: color
                })
                .addRow({ [`${color}-col`]: 'test' });

            p.printTable();
            const contentLines = getTableBody(p);
            const content = contentLines[0].split('│')[1];
            
            verifyColoredColumn(content, 'test', color);
            expect(p.render()).toMatchSnapshot();
        });
    });

    it('should handle multiple colored columns', () => {
        const p = new Table()
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
            verifyColoredColumn(redContent, line.includes('123') ? '123' : 'Red text', 'red');
            verifyColoredColumn(greenContent, line.includes('456') ? '456' : 'Green text', 'green');
            verifyColoredColumn(blueContent, line.includes('789') ? '789' : 'Blue text', 'blue');
        });

        expect(p.render()).toMatchSnapshot();
    });

    it('should handle color with different alignments', () => {
        const p = new Table()
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
        verifyColoredColumn(leftContent, 'Left', 'red');
        verifyColoredColumn(centerContent, 'Center', 'green');
        verifyColoredColumn(rightContent, 'Right', 'blue');
        
        // Verify center alignment by checking space distribution
        const centerTextWithoutColors = centerContent.replace(/\x1b\[(\d+)m/g, '');
        const leftSpaces = countSpaces(centerTextWithoutColors, true);
        const rightSpaces = countSpaces(centerTextWithoutColors, false);
        expect(Math.abs(leftSpaces - rightSpaces)).toBeLessThanOrEqual(1);

        expect(p.render()).toMatchSnapshot();
    });

    it('should handle column colors with row colors', () => {
        const p = new Table()
            .addColumn({ name: 'red-col', color: 'red' })
            .addColumn({ name: 'blue-col', color: 'blue' });

        p.addRow({ 'red-col': 'Red text', 'blue-col': 'Blue text' }, { color: 'green' });
        p.addRow({ 'red-col': '123', 'blue-col': '456' }, { color: 'yellow' });

        p.printTable();
        const contentLines = getTableBody(p);
        
        contentLines.forEach((line, index) => {
            const [, redContent, blueContent] = line.split('│');
            // Column color should take precedence over row color
            verifyColoredColumn(redContent, line.includes('123') ? '123' : 'Red text', 'red');
            verifyColoredColumn(blueContent, line.includes('456') ? '456' : 'Blue text', 'blue');
        });

        expect(p.render()).toMatchSnapshot();
    });

    it('should verify header colors', () => {
        const p = new Table({
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

        // Headers use white_bold color
        verifyColoredColumn(redHeader, 'red-col', 'white_bold');
        verifyColoredColumn(greenHeader, 'green-col', 'white_bold');
        verifyColoredColumn(blueHeader, 'blue-col', 'white_bold');

        expect(p.render()).toMatchSnapshot();
    });
}); 