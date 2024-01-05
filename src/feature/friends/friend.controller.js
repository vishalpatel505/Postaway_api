import FriendRepository from "./friend.repository.js";

const friendRepository = new FriendRepository()

export default class FriendController{
    async toggleFriendship(req,res){
        const userId = req._id;
        const friendId = req.params.friendId;

        const toggleFriend = await friendRepository.toggle(userId,friendId);
        
        res.status(200).send(toggleFriend)
    }

    async getAllFriends(req,res){
        const userId = req._id;

        const friends = await friendRepository.getAll(userId);

        if(friends.length>0){
            res.status(200).send(friends)
        }else{
            res.status(200).send('No friend found')
        }
    }

    async get_pending_request(req,res){
        const userId = req._id;
        const requests = await friendRepository.getPendingRequest(userId);
        if(requests.length>0){
            res.status(200).send(requests)
        }else{
            res.status(200).send('No pending request found')
        }
    }

    async requestResponse(req,res){
        const userId = req._id;
        const friendId = req.params.friendId;

        const requests = await friendRepository.requestApproval(userId,friendId);

        res.status(200).send(requests)
    }
}