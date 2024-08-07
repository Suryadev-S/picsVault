import Post from "@/lib/models/Post";
import { dbConnect } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        dbConnect();
        const fromReq = await req.json();
        const newPost = await new Post(fromReq);
        await newPost.save();

        return NextResponse.json("post created")
    } catch (error) {
        console.log(error);
        return NextResponse.json("error in creating")
    }
}