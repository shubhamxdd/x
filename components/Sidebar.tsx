import SidebarItems from "./SidebarItems";
import SidebarLogo from "./SidebarLogo";

const Sidebar = () => {
  return (
    <div className="text-white col-span-1 h-full pr-6 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          <SidebarItems />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
