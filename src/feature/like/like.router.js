import express from 'express'

import LikeController from './like.controller.js'

const likeRouter = express.Router();

const likeController = new LikeController();

likeRouter.get('/toggle/:postId',likeController.toggleLikes)
likeRouter.get('/:postId',likeController.getAllLikeByPost)


export default likeRouter