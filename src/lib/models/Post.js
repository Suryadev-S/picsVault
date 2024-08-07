import { model, models, Schema } from "mongoose";

const postSchema = new Schema({
    userId: String,
    title: String,
    description: String,
    username: String,
    avatarUrl: String,
    assetUrl: String,
    assetPublicId: String,
}, {
    timestamps: true,
})

postSchema.virtual('likesCount', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'postId',
    count: true,
})

postSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',  
    foreignField: 'postId'
});

postSchema.virtual('commentsCount', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'postId',
    count: true
});

const Post = models.Post || model("Post", postSchema);

export default Post;