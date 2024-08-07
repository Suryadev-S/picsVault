import mongoose, { model, models, Schema } from "mongoose";

const commentSchema = new Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    userId: String,
    username: String,
    avatarUrl: String,
    content: String,
}, {
    timestamps: true,
})

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;