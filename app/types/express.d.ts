import {IUser} from "../user";

declare global {
    namespace Express {
        interface Request {
            userId: string | import("mongoose").ObjectId | null;
            user: IUser | null | undefined;
        }
    }
}

export {}