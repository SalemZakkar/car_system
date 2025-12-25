import {Exception} from "../../core";

export class OtpTooManyAttemptsError extends Exception {
    constructor() {
        super("Too Many Attemps", 429, "OTP_TOO_MANY_ATTEMPTS");
    }
}

export class OtpWrongOtpError extends Exception {
    constructor() {
        super("Otp Code Error", 400, "OTP_WRONG");
    }
}

export class OtpExpiredError extends Exception {
    constructor() {
        super("Otp expired", 400, "OTP_EXPIRED");
    }
}

Exception.addErrors("OTP" , [
    new OtpWrongOtpError(),
    new OtpExpiredError(),
    new OtpTooManyAttemptsError(),
])