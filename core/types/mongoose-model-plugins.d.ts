import "mongoose";
import { MongooseQuery } from "./mongoose-queries-util";

declare module "mongoose" {
    interface Model<
        T = {},
        TQueryHelpers = {},
        TMethods = {},
        TVirtuals = {},
        TSchema = any
    > {
        findAndCount(
            params: MongooseQuery
        ): Promise<{ total: number; data: T[] }>;
    }
}