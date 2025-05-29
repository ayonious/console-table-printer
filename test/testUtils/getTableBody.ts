import { Table } from "../..";

export const getTableHeader = (table: Table) => {
    const rendered = table.render().split('\n')[1];
    return rendered;
};

export const getTableBody = (table: Table) => {
    const rendered = table.render().split('\n');
    // Find the separator line index
    const separatorIndex = rendered.findIndex(line => line.includes('├'));
    // Return all lines after the separator until the footer
    return rendered.slice(separatorIndex + 1, -1);
};