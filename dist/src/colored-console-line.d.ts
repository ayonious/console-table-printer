import { COLOR } from "./table-constants";
export declare class ColoredConsoleLine {
    text: string;
    constructor();
    addWithColor(color: COLOR, text: string): void;
    printConsole(): string;
}
