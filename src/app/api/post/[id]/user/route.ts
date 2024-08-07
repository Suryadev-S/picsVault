import { NextResponse } from "next/server";
import Post from "@/lib/models/Post";
import { dbConnect } from "@/lib/utils";

export async function GET(req: Request, { params }: { params: { id: String } }) {
    try {
        dbConnect();
        const allUserPosts = await Post.find({ userId: params.id });
        return NextResponse.json(allUserPosts);
    } catch (error) {
        console.log(error);
        return NextResponse.json("error in getting user posts")
    }
}