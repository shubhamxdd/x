interface PostFeedProps {
  userId?: string;
}

const PostFeedServer = ({ userId }: PostFeedProps) => {
  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    console.log(data);
  };
  return <div>PostFeedServer</div>;
};

export default PostFeedServer;


// TODO REMOVE THIS OR FIX IT