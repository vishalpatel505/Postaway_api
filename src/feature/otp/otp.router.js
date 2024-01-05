import express from "express";
import OtpController from "./otp.controller.js";

const otpRouter = express.Router();

const otpController =new OtpController()

otpRouter.post('/send',otpController.sendOTP)
otpRouter.post('/verify',otpController.verifyOtp)
otpRouter.post('/reset-password',otpController.resetPassword)

export default otpRouter
