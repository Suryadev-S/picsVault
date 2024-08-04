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

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    description: z.string(),
})

const CreatePage = () => {
    const { toast } = useToast()
    let uploaded = false;
    let cloudinary_image_url: string = "";
    let cloudinary_public_id: string = "";

    const handleUploadSuccess = (result: any) => {
        const { secure_url, public_id } = result.info;
        cloudinary_image_url = secure_url;
        cloudinary_public_id = public_id;
    }

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log({ ...values, cloudinary_image_url, cloudinary_public_id });
    }
    return (
        <>
            <div className="w-[300px] md:w-1/2 mx-auto">
                <CldUploadWidget uploadPreset="media_preset"
                    onSuccess={handleUploadSuccess}>
                    {({ open }) => {
                        return (
                            <Button onClick={() => open()}>
                                {uploaded ? "Asset uploaded" : "Upload asset"}
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