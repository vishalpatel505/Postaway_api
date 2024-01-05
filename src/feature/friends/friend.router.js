import express from 'express';
import FriendController from './friend.controller.js';

const friendRouter = express.Router();

const friendController = new FriendController() ;

friendRouter.get('/get-friends/:userId',friendController.getAllFriends)
friendRouter.get('/get-pending-requests',friendController.get_pending_request)
friendRouter.get('/toggle-friendship/:friendId',friendController.toggleFriendship)
friendRouter.get('/response-to-request/:friendId',friendController.requestResponse);


export default friendRouter;