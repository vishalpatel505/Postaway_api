import mongoose from 'mongoose'

export const postSchema = new mongoose.Schema({
    userId:String,
    caption:String,
    imageUrl:String
})