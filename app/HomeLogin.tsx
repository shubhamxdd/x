"use client";

import useLoginModal from "@/hooks/useLoginModal";

const HomeLogin = () => {
  const { open } = useLoginModal();
  return (
    <div className="mt-20">
      <h2 className="text-white text-xl font-bold">Already have an account?</h2>
      <div
        onClick={open}
        className="mt-5 w-[75%] md:w-[50%] lg:w-[50%] xl:w-[40%] 2xl:w-[20%] bg-black text-white px-5 py-2 rounded-full text-center border-[0.5px] border-sky-700 hover:bg-sky-500 hover:bg-opacity-10 transition cursor-pointer"
      >
        <p>Sign in</p>
      </div>
    </div>
  );
};

export default HomeLogin;
