import mongoose from 'mongoose'

export const connectMongoose = async()=>{

    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/postaway')
        console.log('Mongodb is connected')
    }catch(err){
        console.log('mongoose.config.js error: ',err)
    }
    
}