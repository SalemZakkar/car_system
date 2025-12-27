import mongoose, {model, Schema} from "mongoose";
import {Otp, OtpInstanceFunctions, OtpReason} from "./interface";

const otpAttempts = [5, 10, 30, 60, 1440];

const otpAge = 1440;

const otpMaxAttempts = 5;

export { otpAttempts , otpAge , otpMaxAttempts};


let schemaOtp = new Schema<Otp, {}, OtpInstanceFunctions, {}>({
    attempts: {
        type: Number,
        required: Boolean,
        max: 5,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    otp: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        enum: Object.values(OtpReason),
        required: true,
    },
});

schemaOtp.methods.isExpired = function () {
    let otpDate = this.createdAt.getTime();
    return Date.now() - otpDate > otpAge * 60_000;
};

schemaOtp.methods.nextTime = function () {
    let otpDate = this.createdAt.getTime();
    const msWait = otpAttempts[this.attempts - 1]! * 60_000;
    return new Date(otpDate + msWait);
};

schemaOtp.methods.canSend = function () {
    let otpDate = this.createdAt.getTime();
    const msWait = otpAttempts[this.attempts - 1]! * 60_000;
    if (this.attempts >= otpMaxAttempts) {
        return Date.now() > otpDate + otpAttempts[otpMaxAttempts - 1]! * 60_000;
    }
    return Date.now() > otpDate + msWait;
};

// schemaOtp.pre("save", async function (next) {
//     console.log(process.env.ENVIRONMENT);
//     const isNewDoc = this.isNew;
//     const otpChanged = this.isModified("otp");
//     if (isNewDoc || otpChanged) {
//         const user = await mongoose
//             .model("User")
//             .findById(this.user)
//             .select("email");
//
//         if (user?.email) {
//             sendSmtpOtp(this.otp, user.email).then(e => console.log("Send Otp"));
//         }
//     }
//     next();
// });

export const OtpModel = model<
    Otp,
    mongoose.Model<Otp, {}, OtpInstanceFunctions>
>("Otp", schemaOtp);
