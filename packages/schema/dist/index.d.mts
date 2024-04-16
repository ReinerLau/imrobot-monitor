import * as drizzle_orm_mysql_core from 'drizzle-orm/mysql-core';

declare const behavior: drizzle_orm_mysql_core.MySqlTableWithColumns<{
    name: "behavior";
    schema: undefined;
    columns: {
        id: drizzle_orm_mysql_core.MySqlColumn<{
            name: "id";
            tableName: "behavior";
            dataType: "number";
            columnType: "MySqlInt";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        data: drizzle_orm_mysql_core.MySqlColumn<{
            name: "data";
            tableName: "behavior";
            dataType: "json";
            columnType: "MySqlJson";
            data: unknown;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
    };
    dialect: "mysql";
}>;

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
            dataType: "string";
            columnType: "MySqlText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        behaviorId: drizzle_orm_mysql_core.MySqlColumn<{
            name: "behavior_id";
            tableName: "code";
            dataType: "number";
            columnType: "MySqlInt";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
    };
    dialect: "mysql";
}>;
declare const resource: drizzle_orm_mysql_core.MySqlTableWithColumns<{
    name: "resource";
    schema: undefined;
    columns: {
        id: drizzle_orm_mysql_core.MySqlColumn<{
            name: "id";
            tableName: "resource";
            dataType: "number";
            columnType: "MySqlInt";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        source: drizzle_orm_mysql_core.MySqlColumn<{
            name: "source";
            tableName: "resource";
            dataType: "string";
            columnType: "MySqlText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        target: drizzle_orm_mysql_core.MySqlColumn<{
            name: "target";
            tableName: "resource";
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
            tableName: "resource";
            dataType: "string";
            columnType: "MySqlText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        time: drizzle_orm_mysql_core.MySqlColumn<{
            name: "time";
            tableName: "resource";
            dataType: "string";
            columnType: "MySqlText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        behaviorId: drizzle_orm_mysql_core.MySqlColumn<{
            name: "behavior_id";
            tableName: "resource";
            dataType: "number";
            columnType: "MySqlInt";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
    };
    dialect: "mysql";
}>;
declare const request: drizzle_orm_mysql_core.MySqlTableWithColumns<{
    name: "request";
    schema: undefined;
    columns: {
        id: drizzle_orm_mysql_core.MySqlColumn<{
            name: "id";
            tableName: "request";
            dataType: "number";
            columnType: "MySqlInt";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        status: drizzle_orm_mysql_core.MySqlColumn<{
            name: "status";
            tableName: "request";
            dataType: "number";
            columnType: "MySqlInt";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        response: drizzle_orm_mysql_core.MySqlColumn<{
            name: "response";
            tableName: "request";
            dataType: "string";
            columnType: "MySqlText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        elapsedTime: drizzle_orm_mysql_core.MySqlColumn<{
            name: "elapsedTime";
            tableName: "request";
            dataType: "number";
            columnType: "MySqlBigInt53";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
        url: drizzle_orm_mysql_core.MySqlColumn<{
            name: "url";
            tableName: "request";
            dataType: "string";
            columnType: "MySqlText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        requestURL: drizzle_orm_mysql_core.MySqlColumn<{
            name: "requestURL";
            tableName: "request";
            dataType: "string";
            columnType: "MySqlText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        time: drizzle_orm_mysql_core.MySqlColumn<{
            name: "time";
            tableName: "request";
            dataType: "string";
            columnType: "MySqlText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        method: drizzle_orm_mysql_core.MySqlColumn<{
            name: "method";
            tableName: "request";
            dataType: "string";
            columnType: "MySqlText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        requestData: drizzle_orm_mysql_core.MySqlColumn<{
            name: "requestData";
            tableName: "request";
            dataType: "string";
            columnType: "MySqlText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, object>;
        behaviorId: drizzle_orm_mysql_core.MySqlColumn<{
            name: "behavior_id";
            tableName: "request";
            dataType: "number";
            columnType: "MySqlInt";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, object>;
    };
    dialect: "mysql";
}>;

export { behavior, code, request, resource };
