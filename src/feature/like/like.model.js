

export default class LikeModel{
    constructor(userId,postId){
        this.userId=userId;
        this.postId=postId;
      
    }

    static getAll(postid){
        const like = likes.filter(value=>{
            return value.postId == postid;
        })

        if(like.length){
            return like;
        }else{
            return false;
        }
    }

    static toggle(userId,postId){

        const isLikedIndex = likes.findIndex(value=>{
            return value.userId == userId && value.postId == postId ;
        })

        if(isLikedIndex >= 0){
            likes.splice(isLikedIndex,1);

            return 'You dislike post '
        }
        else{
            const newLike = new LikeModel(userId,postId);

            newLike.id = likes.length +1;

            likes.push(newLike);

            return 'You liked the post'
        }


    }


}

var likes = [
    {
        userId : 1,
        postId:3,
        id:1
    }
]