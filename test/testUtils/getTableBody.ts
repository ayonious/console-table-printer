import { Table } from "../..";

export const getTableHeader = (table: Table) => {
    const rendered = table.render().split('\n')[1];
    return rendered;
};

export const getTableBody = (table: Table) => {
    const rendered = table.render().split('\n').slice(3, -1);
    return rendered;
};