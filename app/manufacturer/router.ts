import {Router} from "express";
import {CarBrandsController} from "./controller";
import {protection} from "../auth";
import {validateJsonBody} from "../../core";
import {createBrandValidator, createVariantValidator, editBrandVariantValidator} from "./validator";

let manufacturerRouter = Router();

let carBrandController = new CarBrandsController();

manufacturerRouter.post("/brand",
    protection,
    validateJsonBody(createBrandValidator),
    carBrandController.createBrand,
);

manufacturerRouter.get("/brand",
    protection,
    carBrandController.getAllBrands,
);

manufacturerRouter.patch("/brand/:id",
    protection,
    validateJsonBody(editBrandVariantValidator),
    carBrandController.editBrand,
);

manufacturerRouter.delete("/brand/:id",
    protection,
    carBrandController.deleteBrand,
);

manufacturerRouter.post("/variant",
    protection,
    validateJsonBody(createVariantValidator),
    carBrandController.createVariant,
);


manufacturerRouter.get("/variant",
    protection,
    carBrandController.getAllVariants,
);

manufacturerRouter.patch("/variant/:id",
    protection,
    validateJsonBody(editBrandVariantValidator),
    carBrandController.editVariant,
);

manufacturerRouter.delete("/variant/:id",
    protection,
    carBrandController.deleteVariant,
);

export {manufacturerRouter};