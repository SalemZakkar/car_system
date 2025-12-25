import {Router} from "express";
import {authRouter} from "./auth";
import {userRouter} from "./user";
import {fileRouter} from "./files";
import {getAppErrorsApi} from "../core";

let appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/user", userRouter);
appRouter.use("/file", fileRouter);
appRouter.get("/errors", getAppErrorsApi);
export {appRouter};
