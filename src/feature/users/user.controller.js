import UserModel from "./user.model.js";
import ApplicationError from "../../error-handler/error.handler.js";
import jwt from 'jsonwebtoken'
import UserRepository from "./user.repository.js";

const userRepository = new UserRepository()

export default class UserController{

    async signup(req,res){
       const {name,email,password,gender}= req.body;
       const user = new UserModel(name,email,password,gender);
    //    console.log(user)

       try{
            const newUser = await userRepository.signUp(user)
            res.status(201).send(newUser);
        } catch(err){
            console.log('signup controller err: ',err)
            throw new ApplicationError('Something went wrong with userRegistration',400)
        }
    }

    async signin(req,res){
        try{
            // console.log(req.body.email)
            const result = await userRepository.findEmail(req.body.email)

            console.log(result)

            if(!result){
                throw new ApplicationError("Incorrect Credentials",404)
            }
            else{
                const token = jwt.sign(
                    {
                        _id : result._id,
                        userId : result.email
                },
                "yn5qrK71P4pWNEle5ztDKKHG9YFsfsoY",
                {
                    expiresIn:"1h"
                }
                )
                res
                .cookie('jwtToken',token,{maxAge:1*60*60*1000,httpOnly:true})
                .status(200).send(token);
        }
        
        }
        catch(err){
            console.log('signin controller err: ',err)
            res.status(400).send('Something went wrong')
        }
    }

    async logout(req,res){
        res
        .clearCookie('jwtToken')
        .status(200)
        .send('User Successfully logout')
    }

    async getDetail(req,res){
        try{
            const id=req.params.userId;

            const result = await userRepository.getDetail(id)
            res.status(200).send(result);
        }
        catch(err){
            res.status(400).send('User detail not found')
        }
    }

    async getAllDetail(req,res){
        try{
            const result = await userRepository.getAllDetail()
            res.status(200).send(result);
        }
        catch(err){
            res.status(400).send('Users not found')
        }
    }


}