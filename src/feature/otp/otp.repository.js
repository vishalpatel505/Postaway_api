import mongoose from "mongoose";
import { otpSchma } from "./otp.schema.js";
import { userSchema } from "../users/user.schema.js";
import { ObjectId } from "mongodb";

const otpModel = mongoose.model('otp',otpSchma)
const userModel = mongoose.model('users',userSchema)

export default class OtpRepository{
    async sendOtp(email){
        try{
            const otp = Math.floor(1000+Math.random()*9000).toString()
            const user = await userModel.findOne({email:email})

            if(user){
                const newOtp = new otpModel({
                    email:user.email,
                    otp:otp,
                    createdAt:new Date()
                })
    
                await newOtp.save()
    
                return newOtp;
            }else{
                return 'Please register first'
            }
          
        }catch(err){
            console.log('sendOtp OtpRepository err: ',err);
        }
    }

    async verify(email,otp){
        try{
            const isOtpPresent = await otpModel.findOne({email:email,otp:otp});
            return isOtpPresent

        }catch(err){
            console.log('verify OtpRepository err: ',err);
        }
    }

    async resetPassword(email,otp,newPassword){
        try{
            const otpVerification = this.verify(email,otp)

            if(otpVerification){
                await userModel.updateOne({email:email},{password:newPassword});
                return true
            }else{
                return false;
            }

        }catch(err){
            console.log('resetPassword OtpRepository err: ',err);
        }
    }
}