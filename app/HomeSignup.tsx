import SignupButton from "@/components/SignupButton";
import { FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const HomeSignup = () => {
  const signupButtons = [
    { label: "Google", icon: FcGoogle },
    { label: "Apple", icon: FaApple },
  ];
  return (
    <>
      <div className="flex flex-col gap-5 mt-5 w-[75%] md:w-[50%] lg:w-[50%] xl:w-[40%] 2xl:w-[20%] border-b-2 border-neutral-700 pb-4">
        {signupButtons.map((item) => (
          <SignupButton key={item.label} label={item.label} icon={item.icon} />
        ))}
      </div>
      <div className="bg-sky-500 text-white px-5 py-2 rounded-full mt-5 w-[75%] md:w-[50%] lg:w-[50%] xl:w-[40%] 2xl:w-[20%] text-center font-bold cursor-pointer">
        <p>Create Account</p>
      </div>
      <div className="w-[75%] md:w-[50%] lg:w-[50%] xl:w-[40%] 2xl:w-[20%]">
        <p className="text-zinc-500 text-xs mt-2">
          By signing up, you agree to the Terms of Service and Privacy Policy,
          including Cookie Use.
        </p>
      </div>
    </>
  );
};

export default HomeSignup;
