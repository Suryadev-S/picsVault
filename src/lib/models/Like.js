import mongoose, { model, models, Schema } from "mongoose";

const likeSchema = new Schema({
    userId: String,
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
},{
    timestamps: true
});

const Like = models.Like || model("Like", likeSchema);

export default Like;