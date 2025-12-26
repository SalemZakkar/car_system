import {Exception} from "../../core";

export class AdBannerNotFoundError extends Exception {
    constructor() {
        super("AdBanner not found", 404, "AD_BANNER_NOT_FOUND");
    }
}

Exception.addErrors("AdBanner", [new AdBannerNotFoundError()]);