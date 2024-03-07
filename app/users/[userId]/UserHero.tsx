"use client";

import Avatar from "@/components/Avatar";
import { User } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface UserHeroProps {
  userId: string;
}

const UserHero = ({ userId }: UserHeroProps) => {
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
  return (
    <div className="">
      <div className="bg-neutral-700 h-44 relative">
        {user?.coverImage && (
          <Image
            src={user.coverImage}
            alt="Coevr image"
            fill
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
