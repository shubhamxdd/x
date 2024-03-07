"use client";

import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { User } from "@prisma/client";

const RightBarFollow = () => {
  const [users, setUsers] = useState<User[] | []>([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();

      // todo show ranadom 3 users
      const three = data.splice(0, 3);
      console.log(three);

      setUsers(three);
    } catch (error) {
      console.log("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (users.length === 0) return null;

  return (
    <div className="bg-neutral-800 rounded-xl p-4">
      <h2 className="text-white text-xl font-semibold">Who to follow</h2>
      <div className="flex flex-col gap-6 mt-4">
        {users.length !== 0 &&
          users.map((user) => (
            <div className="flex flex-row gap-4" key={user.id}>
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RightBarFollow;
