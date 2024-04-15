import * as drizzle_orm_mysql_core from 'drizzle-orm/mysql-core';

declare const code: drizzle_orm_mysql_core.MySqlTableWithColumns<{
    name: "code";
    schema: undefined;
    columns: {
        id: drizzle_orm_mysql_core.MySqlColumn<{
            name: "id";
            tableName: "code";
            dataType: "number";
            columnType: "MySqlInt";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        message: drizzle_orm_mysql_core.MySqlColumn<{
            name: "message";
            tableName: "code";
            dataType: "string";
            columnType: "MySqlText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        fileName: drizzle_orm_mysql_core.MySqlColumn<{
            name: "fileName";
            tableName: "code";
            dataType: "string";
            columnType: "MySqlText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        url: drizzle_orm_mysql_core.MySqlColumn<{
            name: "url";
            tableName: "code";
            dataType: "string";
            columnType: "MySqlText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        columnNumber: drizzle_orm_mysql_core.MySqlColumn<{
            name: "columnNumber";
            tableName: "code";
            dataType: "number";
            columnType: "MySqlInt";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        lineNumber: drizzle_orm_mysql_core.MySqlColumn<{
            name: "lineNumber";
            tableName: "code";
            dataType: "number";
            columnType: "MySqlInt";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        time: drizzle_orm_mysql_core.MySqlColumn<{
            name: "time";
            tableName: "code";
            dataType: "number";
            columnType: "MySqlBigInt53";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
    };
    dialect: "mysql";
}>;

export { code };
