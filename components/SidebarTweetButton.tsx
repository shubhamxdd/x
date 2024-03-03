import { BsFeather } from "react-icons/bs";

const SidebarTweetButton = () => {
  return (
    <div onClick={() => {}}>
      <div className="mt-6 lg:hidden rounded-full h-14 w-14  p-2 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <BsFeather color="white" size={24} />
      </div>
      <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-90 transition cursor-pointer">
        <p className="text-center font-semibold">Post</p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
