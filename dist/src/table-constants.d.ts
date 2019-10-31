export interface TABLE_LINE_DETAILS {
    left: string;
    mid: string;
    right: string;
    other: string;
}
export interface TABLE_STYLE_DETAILS {
    headerTop: TABLE_LINE_DETAILS;
    headerBottom: TABLE_LINE_DETAILS;
    tableBottom: TABLE_LINE_DETAILS;
    vertical: string;
}
export declare enum TABLE_BORDER_STYLES {
    fatBorder = 0,
    thinBorder = 1,
    customized = 2
}
export declare const TABLE_STYLE: {
    thinBorder: {
        headerTop: {
            left: string;
            mid: string;
            right: string;
            other: string;
        };
        headerBottom: {
            left: string;
            mid: string;
            right: string;
            other: string;
        };
        tableBottom: {
            left: string;
            mid: string;
            right: string;
            other: string;
        };
        vertical: string;
    };
    fatBorder: {
        headerTop: {
            left: string;
            mid: string;
            right: string;
            other: string;
        };
        headerBottom: {
            left: string;
            mid: string;
            right: string;
            other: string;
        };
        tableBottom: {
            left: string;
            mid: string;
            right: string;
            other: string;
        };
        vertical: string;
    };
};
export declare enum COLUMN_ALIGNMENT {
    right = 0,
    left = 1
}
export declare enum COLOR {
    NO_COLOR = 0,
    red = 1,
    green = 2,
    yellow = 3,
    white = 4,
    blue = 5,
    magenta = 6,
    cyan = 7,
    crimson = 8,
    white_bold = 9,
    reset = 10
}
