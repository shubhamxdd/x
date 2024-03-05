"use client";

import { BiLogOut, BiMessage } from "react-icons/bi";
import {
  FaMagnifyingGlass,
  FaRegBell,
  FaRegUser,
  FaXTwitter,
} from "react-icons/fa6";
import { IoBookmarkOutline } from "react-icons/io5";
import { PiHouseFill } from "react-icons/pi";
import { RiChatForwardFill, RiLogoutBoxLine } from "react-icons/ri";
import SidebarItem from "./SidebarItem";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import SidebarTweetButton from "./SidebarTweetButton";
import { signOut } from "next-auth/react";
import { BiLogIn } from "react-icons/bi";
import useLoginModal from "@/hooks/useLoginModal";

interface SidebarItemsProps {
  // TODO: define session type
  session?: any;
}

const SidebarItems = ({ session }: SidebarItemsProps) => {
  const { open } = useLoginModal();
  const links = [
    { label: "Home", href: "/", icon: PiHouseFill },
    // { label: "Explore", href: "/explore", icon: FaMagnifyingGlass },
    { label: "Notifications", href: "/notifications", icon: FaRegBell },
    { label: "Messages", href: "/messages", icon: BiMessage },
    { label: "Grok", href: "/grok", icon: RiChatForwardFill },
    // { label: "Lists", href: "/lists", icon: IoBookmarkOutline },
    // profile will be dynamic route TODO
    { label: "Profile", href: "/profile", icon: FaRegUser },
    { label: "Premium", href: "/premium", icon: FaXTwitter },
    { label: "More", href: "/more", icon: HiOutlineDotsCircleHorizontal },
  ];
  return (
    <>
      {links.map((item, index) => (
        <SidebarItem
          key={index}
          href={item.href}
          label={item.label}
          icon={item.icon}
        />
      ))}
      {session?.user?.email ? (
        <SidebarItem onClick={() => signOut()} label="Logout" icon={BiLogOut} />
      ) : (
        <SidebarItem onClick={() => open()} label="Login" icon={BiLogIn} />
      )}
      <SidebarTweetButton />
    </>
  );
};

export default SidebarItems;
