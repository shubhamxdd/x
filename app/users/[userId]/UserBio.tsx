"use client";

import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { User } from "@prisma/client";
import Button from "@/components/Button";

interface UserBioProps {
  userId: string;
  currentUser?: any;
}

const UserBio = ({ userId, currentUser }: UserBioProps) => {
  const [user, setUser] = useState<User | null>();
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
            <Button label="Edit" onClick={() => {}} secondary />
          </>
        ) : (
          <Button onClick={() => {}} label="Follow" secondary />
        )}
      </div>
    </div>
  );
};

export default UserBio;
