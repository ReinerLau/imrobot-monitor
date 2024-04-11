import * as drizzle_orm_mysql_core from 'drizzle-orm/mysql-core';

declare const errors: drizzle_orm_mysql_core.MySqlTableWithColumns<{
    name: "errors";
    schema: undefined;
    columns: {
        id: drizzle_orm_mysql_core.MySqlColumn<{
            name: "id";
            tableName: "errors";
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
            tableName: "errors";
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
            tableName: "errors";
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
            tableName: "errors";
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
            tableName: "errors";
            dataType: "number";
            columnType: "MySqlInt";
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

export { errors };
