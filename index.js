import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import userRouter from './src/feature/users/user.router.js';
import postRouter from './src/feature/post/post.router.js';
import jwtAuth from './src/middleware/jwt.middleware.js';
import ApplicationError from './src/error-handler/error.handler.js';
import { upload } from './src/middleware/file-upload.middleware.js';
import commentRouter from './src/feature/comment/comment.router.js';
import likeRouter from './src/feature/like/like.router.js';
import { connectMongoose } from './src/config/mongoose.config.js';
import friendRouter from './src/feature/friends/friend.router.js';
import otpRouter from './src/feature/otp/otp.router.js';


const server = express();

const corsOption = {
    origin:"http://localhost:5501",
    allowedHeaders:"*"
}

server.use(cors())
server.use(express.json())
server.use(cookieParser())

server.use('/api/otp',otpRouter)
server.use('/api/friends',jwtAuth,friendRouter)
server.use('/api/likes',jwtAuth,likeRouter)
server.use('/api/comments',jwtAuth,commentRouter)
server.use('/api/posts',
            jwtAuth,
            upload.single('imageUrl'),
            postRouter
        )
server.use('/api/users',userRouter);

// 

server.get('/',(req,res)=>{
    res.send("Welcome to Postaway api");
})

server.use((err,req,res,next)=>{
    console.log(err);

    if(err instanceof ApplicationError){
        res.status(err.statusCode).send(err.message);
    }

    res.status(500).send('Something went wrong, Please try again later');
})

server.use((req,res)=>{
    res.send("API not found. Please check api documentation in index file");
})



server.listen(3400,()=>{
    console.log("server is listening at port 3400")
    connectMongoose()
})
