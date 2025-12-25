export interface MongooseQuery {
    skip?: number;
    limit?: number;
    total?: boolean;
    data?: boolean;
    conditions?: Record<string, any>;
}


export function getQueries(query: any): MongooseQuery {
    const conditions: Record<string, any> = {};
    let skip = query.skip || 0;
    let limit = query.limit || 100;
    let total = query.total ? query.total == "true" : false;
    let data = query.data ? query.data == "true" : true;

    let keys = Object.keys(query);
    keys = keys.filter((e) => !["skip", "limit", "data", "total"].includes(e));
    keys.forEach((e) => {
        if (typeof query[e] === "string") {
            conditions[e] = query[e];
        }
        if (Array.isArray(query[e])) {
            conditions[e] = {$in: query[e]};
        }
        if (isObject(query[e])) {
            let oKeys = Object.keys(query[e]);
            if (!conditions[e]) {
                conditions[e] = {};
            }
            oKeys.forEach((e2) => {
                if (Array.isArray(query[e][e2]) || typeof query[e][e2] === "string") {
                    conditions[e]["$" + e2] = query[e][e2];
                }
            });
        }
    });

    return {skip, limit, conditions, total, data};
}

function isObject(value: any): value is Record<string, any> {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}
