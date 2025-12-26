import {Router} from "express";
import {multerFiles, validateJsonBody} from "../../core";
import {createEditAdBannerValidator} from "./validator";
import {AdBannerController} from "./controller";
import {protection} from "../auth";

let adBannerRouter = Router();

let controller = new AdBannerController();

adBannerRouter.post("/",
    protection,
    multerFiles("image"),
    validateJsonBody(createEditAdBannerValidator),
    controller.create,
);

adBannerRouter.get("/",
    protection,
    multerFiles("image"),
    controller.getAll,
);

adBannerRouter.patch("/:id",
    protection,
    multerFiles("image"),
    validateJsonBody(createEditAdBannerValidator),
    controller.edit,
);

adBannerRouter.delete("/:id",
    protection,
    controller.delete,
);

export {adBannerRouter};
