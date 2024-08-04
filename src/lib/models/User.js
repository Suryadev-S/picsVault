import {model, models, Schema} from "mongoose"

const userSchema = new Schema({
    bio: String,
    clerk_profile_url: String,
    clerk_user_id: String,
    password: String,
    full_name: String,
    user_name: String,
},{
    timestamps: true,
});

const User = models.User || model("User",userSchema);

export default User;