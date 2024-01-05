import PostModel from "./post.model.js";
import ApplicationError from "../../error-handler/error.handler.js";
import PostRepository from "./post.repository.js";

const postRepository = new PostRepository()

export default class PostController{

    async addNewPost(req,res){
        const userId = req._id
        
        const caption = req.body.caption
        
        const imageUrl = "uploads/" +req.file.filename

        const newPost = await postRepository.add(userId,caption,imageUrl);

        res.status(201).send(newPost)
    }

    async deletePost(req,res){
        const id = req.params.postId;

        const posts = postRepository.delete(id);

        if(posts){
            res.status(201).send('Post deleted')
        }
        else{
            throw new ApplicationError('No Post Found to delete',404)
        }    
    }

    
    async updatePost(req,res){
        let postUpdates={}
        const id = req.params.postId;
        const caption = req.body.caption
        const imageUrl = req.file.filename;

         

        if(imageUrl){
            postUpdates.imageUrl = imageUrl
        }
        if(id){
            postUpdates.id = id;
        }
        if(caption){
            postUpdates.caption=caption
        }
        
        const post =await postRepository.update(postUpdates)

        if(post){
            res.status(201).send(post);
        }
        else{
            throw new ApplicationError('No Post Found to update',404)
        }

    }
    
    async getMyPost(req,res){
        const userId = req._id;

        const post = await postRepository.getMyPosts(userId);

        if(!post){
            throw new ApplicationError("No post found",404)
        }
        else{
            console.log(post)
            res.status(200).send(post);
        }
    }

    async getOnePost(req,res){
        const id = req.params.postId;

        console.log(id)
        const post = await postRepository.getPost(id);

        if(!post){
            throw new ApplicationError("No post found",404)
        }
        else{
            res.status(200).send(post);
        }
    }

    async getPosts(req,res){
        const posts =await postRepository.getAll();

        if(!posts){
            throw new ApplicationError("No post found",404)
        }
        else{
            res.status(200).send(posts);
        }
    
    }


}