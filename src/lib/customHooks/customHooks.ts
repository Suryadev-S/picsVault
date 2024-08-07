import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from 'axios'
import { Post } from "../types/types";

export function useUserPost(clerkUser: any) {
    const query = useQuery({
        queryKey: ["userPosts"],
        queryFn: async () => {
            return (clerkUser.isLoaded && axios.get(`/api/post/${clerkUser.user.id}/user`));
        }
    });

    return { data: query.data?.data, isLoading: query.isLoading, error: query.isError }
}

export function useCreatePost() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (post: Post) => {
            return await axios.post("/api/post", post)
        },
        onError: (error, variable, context) => {
            console.log(error);
            alert("error in creating");
        },
        onSuccess: () => {
            alert("post created")
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["userPosts"] });
        }
    });

    return mutation
}