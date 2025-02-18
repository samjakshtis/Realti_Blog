"use client"

import MainLayout from "@/components/layout/MainLayout";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function Articles() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [link, setLink] = useState("");
    const [newsletter, setNewsletter] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!image) {
            console.error("No image selected.");
            return;
        }

        // Upload image to Supabase Storage
        const { data: imageData, error: imageError } = await supabase
            .storage
            .from('images') // Make sure you have an "images" bucket in Supabase
            .upload(`articles/${Date.now()}-${image.name}`, image);

        if (imageError) {
            console.error("Image Upload Error:", imageError);
            return;
        }

        // Get the public URL of the uploaded image
        const { data: imageUrlData } = supabase.storage.from('images').getPublicUrl(imageData.path);

        // Insert article data
        const { data: articleData, error: articleError } = await supabase
            .from('articles')
            .insert({
                title,
                description,
                image: imageUrlData.publicUrl, // Access the publicUrl correctly
                link
            });

        if (articleError) {
            console.error("Article Error:", articleError);
        } else {
            console.log("Article Data:", articleData);
        }

        setTitle("");
        setDescription("");
        setImage(null);
        setLink("");
        setNewsletter(null);

        // Insert newsletter data if a file is selected
        if (newsletter) {
            const { data: newsletterData, error: newsletterError } = await supabase.from('newsletters').insert({
                newsletter
            });

            if (newsletterError) {
                console.error("Newsletter Error:", newsletterError);
            } else {
                console.log("Newsletter Data:", newsletterData);
            }
        }
    };

    return <MainLayout>
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Upload Articles and Newsletters</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                        required
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Link</label>
                    <input
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Newsletter</label>
                    <input
                        type="file"
                        onChange={(e) => setNewsletter(e.target.files?.[0] ?? null)}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </form>
        </div>
    </MainLayout>;
}