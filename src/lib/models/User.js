import {model, models, Schema} from "mongoose"

const userSchema = new Schema({
    bio: {
        type: String,
        default: '',
    },
    clerk_profile_url: String,
    clerk_user_id: String,
    password_enabled: Boolean,
    fullname: {
        type: String,
        default: '',
    },
    username: String,
},{
    timestamps: true,
});

const User = models.User || model("User",userSchema);

export default User;