"use client";

import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { User } from "@prisma/client";
import Button from "@/components/Button";
import { RxCalendar } from "react-icons/rx";
import useEditModal from "@/hooks/useEditModal";

interface UserBioProps {
  userId: string;
  currentUser?: any;
}

const UserBio = ({ userId, currentUser }: UserBioProps) => {
  const [user, setUser] = useState<User | null>();

  const editModal = useEditModal();

  const fetchUser = async () => {
    const res = await fetch(`/api/users/${userId}`);
    const data = await res.json();
    // console.log(data);
    setUser(data);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const createdAt = useMemo(() => {
    if (!user?.creaatedAt) return null;
    return format(new Date(user.creaatedAt), "MMMM yyyy");
  }, [user?.creaatedAt]);

  //   console.log(currentUser?.id, " AND ", userId);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end mt-2">
        {currentUser?.id === userId ? (
          <>
            <Button label="Edit" onClick={editModal.open} secondary />
          </>
        ) : (
          <Button onClick={() => {}} label="Follow" secondary />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">{user?.name}</p>
          <p className="text-base text-neutral-500">@{user?.username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">{user?.bio}</p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
            <RxCalendar size={20} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{user?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            {/* TODO FIX THIS  */}
            {/* @ts-ignore */}
            <p className="text-white">{user?.followersCount || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
