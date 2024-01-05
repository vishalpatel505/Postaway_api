import express from 'express'
import UserController from "./user.controller.js";
import jwtAuth from '../../middleware/jwt.middleware.js';


const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/signup',userController.signup);

userRouter.post('/signin',userController.signin);

userRouter.post('/logout',jwtAuth,userController.logout);

userRouter.get('/get-details/:userId',jwtAuth,userController.getDetail);

userRouter.get('/get-all-details',jwtAuth,userController.getAllDetail)

export default userRouter;
