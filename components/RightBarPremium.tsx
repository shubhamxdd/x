const RightBarPremium = () => {
  return (
    <div className="mb-6 bg-neutral-800 rounded-2xl text-white py-2 px-4">
      <div className="pb-2">
        <h2 className="text-xl font-bold">Subscribe to Premium</h2>
        <p className="text-sm mt-2">
          Subscribe to unlock new features and if eligible, receive a share of
          ads revenue.
        </p>
        <button className="bg-sky-500 hover:bg-opacity-80 transition px-4 py-1 rounded-full mt-3">
          <p className="font-semibold">Subscribe</p>
        </button>
      </div>
    </div>
  );
};

export default RightBarPremium;
