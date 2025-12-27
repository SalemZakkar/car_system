import {Router} from "express";
import {authRouter} from "./auth";
import {fileRouter} from "./files";
import {getAppErrorsApi} from "../core";
import {manufacturerRouter} from "./manufacturer";
import {adBannerRouter} from "./ad-banner";
import {postRouter} from "./posts";
import {carRouter} from "./cars";
import {userRouter} from "./user";

let appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/user", userRouter);
appRouter.use("/manufacturer", manufacturerRouter);
appRouter.use("/banner", adBannerRouter);
appRouter.use("/posts", postRouter);
appRouter.use("/car", carRouter);
appRouter.use("/file", fileRouter);
appRouter.get("/errors", getAppErrorsApi);
export {appRouter};
