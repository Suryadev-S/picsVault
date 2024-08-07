"use client"

import { CldUploadWidget } from 'next-cloudinary';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form, FormControl, FormMessage, FormDescription, FormField, FormItem, FormLabel,
} from "@/components/ui/form"
import { useCreatePost } from '@/lib/customHooks/customHooks';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    description: z.string(),
})

const CreatePage = () => {
    const { toast } = useToast()
    const { isLoaded, user } = useUser();
    const handleCreate = useCreatePost();
    const [cloudinaryImageUrl, setCloudinaryImageUrl] = useState<string>("");
    const [cloudinaryPublicId, setCloudinaryPublicId] = useState<string>("");

    const handleUploadSuccess = (results: any) => {
        const { secure_url, public_id } = results.info;
        setCloudinaryImageUrl(secure_url);
        setCloudinaryPublicId(public_id);
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (isLoaded && !!cloudinaryImageUrl && !!cloudinaryPublicId) {
            const newPost = {
                userId: user?.id,
                ...values,
                username: user?.username,
                avatarUrl: user?.imageUrl,
                assetUrl: cloudinaryImageUrl,
                assetPublicId: cloudinaryPublicId
            }

            handleCreate.mutate(newPost);
        }
        console.log({ ...values, cloudinaryImageUrl, cloudinaryPublicId });
    }
    return (
        <>
            <div className="w-[300px] md:w-1/2 mx-auto">
                <CldUploadWidget uploadPreset="media_preset"
                    onSuccess={handleUploadSuccess}>
                    {({ open }) => {
                        return (
                            <Button onClick={() => open()}>
                                upload asset
                            </Button>
                        );
                    }}
                </CldUploadWidget>
                <br /><br />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="title of post" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Choose a catchy title for the post
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Desc" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Give additional info about the post
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default CreatePage;