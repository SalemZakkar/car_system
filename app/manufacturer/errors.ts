import {Exception} from "../../core";

export class CarBrandNotFoundError extends Exception {
    constructor() {
        super(
            "Brand not found",
            404,
            "Manufacturer_BRAND_NOT_FOUND",
        );
    }
}

export class CarBrandVariantNotFoundError extends Exception {
    constructor() {
        super(
            "Variant not found",
            404,
            "Manufacturer_Variant_NOT_FOUND",
        );
    }
}

Exception.addErrors("Manufacturer", [
    new CarBrandNotFoundError(),
    new CarBrandVariantNotFoundError(),
]);