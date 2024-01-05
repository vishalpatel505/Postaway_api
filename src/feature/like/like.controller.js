import LikeModel from "./like.model.js";
import LikeRepository from "./like.repository.js";

const likeRepository = new LikeRepository()
export default class LikeController{
    async getAllLikeByPost(req,res){
        const postId = req.params.postId;

        const likes =await likeRepository.getLike(postId) 

        if(likes){
            res.status(200).send(likes)
        }
        else{
            res.status(200).send('No post Found for like')
        }
    }

    async toggleLikes(req,res){

        const postId = req.params.postId;
        const userId = req._id;

        const result = await likeRepository.toggle(userId,postId)

        res.status(200).send(result)
    }
}