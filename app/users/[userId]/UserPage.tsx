"use client";

import Header from "@/components/Header";
import UserHero from "@/app/users/[userId]/UserHero";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import UserBio from "./UserBio";
import PostFeed from "@/app/home/PostFeed";

interface UserComponentProps {
  userId: string;
  currentUser?: any;
}

const UserComponent = ({ userId, currentUser }: UserComponentProps) => {
  const [user, setUser] = useState<User | null>();
  const fetchUser = async () => {
    const res = await fetch(`/api/users/${userId}`);
    const data = await res.json();
    setUser(data);
  };
  useEffect(() => {
    fetchUser();
  }, []);
//   console.log(currentUser);

  return (
    <>
      <Header label={user?.name || "Go back"} showBackArrow />
      <UserHero userId={userId} />
      <UserBio userId={userId} currentUser={currentUser} />
      <PostFeed userId={userId} />
    </>
  );
};

export default UserComponent;
