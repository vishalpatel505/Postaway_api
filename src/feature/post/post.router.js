import express from 'express';
import PostController from './post.controller.js';

const postRouter = express.Router();

const postController = new PostController();

postRouter.put('/:postId',postController.updatePost)
postRouter.delete('/:postId',postController.deletePost)
postRouter.post('/',postController.addNewPost)

postRouter.get('/',postController.getMyPost)
postRouter.get('/all',postController.getPosts);
postRouter.get('/:postId',postController.getOnePost)


export default postRouter;
