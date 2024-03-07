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
import { User } from "@prisma/client";

interface SidebarItemsProps {
  session?: any;
  user?: User;
}

const SidebarItems = ({ session, user }: SidebarItemsProps) => {
  const { open } = useLoginModal();
  const links = [
    { label: "Home", href: "/home", icon: PiHouseFill },
    // { label: "Explore", href: "/explore", icon: FaMagnifyingGlass },
    {
      label: "Notifications",
      href: "/notifications",
      icon: FaRegBell,
      auth: true,
    },
    { label: "Messages", href: "/messages", icon: BiMessage, auth: true },
    { label: "Grok", href: "/grok", icon: RiChatForwardFill },
    // { label: "Lists", href: "/lists", icon: IoBookmarkOutline },
    {
      label: "Profile",
      href: `/users/${user?.id}`,
      icon: FaRegUser,
      auth: true,
    },
    { label: "Premium", href: "/premium", icon: FaXTwitter, auth: true },
    { label: "More", href: "#", icon: HiOutlineDotsCircleHorizontal },
  ];
  return (
    <>
      {links.map((item, index) => (
        <SidebarItem
          key={index}
          href={item.href}
          label={item.label}
          icon={item.icon}
          auth={item.auth}
          session={session || null}
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
