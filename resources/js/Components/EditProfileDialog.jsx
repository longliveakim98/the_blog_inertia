import { useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { useForm } from "@inertiajs/react";
import InputField from "./InputField";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

export default function EditProfileDialog({ profile }) {
    const [open, setOpen] = useState(false);
    const { data, setData, errors, post } = useForm({
        name: profile.name,
        email: profile.email,
        picture: profile.picture,
        bio: profile.bio,
    });

    const [editNameBtn, setEditNameBtn] = useState(false);
    const [editEmailBtn, setEditEmailBtn] = useState(false);
    const [editBioBtn, setEditBioBtn] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditNameBtn(false);
        setEditEmailBtn(false);
        setEditBioBtn(false);
    };

    const handleSubmitName = (e) => {
        e.preventDefault();
        post(route("profile.updateName"), {
            preserveScroll: true,
            onSuccess: () => setEditNameBtn(false),
        });
    };

    const handleSubmitEmail = (e) => {
        e.preventDefault();
        post(route("profile.updateEmail"), {
            preserveScroll: true,
            onSuccess: () => setEditEmailBtn(false),
        });
    };

    const handleSubmitBio = (e) => {
        e.preventDefault();
        post(route("profile.updateBio"), {
            preserveScroll: true,
            onSuccess: () => setEditBioBtn(false),
        });
    };

    const handleSubmitPicture = (e) => {
        e.preventDefault();
        post(route("profile.updatePicture"), {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
            >
                <p>
                    Edit Profile <EditTwoToneIcon />
                </p>
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Edit Profile</DialogTitle>
                <div className="px-6 pb-5 space-y-3">
                    <div className="flex flex-col items-center space-y-3">
                        <img
                            src={
                                data.picture instanceof File
                                    ? URL.createObjectURL(data.picture)
                                    : data.picture
                            }
                            alt=""
                            className="w-[50%]"
                        />
                        <form onSubmit={handleSubmitPicture}>
                            <div className="flex items-center gap-x-2">
                                <label className="text-lg">
                                    Profile Picture
                                </label>
                                <EditTwoToneIcon
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        document
                                            .getElementById("profile-pic-input")
                                            .click()
                                    }
                                />
                            </div>
                            {/* Hidden file input */}
                            <input
                                id="profile-pic-input"
                                type="file"
                                onChange={(e) =>
                                    setData("picture", e.target.files[0])
                                }
                                style={{ display: "none" }}
                            />
                            {data.picture instanceof File && (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className="mt-2"
                                >
                                    Change Picture
                                </Button>
                            )}
                        </form>
                    </div>

                    <div className="flex w-full gap-x-3">
                        <form className="w-full" onSubmit={handleSubmitName}>
                            <div className="space-y-2 ">
                                <div className="flex w-full gap-x-2">
                                    <label className="text-lg">Name</label>
                                    <EditTwoToneIcon
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                            setEditNameBtn(!editNameBtn)
                                        }
                                    />
                                </div>
                                <div className="flex gap-x-3">
                                    <input
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        disabled={!editNameBtn}
                                    />
                                    {editNameBtn && (
                                        <div className="flex gap-x-3">
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() =>
                                                    setEditNameBtn(false)
                                                }
                                            >
                                                <CloseIcon />
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                type="submit"
                                            >
                                                <DoneIcon />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                {errors.name && (
                                    <div className="text-sm italic text-red-600">
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                    <div className="flex w-full gap-x-3">
                        <form className="w-full" onSubmit={handleSubmitEmail}>
                            <div className="space-y-2 ">
                                <div className="flex w-full gap-x-2">
                                    <label className="text-lg">Email</label>
                                    <EditTwoToneIcon
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                            setEditEmailBtn(!editEmailBtn)
                                        }
                                    />
                                </div>
                                <div className="flex gap-x-3">
                                    <input
                                        name="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        disabled={!editEmailBtn}
                                    />
                                    {editEmailBtn && (
                                        <div className="flex gap-x-3">
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() =>
                                                    setEditEmailBtn(false)
                                                }
                                            >
                                                <CloseIcon />
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                type="submit"
                                            >
                                                <DoneIcon />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                {errors.email && (
                                    <div className="text-sm italic text-red-600">
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                    <div className="flex w-full gap-x-3">
                        <form className="w-full" onSubmit={handleSubmitBio}>
                            <div className="space-y-2 ">
                                <div className="flex w-full gap-x-2">
                                    <label className="text-lg">Biography</label>
                                    <EditTwoToneIcon
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                            setEditBioBtn(!editBioBtn)
                                        }
                                    />
                                </div>
                                <div className="flex gap-x-3">
                                    <textarea
                                        name="bio"
                                        value={data.bio}
                                        onChange={(e) =>
                                            setData("bio", e.target.value)
                                        }
                                        disabled={!editBioBtn}
                                        rows={4}
                                    />
                                    {editBioBtn && (
                                        <div className="flex gap-x-3">
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() =>
                                                    setEditBioBtn(false)
                                                }
                                            >
                                                <CloseIcon />
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                type="submit"
                                            >
                                                <DoneIcon />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                {errors.bio && (
                                    <div className="text-sm italic text-red-600">
                                        {errors.bio}
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
