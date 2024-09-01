import React from "react";
import AuthorDate from "./authorDate";
import { Link } from "@inertiajs/react";
import { formatDate } from "../Components/formatDate";
import Tag from "./Tag";

export default function PostCardRow({
    post,
    titleSize = "1.125rem",
    imgClass = "w-[50%]",
    containerClass = "h-full",
    tagClass = "",
}) {
    const imageUrl = post.content_blocks.filter(
        (block) => block.type === "image"
    );

    return (
        <div className="flex flex-col h-full lg:flex-row hover:bg-blue-300/10 gap-x-4 ">
            <Link href={route("posts.show", post)} className={containerClass}>
                <img
                    src={
                        imageUrl.length > 0
                            ? imageUrl[0].content
                            : "https://picsum.photos/200/300?random=1"
                    }
                    className={` ${imgClass}`}
                />
            </Link>

            <div className="flex flex-col flex-1 ">
                <AuthorDate
                    author={post.user.name}
                    date={post.created_at}
                    userId={post.user_id}
                />
                <Link href={route("posts.show", post)}>
                    <h3 className={`text-[${titleSize}] font-semibold mt-4  `}>
                        {post.title}
                    </h3>
                </Link>
                <p className="mt-4 text-sm text-slate-500">
                    {post.description}
                </p>
                <div className="flex flex-wrap justify-end mt-auto gap-x-1 ">
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
