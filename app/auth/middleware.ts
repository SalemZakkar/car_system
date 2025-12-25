import {NextFunction, Request, Response} from "express";
import {AuthUnAuthError} from "./errors";
import {decodeToken} from "../../core";

export const protection = async function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        throw new AuthUnAuthError();
    }
    const parts = authHeader!.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        throw new AuthUnAuthError();

    }
    const token = parts[1];
    let decoded = decodeToken(token ?? "");
    if (decoded.hasError) {
        throw new AuthUnAuthError();
    }
    (req as any).userId = decoded.data.userId;
    next();
};
