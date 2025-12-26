import {Router} from "express";
import {protection} from "../auth";
import {multerFiles, validateJsonBody, validateJsonQuery} from "../../core";
import {carCreateValidator, carEditValidator, carGetValidator} from "./validator";
import {CarController} from "./controller";

let carRouter = Router();

let carController = new CarController();

carRouter.post("/",
    protection,
    multerFiles("image"),
    validateJsonBody(carCreateValidator),
    carController.createCar,
);

carRouter.get("/",
    protection,
    validateJsonQuery(carGetValidator),
    carController.getAllCars,
);

carRouter.patch("/:id",
    protection,
    multerFiles("image"),
    validateJsonBody(carEditValidator),
    carController.editCar,
);

carRouter.delete("/:id",
    protection,
    carController.deleteCar,
);

export {carRouter};



