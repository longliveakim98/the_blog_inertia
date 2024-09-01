import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { useForm } from "@inertiajs/react";
import InputField from "./InputField";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function EditPasswordDialog() {
    const [open, setOpen] = useState(false);
    const [editPassBtn, setEditPassBtn] = useState(false);
    const { data, setData, errors, post } = useForm({
        oldPassword: "",
        newPassword: "",
        newPassword_confirmation: "",
    });
    const [oldEye, setOldEye] = useState(false);
    const [newEye, setNewEye] = useState(false);
    const [newEyeCF, setNewEyeCF] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditPassBtn(false);
        setData("oldPassword", "");
        setData("newPassword", "");
        setData("newPassword_confirmation", "");
        setOldEye(false);
        setNewEye(false);
        setNewEyeCF(false);
    };

    const handleSubmitPassword = (e) => {
        e.preventDefault();
        post(route("profile.updatePassword"), {
            preserveScroll: true,
            onSuccess: () => {
                handleClose();
            },
        });
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                <p>
                    Advance Setting <EditTwoToneIcon />
                </p>
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Advance Setting</DialogTitle>
                <div className="items-center px-6 py-5 space-y-3 ">
                    <div className="flex gap-x-3">
                        <label className="text-lg">Change Password</label>
                        <EditTwoToneIcon
                            variant="contained"
                            color="info"
                            onClick={() => setEditPassBtn(!editPassBtn)}
                        />
                    </div>
                    {editPassBtn && (
                        <div>
                            <form
                                className="flex flex-col space-y-3"
                                onSubmit={handleSubmitPassword}
                            >
                                <div className="flex ">
                                    <InputField
                                        label="Old Password"
                                        name="oldPassword"
                                        value={data.oldPassword}
                                        type={oldEye ? "text" : "password"}
                                        onChange={(e) =>
                                            setData(
                                                "oldPassword",
                                                e.target.value
                                            )
                                        }
                                        error={errors.oldPassword}
                                    />
                                    <Button
                                        className="justify-end "
                                        onClick={() => setOldEye(!oldEye)}
                                    >
                                        {oldEye ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </Button>
                                </div>
                                <div className="flex">
                                    <InputField
                                        label="New Password"
                                        name="newPassword"
                                        value={data.newPassword}
                                        type={newEye ? "text" : "password"}
                                        onChange={(e) =>
                                            setData(
                                                "newPassword",
                                                e.target.value
                                            )
                                        }
                                        error={errors.newPassword}
                                    />
                                    <Button
                                        className="justify-end "
                                        onClick={() => setNewEye(!newEye)}
                                    >
                                        {newEye ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </Button>
                                </div>
                                <div className="flex">
                                    <InputField
                                        label="Confirmed New Password"
                                        name="newPassword_confirmation" // Update this field name
                                        value={data.newPassword_confirmation}
                                        type={newEyeCF ? "text" : "password"}
                                        onChange={(e) =>
                                            setData(
                                                "newPassword_confirmation", // Update this field name
                                                e.target.value
                                            )
                                        }
                                        error={errors.newPassword_confirmation}
                                    />
                                    <Button
                                        className="justify-end "
                                        onClick={() => setNewEyeCF(!newEyeCF)}
                                    >
                                        {newEyeCF ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </Button>
                                </div>
                                <div className="flex gap-x-3">
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => setEditPassBtn(false)}
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
                            </form>
                        </div>
                    )}
                </div>
            </Dialog>
        </>
    );
}
