"use client";

import { Post, User } from "@prisma/client";
import { useEffect, useState } from "react";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
  user?: User;
}

const PostFeed = ({ userId, user }: PostFeedProps) => {
  const [posts, setPosts] = useState<Post[] | []>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let url = userId ? `/api/posts/user/${userId}` : "/api/posts";
      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();
      // console.log(data);
      setPosts(data);
    };
    fetchPosts();
  }, [posts]);

  if (posts.length === 0) return <div>No posts found</div>;

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem key={post.id} userId={userId} data={post} />
      ))}
    </>
  );
};

export default PostFeed;
