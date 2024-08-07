'use client'

import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


import { useUser } from "@clerk/nextjs";
import { useUserPost } from "@/lib/customHooks/customHooks";
import { CldImage } from "next-cloudinary";
import { Post } from "@/lib/types/types";

export default function Home() {
  const clerkUser = useUser();

  const userPost = useUserPost(clerkUser);

  return (
    <main className="w-4/5 mx-auto">
      {userPost.isLoading ?
        (<p>Loading</p>) :
        (
          <>
            <h1>All Your Posts</h1>
            <ul className="columns-1 md:columns-4">
              {userPost ?
                (
                  userPost.data?.map((userPost: Post, i: number) => {
                    return (
                      <li key={i}>
                        <Card className="inline-block overflow-hidden mx-auto">
                          <CldImage
                            src={userPost.assetPublicId}
                            width="300"
                            height="100"
                            alt="postimage" />
                          <CardHeader>
                            <CardTitle>{userPost.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={userPost.avatarUrl} />
                                <AvatarFallback>S</AvatarFallback>
                              </Avatar>
                              <CardDescription>{userPost.username}</CardDescription>
                            </div>
                          </CardContent>
                        </Card>

                      </li>
                    )
                  })
                )
                : (
                  <li>No post as of now</li>
                )}
            </ul>
          </>
        )}
    </main>
  );
}
