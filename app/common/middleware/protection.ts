// import {NextFunction, Request, Response} from "express";
// import {AuthUnAuthError} from "../../auth";
// import {decodeToken} from "../../../core";
// import {UserModel} from "../../models";
// // import {UserModel} from "../models";
// // // import {IUser, UserService} from "../user";
//
// export const protection = async function (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) {
//     const authHeader = req.headers["authorization"];
//     if (!authHeader) {
//         throw new AuthUnAuthError();
//     }
//     const parts = authHeader!.split(" ");
//     if (parts.length !== 2 || parts[0] !== "Bearer") {
//         throw new AuthUnAuthError();
//
//     }
//     const token = parts[1];
//     let decoded = decodeToken(token ?? "");
//     if (decoded.hasError) {
//         throw new AuthUnAuthError();
//     }
//     let user = await UserModel.findById(decoded.data.id);
//     if (!user) {
//         throw new AuthUnAuthError();
//     }
//     req.userId = user._id;
//     req.user = user;
//     next();
// };
