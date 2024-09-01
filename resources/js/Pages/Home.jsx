import React, { useState } from "react";
import Header from "../Components/Header";
import PostCardCol from "../Components/PostCardCol";
import PostCardRow from "../Components/PostCardRow";
import { Link, usePage, Head } from "@inertiajs/react";
import Flash from "../Components/Flash";

export default function Home({ posts, topPosts = [] }) {
    const { flash } = usePage().props;
    const [flashMSG, setFlashMSG] = useState(flash.message);
    const { component } = usePage();
    setTimeout(() => {
        setFlashMSG("");
    }, 2000);

    if (topPosts.length === 0) {
        return (
            <div className="mb-20 space-y-20">
                <Head title={component} />
                <section className="w-full">
                    <div className="xl:text-[15.238rem] lg:text-[10.05rem] text-[4.5rem] font-bold border-y-2 flex justify-center ">
                        <p className="text-center">THE BLOG</p>
                    </div>
                </section>

                <section className="space-y-10">
                    <Header>No Posts Available</Header>
                    <p className="text-lg text-center">
                        There are no blog posts available at the moment. Please
                        check back later.
                    </p>
                </section>
            </div>
        );
    }

    return (
        <div className="mb-20 space-y-20">
            <Head title={component} />
            {flashMSG && <Flash bgColor="bg-rose-500">{flashMSG}</Flash>}
            <section className="w-full">
                <div className="xl:text-[15.238rem] lg:text-[10.05rem] text-[4.5rem] font-bold border-y-2 flex justify-center ">
                    <p className="text-center">THE BLOG</p>
                </div>
            </section>

            <section className="space-y-10 ">
                <Header>Recent Post</Header>
                <div className="grid xl:grid-cols-2 gap-x-4 gap-y-4 ">
                    {topPosts[0] && (
                        <div className="h-full col-span-1">
                            <PostCardCol
                                post={topPosts[0]}
                                titleSize="1.5rem"
                                imgClass="w-full lg:max-h-[300px] max-h-[300px] "
                            />
                        </div>
                    )}
                    <div className="flex flex-col flex-1 gap-y-4">
                        {topPosts[1] && (
                            <div className="h-[50%]">
                                <PostCardRow
                                    containerClass="lg:w-[50%]"
                                    imgClass="max-h-[250px] w-full"
                                    post={topPosts[1]}
                                />
                            </div>
                        )}
                        {topPosts[2] && (
                            <div className="h-[50%]">
                                <PostCardRow
                                    containerClass="lg:w-[50%]"
                                    imgClass="max-h-[250px] w-full"
                                    post={topPosts[2]}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {topPosts[3] && (
                <section className="">
                    <PostCardRow
                        post={topPosts[3]}
                        titleSize="1.5rem"
                        containerClass="lg:w-[50%]"
                        imgClass="  w-full lg:h-[300px] lg:max-h-[350px] max-h-[250px]  "
                    />
                </section>
            )}

            {posts.data.length > 0 && (
                <section className="space-y-10">
                    <Header>All Blog Posts</Header>
                    <div className="grid gap-4 xl:grid-cols-3 lg:grid-cols-2">
                        {posts.data.map((post) => (
                            <PostCardCol
                                post={post}
                                imgClass="h-[300px] w-full"
                                key={post.id}
                                tagClass="text-sm"
                            />
                        ))}
                    </div>
                    <div className="flex flex-wrap justify-center mt-6">
                        {posts.links.map((link) =>
                            link.url ? (
                                <Link
                                    key={link.label}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className={`p-4  hover:bg-blue-600/10 text-center ${
                                        link.active
                                            ? "text-blue-500 font-bold bg-blue-600/10"
                                            : ""
                                    }`}
                                    preserveScroll
                                />
                            ) : (
                                <span
                                    key={link.label}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className={`p-4 w-[80%] text-center text-slate-400`}
                                ></span>
                            )
                        )}
                    </div>
                </section>
            )}
        </div>
    );
}
