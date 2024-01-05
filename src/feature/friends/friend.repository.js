import mongoose from "mongoose";
import { friendSchema } from "./friend.schema.js";
import { ObjectId } from "mongodb";

const friendModel = mongoose.model('friend',friendSchema);

export default class FriendRepository{
    async toggle(userId,friendId){
        try{
            const friend = await friendModel.findOne({userId:new ObjectId(userId),friendId:new ObjectId(friendId)})

            console.log(friend)

            if(friend){
                await friendModel.deleteOne({friendId:new ObjectId(friendId)})
                return 'Friend Remove'
            }else{
                const newFriend = await friendModel({
                    userId:new ObjectId(userId),
                    friendId:new ObjectId(friendId),
                    status:'Pending'
                })
                await newFriend.save()
                return 'friend added please either accept or reject request'
            }
        }catch(err){
            console.log('toggle friendrepository err: ',err)
        }
    }

    async getAll(userId){
        try{
            const friends = await friendModel.find({userId:new ObjectId(userId),status:'Accept'}).select('-status')

            return friends
        }
        catch(err){
            console.log('getAll friendrepository err:',err)
        }
    }

    async getPendingRequest(userId){
        try{
            const requests = await friendModel.find({userId:new ObjectId(userId),status:'Pending'})
            console.log(requests)
            return requests
        }catch(err){
            console.log('getPendingRequest friendrepository err:',err)
        }
    }

    async requestApproval(userId,friendId){
        try{
            let result = await friendModel.findOne({userId:new ObjectId(userId),friendId:new ObjectId(friendId)},{status:'Pending'})
            if(result){
                await friendModel.updateOne({friendId:new ObjectId(friendId)},{status:'Accept'})
                return 'FriendShip Accept'
            }

            let resultReject = await friendModel.findOne({userId:new ObjectId(userId)},{friendId:new ObjectId(friendId)},{status:'Accept'})
            if(resultReject){
                await friendModel.updateOne({userId:new ObjectId(userId),friendId:new ObjectId(friendId)},{status:'Reject'})
                return 'FriendShip Reject'
            }
           
        }catch(err){
            console.log('requestApproval friendrepository err:',err)
        }
    }
    
}