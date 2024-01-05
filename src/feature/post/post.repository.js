import mongoose from 'mongoose'
import { postSchema } from './post.schema.js';
import { ObjectId } from 'mongodb';
import ApplicationError from '../../error-handler/error.handler.js';
import UserModel from '../users/user.model.js';

const postModel = mongoose.model('post',postSchema)

export default class PostRepository{
    async add(userId,caption,imageUrl){
        const newPost = new postModel({userId:new ObjectId(userId),caption,imageUrl})
        await newPost.save();
        return newPost;
    }

    async delete(postId){
        try{
            await postModel.deleteOne({_id:new ObjectId(postId)});
            return true;
        }catch(err){
            throw new ApplicationError('delete post repository err',500)
        }
    }

    async update(updatePost){
        try{
            const post = await postModel.updateOne({_id:new ObjectId(updatePost.id)},updatePost)

            return await postModel.findById(updatePost.id)
        }
        catch(err){
            throw new ApplicationError('update postrepository err',500);
        }
    }

    async getMyPosts(userId){
        try{
            console.log(userId)
            const post = await postModel.find({userId:userId})
            return post;

        }catch(err){
            throw new ApplicationError('getMyPost repository err', 500);
        }
        
    }

    async getPost(id){
        try{
            console.log(id)
            const post = await postModel.findById(id)
            console.log(post)
            return post;
        }catch(err){
            throw new ApplicationError('getPost repository err', 500);
        }
    }

    async getAll(){
        try{
            const post = await postModel.find()
            return post;
        }catch(err){
            throw new ApplicationError('getall repository err', 500);
        }
    }
}