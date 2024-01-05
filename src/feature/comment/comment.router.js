import express from 'express';
import CommentController from './comment.controller.js';


const commentRouter = express.Router()

const commentController = new CommentController()

commentRouter.put('/:commentId',commentController.updateComment);
commentRouter.delete('/:commentId',commentController.deleteComment)
commentRouter.post('/:postId',commentController.addNewComment)
commentRouter.get('/:postId',commentController.getAllComment)


export default commentRouter;