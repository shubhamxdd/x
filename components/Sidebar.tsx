import { getServerSession } from "next-auth";
import SidebarItems from "./SidebarItems";
import SidebarLogo from "./SidebarLogo";
import prismaClient from "@/libs/prisma";

const Sidebar = async () => {
  const session = await getServerSession();
  const user = await prismaClient.user.findUnique({
    where: {
      email: session?.user?.email || "",
    },
  });
  console.log(session);
  return (
    <div className="text-white col-span-1 h-full pr-6 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {/* TODO */}
          {/* @ts-ignore */}
          <SidebarItems session={session} user={user} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
