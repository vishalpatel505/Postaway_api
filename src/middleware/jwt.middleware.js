import jwt from 'jsonwebtoken';
import ApplicationError from '../error-handler/error.handler.js';

const jwtAuth = (req,res,next)=>{

    // console.log("reqest",req.headers);
    // // const {token} = req.cookies
    // const token = req.headers["authorization"]

    const{jwtToken}=req.cookies
    console.log('jwtToken: ',jwtToken)

    if(!jwtToken){
        console.log("1")
        throw new ApplicationError("No Authorization",404)
    }

    
    try{
        const payload = jwt.verify(jwtToken,"yn5qrK71P4pWNEle5ztDKKHG9YFsfsoY")

        console.log(payload);

        req._id = payload._id
        req.userId = payload.userId;
    }
    catch(err){
        console.log('2')
        throw new ApplicationError("No Authorization",404)
    }

    next();
}

export default jwtAuth;