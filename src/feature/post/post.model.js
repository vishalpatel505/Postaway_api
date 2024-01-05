import ApplicationError from "../../error-handler/error.handler.js";


export default class PostModel{
    constructor(userId,caption,imageUrl){
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;
    }

    static getAll(){
        return posts;
    }

    static getPost(id){

        const post = posts.find(value=>{
            return value.id == id ;
        })

        return post;
    }

    static getMyPosts(userId){
        const post = posts.filter(value =>{
            return value.userId = userId;    
        })

        return post;
    }

    static add(userId,caption,imageUrl){

        const newPost = new PostModel(userId,caption,imageUrl)

        newPost.id = posts.length+1;

        posts.push(newPost);

        return newPost;
    }

    static delete(id){
        const index = posts.findIndex(value=>{
            return value.id == id;
        })

        if(index >= 0){
            posts.splice(index,1);
            return posts;
        }else{
            return false;
        }
    }

    static update(postUpdates){

        const index = posts.findIndex(value=>{
            return value.id == postUpdates.id;
        })

        if(index >= 0){

            if(postUpdates.caption){
                posts[index].caption = postUpdates.caption;
            }

            if(postUpdates.imageUrl){
                posts[index].imageUrl = postUpdates.imageUrl
            }

            return posts[index];
        }
        else{
            return false;
        }
    }

}

var posts = [{
    userId : "1",
    caption: "This is best product, I had ever seen",
    imageUrl: "uploads/2023-11-16T07_01_18.855Z[BHTT - XK] [EDIT - HOÀN] Công Chúa Tha Mạng - Phượng Khi Vũ _.jpeg" ,
    id:1
}];