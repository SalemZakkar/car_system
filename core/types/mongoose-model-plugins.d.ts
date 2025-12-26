import "mongoose";
import {MongooseQuery} from "./mongoose-queries-util";

declare module "mongoose" {
    interface Model<T> {
        findAndCount: (params: MongooseQuery) => { total: number; data: [] };
    }
}
