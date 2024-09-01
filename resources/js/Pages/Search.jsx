import React, { useState } from "react";
import PostCardRow from "../Components/PostCardRow";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import { Head, Link } from "@inertiajs/react";
import Header from "../Components/Header";
import Tag from "../Components/Tag";

export default function Search({ posts = [], search: q = "", tag = "" }) {
    return (
        <div>
            <Head title={q ? q : tag} />
            {tag ? (
                <div className="flex text-xl font-bold gap-x-1">
                    Query for <Tag tag={tag} />
                </div>
            ) : (
                <div className="text-xl font-bold">Searching for "{q}"</div>
            )}

            <div className="mt-10 space-y-8">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id}>
                            <PostCardRow
                                post={post}
                                containerClass="lg:w-[50%]"
                                imgClass="w-full max-h-[250px]"
                            />
                        </div>
                    ))
                ) : (
                    <section className="space-y-10">
                        <Header>No Posts Available</Header>
                        <p className="text-lg text-center">No posts found</p>
                    </section>
                )}
            </div>
        </div>
    );
}
