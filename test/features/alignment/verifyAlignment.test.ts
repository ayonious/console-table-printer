import { Table } from '../../../index';
import { getTableBody, getTableHeader } from '../../testUtils/getRawData';

describe('Testing alignment functionality and verifying the output', () => {
    const countSpaces = (str: string, fromStart = true) => {
        const chars = fromStart ? [...str] : [...str].reverse();
        return chars.findIndex(c => c !== ' ');
    };

    const isStringLeftAligned = (content: string) => {
        expect(content.startsWith(' ') && !content.endsWith(' ')).toBeTruthy();
    }

    const isStringRightAligned = (content: string) => {
        expect(content.endsWith(' ') && !content.startsWith(' ')).toBeTruthy();
    }

    const isStringCenterAligned = (content: string) => {
        // Count spaces manually instead of using trim functions
        let leftSpaces = countSpaces(content, true);
        let rightSpaces = countSpaces(content, false);        
        // Allow for 1 character difference due to odd-length strings
        expect(Math.abs(leftSpaces - rightSpaces)).toBeLessThanOrEqual(1);
    }

    type AlignmentType = 'left' | 'right' | 'center';
    
    const alignmentToTestFunction: Record<AlignmentType, (content: string) => void> = {
        left: isStringLeftAligned,
        right: isStringRightAligned,
        center: isStringCenterAligned
    };
    
    (['left', 'right', 'center'] as const).forEach((alignment) => {
        it(`should handle ${alignment} alignment correctly`, () => {
            const p = new Table({
                shouldDisableColors: true,
            })
                .addColumn({
                    name: `col-${alignment}`,
                    alignment: alignment
                })
                .addRow({ [`col-${alignment}`]: 'test' });

            p.printTable();
            const contentLines = getTableBody(p);
            const content = contentLines[0].split('│')[1];

            expect(content.replace(/\s/g, '')).toBe('test');
            alignmentToTestFunction[alignment](content);
            expect(p.render()).toMatchSnapshot();
        });
    });

    it('should handle mixed alignments in multiple columns', () => {
        const p = new Table({
            shouldDisableColors: true,
        })
            .addColumn({ name: 'left-col', alignment: 'left' })
            .addColumn({ name: 'right-col', alignment: 'right' })
            .addColumn({ name: 'center-col', alignment: 'center' })
            .addRows([
                {
                    'left-col': 'left aligned',
                    'right-col': 'right aligned',
                    'center-col': 'centered'
                },
                {
                    'left-col': 'short',
                    'right-col': 'longer text here',
                    'center-col': 'medium text'
                }
            ]);

        p.printTable();
        const contentLines = getTableBody(p);

        contentLines.forEach(line => {
            const [, leftContent, rightContent, centerContent] = line.split('│');
            alignmentToTestFunction['left'](leftContent);
            alignmentToTestFunction['right'](rightContent);
            alignmentToTestFunction['center'](centerContent);
        });

        expect(p.render()).toMatchSnapshot();
    });

    it('should maintain alignment with varying content lengths', () => {
        const p = new Table({
            shouldDisableColors: true,
        })
            .addColumn({ name: 'aligned-col', alignment: 'center', minLen: 20 })
            .addRows([
                { 'aligned-col': 'short' },
                { 'aligned-col': 'medium length text' },
                { 'aligned-col': 'this is a very long text that should be handled' }
            ]);

        p.printTable();
        const contentLines = getTableBody(p);
        
        contentLines.forEach(line => {
            const content = line.split('│')[1];
            alignmentToTestFunction['center'](content);
            expect(content.trim()).toBeTruthy(); // Verify content exists
        });

        expect(p.render()).toMatchSnapshot();
    });

    it('should handle alignment with special characters and emojis', () => {
        const p = new Table({
            shouldDisableColors: true,
        })
            .addColumn({ name: 'special-col', alignment: 'center' })
            .addRows([
                { 'special-col': '👋 Hello!' },
                { 'special-col': '⭐ Star' },
                { 'special-col': '🎉 Party 🎈' }
            ]);

        p.printTable();
        const contentLines = getTableBody(p);
        
        contentLines.forEach(line => {
            const content = line.split('│')[1];
            alignmentToTestFunction['center'](content);
            expect(content.trim()).toBeTruthy(); // Verify content exists
        });

        expect(p.render()).toMatchSnapshot();
    });

    it('should respect default column alignment from table options', () => {
        const p = new Table({
            shouldDisableColors: true,
            defaultColumnOptions: {
                alignment: 'right'
            }
        })
            .addColumn('default-col')
            .addColumn({ name: 'override-col', alignment: 'left' })
            .addRows([
                {
                    'default-col': 'should be right',
                    'override-col': 'should be left'
                }
            ]);

        p.printTable();
        const contentLines = getTableBody(p);
        const [, defaultContent, overrideContent] = contentLines[0].split('│');

        alignmentToTestFunction['right'](defaultContent);
        alignmentToTestFunction['left'](overrideContent);

        expect(p.render()).toMatchSnapshot();
    });
}); 