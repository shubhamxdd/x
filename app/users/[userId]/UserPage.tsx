"use client";

import Header from "@/components/Header";
import UserHero from "@/components/Users/UserHero";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

interface UserComponentProps {
  userId: string;
}

const UserComponent = ({ userId }: UserComponentProps) => {
  const [user, setUser] = useState<User | null>();
  const fetchUser = async () => {
    const res = await fetch(`/api/users/${userId}`);
    const data = await res.json();
    setUser(data);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Header label={user?.name || "Go back"} showBackArrow />
      <UserHero userId={userId} />
    </>
  );
};

export default UserComponent;
