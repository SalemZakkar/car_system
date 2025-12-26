import {Router} from "express";
import {authRouter} from "./auth";
import {userRouter} from "./user";
import {fileRouter} from "./files";
import {getAppErrorsApi} from "../core";
import {manufacturerRouter} from "./manufacturer";
import {adBannerRouter} from "./ad-banner";
import {postRouter} from "./posts";

let appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/user", userRouter);
appRouter.use("/manufacturer", manufacturerRouter);
appRouter.use("/banner", adBannerRouter);
appRouter.use("/posts", postRouter);
appRouter.use("/file", fileRouter);
appRouter.get("/errors", getAppErrorsApi);
export {appRouter};
