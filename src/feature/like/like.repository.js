import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ObjectId } from "mongodb";
import ApplicationError from "../../error-handler/error.handler.js";

const likeModel = mongoose.model('like',likeSchema)
export default class LikeRepository{
    async getLike(postId){

        try{
            const likes =await likeModel.find({postId:new ObjectId(postId)})
    
            return likes;
        }catch(err){
            console.log("getAll",err);
            throw new ApplicationError('Something went wrong',500)
        }
    }

    async toggle(userId,postId){

        try{
            const likeAvailable = await likeModel.findOne({userId:new ObjectId(userId)},{postId:new ObjectId(postId)})

            console.log(likeAvailable)

            if(likeAvailable){
                await likeModel.deleteOne({_id:new ObjectId(likeAvailable._id)})
    
                return 'You dislike post '
            }
            else{
                const like = new likeModel({
                    userId:new ObjectId(userId),
                    postId:new ObjectId(postId)
                })
        
                await like.save();
                return 'You liked the post'
            }
    
        }
        catch(err){
            console.log('err: ',err)
        }

       

    }
}