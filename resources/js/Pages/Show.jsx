import React from "react";
import PostCardCol from "../Components/PostCardCol";
import Header from "../Components/Header";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import AuthorDate from "../Components/authorDate";
import Flash from "../Components/Flash";
import { useState } from "react";
import Tag from "../Components/Tag";

export default function Show({ post, posts, user }) {
    const { flash } = usePage().props;
    const { delete: destroy } = useForm();

    const route = useRoute();
    const submit = (e) => {
        e.preventDefault();
        destroy(route("posts.destroy", post));
    };

    const [flashMSG, setFlashMSG] = useState(flash.message || flash.success);
    setTimeout(() => {
        setFlashMSG("");
    }, 5000);
    return (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
            <Head title={post.title} />
            <div className="space-y-10 lg:col-span-3">
                {user === post.user_id && (
                    <div className="flex justify-end gap-x-2">
                        {flashMSG && (
                            <Flash
                                bgColor={
                                    flash.message
                                        ? "bg-rose-500"
                                        : "bg-green-500"
                                }
                            >
                                {flashMSG}
                            </Flash>
                        )}
                        <Link
                            href={route("posts.edit", post)}
                            className="p-2 text-white bg-slate-600 rounded-xl hover:bg-slate-400"
                        >
                            Edit Post
                        </Link>
                        <form onSubmit={submit}>
                            <button className="p-2 text-white bg-red-600 rounded-xl hover:bg-red-400">
                                Delete
                            </button>
                        </form>
                    </div>
                )}
                <div className="flex flex-col lg:justify-between lg:flex-row gap-y-5">
                    <AuthorDate
                        author={post.user.name}
                        date={post.created_at}
                        userId={post.user_id}
                    ></AuthorDate>
                    <div className="flex gap-x-2">
                        {post.tags.map((tag) => (
                            <Tag tag={tag.name} key={tag.name} />
                        ))}
                    </div>
                </div>
                <h1 className="text-4xl font-bold text-center">{post.title}</h1>
                {post.content_blocks.map((block, index) => (
                    <div key={index}>
                        {block.type === "image" && (
                            <img
                                src={block.content}
                                className="mx-auto max-h-[426px]"
                                alt={`Image ${index + 1}`}
                            />
                        )}
                        {block.type === "paragraph" && <p>{block.content}</p>}
                        {block.type === "header" && (
                            <h2 className="text-xl font-bold">
                                {block.content}
                            </h2>
                        )}
                        {/* Add handling for other block types as needed */}
                    </div>
                ))}
            </div>
            <div className="col-span-1 ">
                <Header>Recent Posts</Header>
                <div className="space-y-10">
                    {posts.map((post) => (
                        <PostCardCol
                            post={post}
                            imgClass=" h-[200px] w-full"
                            containerClass=""
                            key={post.id}
                            tagClass="text-xs"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
