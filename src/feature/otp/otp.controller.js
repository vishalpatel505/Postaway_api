import OtpRepository from "./otp.repository.js";

const otpRepository = new OtpRepository()

export default class OtpController{

    async sendOTP(req,res){
        const email = req.body.email

        const result = await otpRepository.sendOtp(email);

        res.status(200).send(result)        
    }

    async verifyOtp(req,res){
        const email = req.body.email;
        const otp = req.body.otp
        const result = await otpRepository.verify(email,otp);

        if(result){
            res
            .cookie('otp',result.otp,{maxAge:10*60*1000,httpOnly:true})
            .status(200).send('OTP verified')
        }else{
            res.status(400).sned('Invalid OTP or OTP expired')
        }
    }

    async resetPassword(req,res){
        const email = req.body.email;
        const {otp} = req.cookies;
        const newPassword = req.body.newPassword

        const passwordReset = await otpRepository.resetPassword(email,otp,newPassword);

        if(passwordReset){
            res.status(201).send('Password reset')
        }else{
            res.status(400).send('Someting went wrong please try again')
        }
    }
}