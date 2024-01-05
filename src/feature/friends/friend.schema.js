import mongoose from "mongoose";

export const friendSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    friendId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    status:{
        type:String,
        enum:['Accept','Reject','Pending']
    }
})