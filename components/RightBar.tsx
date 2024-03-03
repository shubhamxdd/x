const RightBar = () => {
  return (
    <div className="pl-6 py-4 hidden lg:flex lg:flex-col">
      <div className="mb-6">
        <input
          placeholder="Search"
          type="text"
          className="w-full px-4 py-2 rounded-full  text-white bg-neutral-800 active:bg-black focus:bg-black placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div className="mb-6 bg-neutral-800 rounded-2xl text-white py-2 px-4">
        <div className="pb-2">
          <h2 className="text-xl font-bold">Subscribe to Premium</h2>
          <p className="text-sm mt-2">
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </p>
          <button className="bg-sky-500 hover:bg-sky-700 transition px-4 py-1 rounded-full mt-3">
            <p className="font-semibold">Subscribe</p>
          </button>
        </div>
      </div>
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">{/*TODO show users */}</div>
      </div>
    </div>
  );
};

export default RightBar;
