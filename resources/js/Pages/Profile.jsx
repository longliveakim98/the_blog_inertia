import Header from "../Components/Header";
import { Head, Link } from "@inertiajs/react";
import { formatDate } from "../Components/formatDate";
import PostCardRow from "../Components/PostCardRow";
import EditProfileDialog from "../Components/EditProfileDialog";
import EditPasswordDialog from "../Components/EditPasswordDialog";

export default function Profile({ profile, posts, userId }) {
    const { created_at, email, name, picture, id, bio } = profile;

    return (
        <div className="space-y-10">
            <Head title={name} />
            <div className="grid grid-cols-5 gap-y-10 lg:space-x-10 ">
                <div className="col-span-5 lg:col-span-1 ">
                    <div className="flex flex-col items-center px-4 py-10 space-y-10 border shadow-xl bg-white/40 rounded-3xl">
                        <div>
                            <img
                                src={picture}
                                alt={`${name} profile picture`}
                                className="border-2 shadow-lg rounded-xl"
                            />
                        </div>
                        <p className="text-xl lg:text-sm">
                            Joined {formatDate(created_at)}
                        </p>
                        {userId === id && (
                            <div className="flex flex-col gap-y-5">
                                <EditProfileDialog profile={profile} />
                                <EditPasswordDialog />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col col-span-5 px-10 py-10 mb-16 space-y-10 border shadow-xl lg:px-20 lg:col-span-4 bg-white/40 rounded-3xl">
                    <Header>Profile</Header>
                    <div className="flex flex-col flex-1">
                        <div className="flex flex-col flex-wrap">
                            <p className="text-4xl font-bold">{name}</p>
                            <p className="my-5 text-sm lg:text-xl">{email}</p>
                        </div>
                        {bio && (
                            <div className="mt-auto space-y-5">
                                <p className="text-xl">Bio</p>
                                <p>{bio}</p>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap space-y-10">
                        <Header>Posts</Header>
                        {posts > 0 ? (
                            <div className="w-full space-y-5">
                                {posts.length > 0 &&
                                    posts.map((post) => (
                                        <div key={post.id}>
                                            <PostCardRow
                                                containerClass="w-[50%]"
                                                imgClass="max-h-[250px] w-full"
                                                titleSize="1.5rem"
                                                post={post}
                                            />
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <div className="w-full space-y-5">
                                <p className="text-lg text-center">
                                    {name} have not create any post or none have
                                    been made available
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
