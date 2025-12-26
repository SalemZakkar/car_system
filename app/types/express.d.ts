declare global {
    namespace Express {
        interface Request {
            userId: string | import("mongoose").ObjectId | null;
        }
    }
}

export {}