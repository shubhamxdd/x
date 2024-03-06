"use client";

import { IconType } from "react-icons";

interface SignupButtonProps {
  onClick?: () => void;
  label: string;
  icon: IconType;
}

const SignupButton = ({ icon: Icon, label, onClick }: SignupButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white flex px-5 py-2 rounded-full items-center justify-center hover:bg-opacity-90 transition cursor-pointer"
    >
      <Icon size={24} className="mr-2" />
      <p>Sign up with {label}</p>
    </div>
  );
};

export default SignupButton;
