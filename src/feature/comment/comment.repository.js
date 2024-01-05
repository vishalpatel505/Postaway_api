import mongoose from "mongoose";
import { commentSchema } from "./comment.schema.js";
import { ObjectId } from "mongodb";
import ApplicationError from "../../error-handler/error.handler.js";


const commentModel = mongoose.model('comment',commentSchema)
export default class CommentRepository{
    async add(userId,postId,content){
        const newComment = new commentModel({
            userId:new ObjectId(userId),
            postId:new ObjectId(postId),
            content:content
        })
        await newComment.save();
        return newComment;
    }

    async delete(commentId){
        try{
            await commentModel.deleteOne({_id:new ObjectId(commentId)});
            return true;
        }catch(err){
            console.log('delete commentRepository err: ',err)
            throw new ApplicationError('Something went wrong ',500)
        }       
    }

    async update(newComment,commentId){
        
        try{
            await commentModel.updateOne({_id:new ObjectId(commentId)},{content:newComment});
            
            return await commentModel.findById(commentId);
        }catch(err){
            console.log('update commentRepository err: ',err)
            throw new ApplicationError('Something went wrong ',500)
        }
    }

    async getAll(postId){

        try{
            const comments =await commentModel.find({postId:new ObjectId(postId)})
            if(comments.length>0){
                return comments;
            }else{
                return false;
            } 
        }catch(err){
            console.log('update commentRepository err: ',err)
            throw new ApplicationError('Something went wrong ',500)
        }
    }
}