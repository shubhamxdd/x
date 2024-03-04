"use client"

import { IconType } from "react-icons";

interface Props {
  href?: string;
  label: string;
  icon: IconType;
  onClick?: () => void;
}

const SidebarItem = ({ href, icon: Icon, label, onClick }: Props) => {
  return (
    <div className="flex flex-row items-center" onClick={onClick}>
      <div className="relative rounded-full h-11 w-14 flex items-center justify-center p-2 hover:bg-neutral-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={24} color="white" />
      </div>
      <div className="relative hidden lg:flex items-center gap-4 p-2 rounded-full hover:bg-neutral-300 hover:bg-opacity-10 cursor-pointer">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
