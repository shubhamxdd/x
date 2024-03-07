"use client";

import useEditModal from "@/hooks/useEditModal";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

interface EditModalProps {
  user?: User;
}

const EditModal = ({ user }: EditModalProps) => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProfileImage(user?.profileImage || "");
    setCoverImage(user?.coverImage || "");
    setName(user?.name || "");
    setUsername(user?.username || "");
    setBio(user?.bio || "");
  }, [
    user?.bio,
    user?.coverImage,
    user?.name,
    user?.profileImage,
    user?.username,
  ]);

  const { close, open, isOpen } = useEditModal();

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const res = await fetch("/api/edit", {
        method: "PATCH",
        body: JSON.stringify({
          name,
          username,
          bio,
          profileImage,
          coverImage,
        }),
      });

      const data = await res.json();

      console.log(data);

      if (res.ok) {
        toast.success("Profile updated successfully");
        close();
        // router.refresh();
      } else {
        toast.error("Error updating profile", data.error);
      }
    } catch (error) {
      // TODO EDIT THIS TEXT
      toast.error("Error updating profile from catch block");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [bio, close, coverImage, name, profileImage, router, username]);

  //   console.log("EditModal", user);

  const body = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image"
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image"
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        type="text"
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        type="text"
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      onClose={close}
      disabled={isLoading}
      isOpen={isOpen}
      body={body}
      title="Edit Profile"
      onSubmit={onSubmit}
      actionLabel="Save"
    />
  );
};

export default EditModal;
