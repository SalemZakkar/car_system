import {Exception} from "../../core";

export class CarBrandNotFoundError extends Exception {
    constructor() {
        super("Car brand not found", 400, "Car_Brand_Not_Found");
    }
}

export class CarVariantNotFoundError extends Exception {
    constructor() {
        super("Car brand not found", 400, "Car_Variant_Not_Found");
    }
}

Exception.addErrors("Car",
    [new CarVariantNotFoundError(), new CarBrandNotFoundError(),],);