import { inngest } from "./client";
import { dbConnect } from "../lib/utils"
import User from "../lib/models/User";


export const syncUser = inngest.createFunction(
    { id: 'sync-user-from-clerk-for-picsvault' },  // ←The 'id' is an arbitrary string used to identify the function in the dashboard
    { event: 'clerk/user.created' }, // ← This is the function's triggering event
    async ({ event }) => {
        const user = event.data; // The event payload's data will be the Clerk User json object
        const { id, username, image_url } = user;
        // const email = user.email_addresses.find(e =>
        //     e.id === user.primary_email_address_id
        // ).email
        //   await database.users.insert({ id, email, first_name, last_name })
        try {
            dbConnect();
            const newUser = await new User({
                clerk_profile_url: image_url,
                clerk_user_id: id,
                password_enabled,
                username,
            });
            await newUser.save();
        } catch (error) {
            console.log(error);
        }
    }
)