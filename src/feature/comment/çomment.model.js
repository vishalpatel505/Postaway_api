

export default class CommentModel{
    constructor(userId,postId,content){
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }

    static getAll(postId){

        const comment = comments.filter(value=>{
            return value.postId == postId;
        })

        return comment;
    }

    static add(userId,postId,content){

        const newComment = new CommentModel(userId,postId,content)

        newComment.id = comments.length + 1;

        return newComment;

    }

    static delete(id){
        const index = comments.findIndex(value=>{
            return value.id == id
        })

        comments.splice(index,1);

        return comments
    }

    static update(updateComment){

        const index = comments.findIndex(value=>{
            return value.id == updateComment.id
        })

        comments[index].content = updateComment.comment 

        return comments[index];
    }
}

var comments = [
    {
    userId: 2,
    postId:1,
    content:"This is fantatstic",
    id:1
    }
]