import {Router} from "express";
import {multerFiles, validateJsonBody} from "../../core";
import {protection} from "../auth";
import {PostController} from "./controller";
import {createPostValidator, updatePostValidator} from "./validator";

let postRouter = Router();

let controller = new PostController();

postRouter.post("/",
    protection,
    multerFiles("image"),
    validateJsonBody(createPostValidator),
    controller.create,
);

postRouter.get("/",
    protection,
    controller.getAll,
);

postRouter.patch("/:id",
    protection,
    multerFiles("image"),
    validateJsonBody(updatePostValidator),
    controller.edit,
);

postRouter.delete("/:id",
    protection,
    controller.delete,
);

export {postRouter};
