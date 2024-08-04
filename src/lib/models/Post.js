import { Schema } from "mongoose";

const postSchema = new Schema({
    userId: String,
    postId: String,
    title: String,
    description: String,
    
})