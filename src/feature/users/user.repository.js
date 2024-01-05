import mongoose from 'mongoose'
import { userSchema } from './user.schema.js'
import ApplicationError from '../../error-handler/error.handler.js';
import { ObjectId } from "mongodb";


const userModel = mongoose.model('users',userSchema)

export default class UserRepository{
    async signUp(user){
        // console.log(user)
        try{
            const newUser = new userModel(user)
            await newUser.save();
            console.log(newUser)
            return newUser
        }catch(err){
            throw new ApplicationError('signUp repository error',500)
        } 
    }

    async findEmail(email){
        try{
            // console.log("email_",email)
            const result =  await userModel.findOne({email});
            return result
        }
        catch(err){
            throw new ApplicationError('findEmail Repository err', 500)
        }
    }

    async getDetail(userId){
        try{
            return await userModel.findOne({_id:new ObjectId(userId)}).select("-password");
        }
        catch(err){
            console.log('getDetail profileRepository err: ',err)
            throw new ApplicationError('getDetail profileRepository err ',500);
        }
    }

    async getAllDetail(){
        try{
            return await userModel.find().select('-password');
        }
        catch(err){
            console.log('getAllDetail profileRepository err: ',err)
            throw new ApplicationError('getAllDetail profileRepository err ',500);
        }
    }


}