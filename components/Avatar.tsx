"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar = ({ userId, hasBorder, isLarge }: AvatarProps) => {
  const [user, setUser] = useState<User | null>();
  const router = useRouter();
  const fetchUser = async () => {
    const res = await fetch(`/api/users/${userId}`);
    const data = await res.json();
    console.log(data);
    setUser(data);
  };
  const onClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      fetchUser();

      const url = `/users/${userId}`;
      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      className={`${hasBorder ? "border-4 border-black" : ""} 
      ${isLarge ? "h-32" : "h-12"}
      ${isLarge ? "w-32" : "w-12"}
      rounded-full hover:opacity-90 transition cursor-pointer relative
      `}
    >
      <Image
        src={user?.profileImage || "/images/placeholder.png"}
        alt="Avatar"
        onClick={onClick}
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
      />
    </div>
  );
};

export default Avatar;
