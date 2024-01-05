import ApplicationError from "../../error-handler/error.handler.js";
import CommentRepository from "./comment.repository.js";
import CommentModel from "./çomment.model.js";

const commentRepository = new CommentRepository()

export default class CommentController{
    async addNewComment(req,res){
        const userId = req._id;
        const postId = req.params.postId;
        // console.log("req.body",req.body)
        const cont = req.body.content ;

        const newComment =await commentRepository.add(userId,postId,cont);

        if(newComment){
            res.status(201).send(newComment);
        }else{
            res.status(400).send('Something went wrong')
        }
    }

    async deleteComment(req,res){
        const id = req.params.commentId

        const comment =await commentRepository.delete(id);

        if(comment){
            res.status(201).send('comment deleted');
        }else{
            res.status(400).send('comment not found')
        }
    }

    async updateComment(req,res){

        const commentId = req.params.commentId;
        const newComment = req.body.content;

        const comment = await commentRepository.update(newComment,commentId);

        if(comment){
            res.status(201).send(comment);
        }else{
            res.status(400).send('No comment to update')
        }
        
    }   


    async getAllComment(req,res){

        const postId = req.params.postId

        const comments =await commentRepository.getAll(postId)

        if(comments){
            res.status(200).send(comments)
        }else{
            res.status(400).send('No comments found')
        }
    }

    

 



}