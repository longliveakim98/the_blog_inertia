import React from "react";
import AuthorDate from "./authorDate";
import Tag from "./Tag";
import { Link } from "@inertiajs/react";

export default function PostCardCol({
    post,
    titleSize = "1.125rem",
    imgClass = "max-h-[320px]",
    containerClass = "",
    tagClass = "",
}) {
    const imageUrl = post.content_blocks.filter(
        (block) => block.type === "image"
    );

    return (
        <div className="flex flex-col h-full hover:bg-blue-300/10">
            <Link href={route("posts.show", post)} className={containerClass}>
                <img
                    src={
                        imageUrl.length > 0
                            ? imageUrl[0].content
                            : "https://picsum.photos/200/300?random=1"
                    }
                    alt=""
                    className={` ${imgClass}  mb-3`}
                />
            </Link>
            <div className="flex flex-col flex-1 ">
                <AuthorDate
                    author={post.user.name}
                    date={post.created_at}
                    userId={post.user_id}
                />
                <h3 className={`text-[${titleSize}] font-bold mt-4 `}>
                    <Link href={route("posts.show", post)}>{post.title}</Link>
                </h3>
                <p className="mt-1 mb-3 text-sm font-medium text-slate-500">
                    {post.description}
                </p>

                <div className="flex flex-wrap justify-end mt-auto gap-x-1 gap-y-2 ">
                    {post.tags.map((tag) => (
                        <Tag
                            tag={tag.name}
                            key={tag.name}
                            otherClass={tagClass}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
