import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    }
})