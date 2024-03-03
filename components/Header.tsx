"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IoArrowBack } from "react-icons/io5";

interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
}
const Header = ({ label, showBackArrow }: HeaderProps) => {
  const router = useRouter();

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] border-neutral-800 p-5  ">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <IoArrowBack
            size={20}
            color="white"
            onClick={goBack}
            className=" hover:opacity-70  transition cursor-pointer"
          />
        )}
        <h1 className="text-white text-xl font-semibold">{label}</h1>
      </div>
    </div>
  );
};

export default Header;
