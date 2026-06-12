import React from "react";
import SidebarList from "./SidebarList";
import { IoHomeSharp } from "react-icons/io5";
import { MdAccessTimeFilled } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { CgPlayList } from "react-icons/cg";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineSubscriptions } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

import { useApp } from "../Context/AppContext.jsx";

function Sidebar() {
  const { isSidebarFolded } = useApp();

  return (
    <div className={`fixed left-0 top-[72px] bottom-0 ${isSidebarFolded ? "w-[72px] px-2" : "w-60 px-4"
      } border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col space-y-0 z-40 transition-all duration-300 ease-in-out`}>
      {/* Top Items */}
      <div className="py-2 border-b border-slate-200 dark:border-slate-800">
        <SidebarList
          icon={<IoHomeSharp className="size-6" />}
          text="Home"
          isCollapsed={isSidebarFolded}
        />
        <SidebarList
          icon={<IoIosTimer className="size-6" />}
          text="Recently"
          isCollapsed={isSidebarFolded}
        />
      </div>

      {/* Mid Items */}
      <div className="py-2 border-b border-slate-200 dark:border-slate-800">
        <SidebarList
          icon={<CgPlayList className="size-6" />}
          text="Playlists"
          isCollapsed={isSidebarFolded}
        />
        <SidebarList
          icon={<HiOutlineVideoCamera className="size-6" />}
          text="Videos"
          isCollapsed={isSidebarFolded}
        />
        <SidebarList
          icon={<FaRegHeart className="size-5" />}
          text="Favorites"
          isCollapsed={isSidebarFolded}
        />
      </div>

      {/* Subscription Items */}
      <div className="py-2 border-b border-slate-200 dark:border-slate-800">
        <SidebarList
          icon={<MdOutlineSubscriptions className="size-6" />}
          text="Subscriptions"
          isCollapsed={isSidebarFolded}
        />
      </div>

      {/* Bottom Items */}
      <div className="py-2">
        <SidebarList
          icon={<IoSettingsOutline className="size-5" />}
          text="Settings"
          isCollapsed={isSidebarFolded}
        />
      </div>
    </div>
  );
}

export default Sidebar;
