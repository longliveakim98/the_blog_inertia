import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";

export default function Edit({ post, tags = [] }) {
    const { data, setData, errors } = useForm({
        title: post.title || "",
        description: post.description || "",
        tags: tags.map((tag) => tag.name).join(","),
        blocks: post.content_blocks || [], // Initial blocks
    });

    const [imagePreview, setImagePreview] = useState(
        post.content_blocks.map((block) =>
            block.type === "image" ? block.content : ""
        )
    );

    // Handle adding a new block
    const addBlock = () => {
        setData("blocks", [...data.blocks, { type: "paragraph", content: "" }]);
    };

    // Handle removing a block
    const removeBlock = (index) => {
        const newBlocks = [...data.blocks];
        newBlocks.splice(index, 1);
        setData("blocks", newBlocks);
    };

    // Handle file change for image blocks
    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        const newBlocks = [...data.blocks];
        newBlocks[index].file = file;
        setData("blocks", newBlocks);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        router.post(`/posts/${post.id}`, {
            _method: "put",
            data: data,
            forceFormData: true,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <Head title="Edit Post" />
            <div>
                <label>Title</label>
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    className="text-4xl font-bold"
                />
                {errors.title && <div>{errors.title}</div>}
            </div>

            <div>
                <label>Description</label>
                <textarea
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                />
                {errors.description && <div>{errors.description}</div>}
            </div>

            <div>
                <label>
                    Tags (put comma ',' to seperate multiple tags.
                    (frontend,backend, etc...))
                </label>
                <input
                    type="text"
                    value={data.tags}
                    onChange={(e) => setData("tags", e.target.value)}
                    className="text-4xl "
                />
                {errors.tags && <div>{errors.tags}</div>}
            </div>

            {data.blocks.map((block, index) => (
                <div key={index} className="flex flex-col mt-5">
                    <span>Block Type: </span>
                    <select
                        className="mb-3 py-1 border-2 w-[300px]"
                        value={block.type}
                        onChange={(e) => {
                            const newBlocks = [...data.blocks];
                            newBlocks[index].type = e.target.value;
                            setData("blocks", newBlocks);
                        }}
                    >
                        <option value="paragraph">Paragraph</option>
                        <option value="image">Image</option>
                        <option value="header">Header</option>
                    </select>

                    {block.type === "image" ? (
                        <>
                            {imagePreview[index] && (
                                <img
                                    src={
                                        `http://the_blog_inertia.test/storage/` +
                                        imagePreview[index]
                                    }
                                    alt="Preview"
                                    className="mt-3 max-h-[400px] w-1/2"
                                />
                            )}
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e, index)}
                            />
                        </>
                    ) : block.type === "header" ? (
                        <textarea
                            value={block.content}
                            rows={1}
                            onChange={(e) => {
                                const newBlocks = [...data.blocks];
                                newBlocks[index].content = e.target.value;
                                setData("blocks", newBlocks);
                            }}
                            className="text-xl font-bold"
                        />
                    ) : (
                        <textarea
                            value={block.content}
                            rows={5}
                            onChange={(e) => {
                                const newBlocks = [...data.blocks];
                                newBlocks[index].content = e.target.value;
                                setData("blocks", newBlocks);
                            }}
                        />
                    )}

                    {errors[`blocks.${index}.content`] && (
                        <div>{errors[`blocks.${index}.content`]}</div>
                    )}

                    <button
                        type="button"
                        className="font-semibold text-white py-1 px-3 mt-2 bg-red-500 rounded w-[300px]"
                        onClick={() => removeBlock(index)}
                    >
                        Remove Block
                    </button>
                </div>
            ))}

            <button
                type="button"
                className="px-3 py-1 my-3 font-semibold text-white bg-green-800 rounded"
                onClick={addBlock}
            >
                Add Block
            </button>
            <button
                type="submit"
                className="w-full p-1 font-semibold text-white bg-blue-500"
            >
                Update Post
            </button>
        </form>
    );
}
