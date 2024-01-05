import mongoose from "mongoose";

export const otpSchma = new mongoose.Schema({
    email:String,
    otp:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
},{
    expires:600
}
)