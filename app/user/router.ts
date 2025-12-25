import {Router} from "express";
import {UserController} from "./controller";
import { multerFiles, validateJsonBody, validateJsonQuery} from "../../core";
import {
    userChangePasswordValidator,
    userGetValidator,
    userOtpSendValidator,
    userResetPasswordValidator,
    userUpdateMineValidator,
    userUpdateValidator,
    userVerifyEmail,
} from "./validator";

import { protection } from "../auth";

let userRouter = Router();

let userController = new UserController();

userRouter.get("/mine", protection,
    userController.getMine,
);

userRouter.patch(
    "/mine",
    protection,
    multerFiles("avatar"),
    validateJsonBody(userUpdateMineValidator),
    userController.updateMine
);

userRouter.patch(
    "/mine/changeEmail",
    protection,
    validateJsonBody(userOtpSendValidator),
    userController.changeUserEmail
);

userRouter.post(
    "/mine/verifyEmail",
    protection,
    validateJsonBody(userVerifyEmail),
    userController.verifyEmail
);

userRouter.post(
    "/mine/forgotPassword",
    validateJsonBody(userOtpSendValidator),
    userController.forgetPassword
);

userRouter.post(
    "/mine/resetPassword",
    validateJsonBody(userResetPasswordValidator),
    userController.resetPassword
);

userRouter.post(
    "/mine/changePassword",
    protection,
    validateJsonBody(userChangePasswordValidator),
    userController.changePassword
);

userRouter.post("/mine/sendEmailOtp", protection,
    userController.sendEmailVerifyOtp,
);


userRouter.get(
    "/",
    protection,
    validateJsonQuery(userGetValidator),
    userController.getByCriteria
);

userRouter.patch(
    "/:id",
    protection,
    multerFiles("avatar"),
    validateJsonBody(userUpdateValidator),
    userController.updateUser
);

userRouter.get(
    "/:id",
    protection,
    userController.getUserById,
);

export {userRouter};
