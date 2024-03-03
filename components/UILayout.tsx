import React from "react";
import Sidebar from "./Sidebar";
import RightBar from "./RightBar";
interface Props {
  children: React.ReactNode;
}

const UILayout = ({ children }: Props) => {
  return (
    <div className="h-screen bg-black">
      <div className="container h-full mx-auto  max-w-7xl">
        <div className="grid grid-cols-4 h-full">
          <Sidebar />
          <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
            {children}
          </div>
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default UILayout;
