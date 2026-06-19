import SidebarList from "./SidebarList";
import { IoHomeSharp } from "react-icons/io5";
import { IoIosTimer } from "react-icons/io";
import { CgPlayList } from "react-icons/cg";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineSubscriptions } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { VscFeedback } from "react-icons/vsc";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { MdOutlineLeaderboard } from "react-icons/md";

import { useTheme } from "../Context/ThemeContext.jsx";

function Sidebar() {
  const { isSidebarFolded } = useTheme();

  return (
    <div className={`fixed left-0 top-[72px] bottom-0 ${isSidebarFolded ? "w-[72px] px-2" : "w-60 px-4"
      } border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col space-y-0 z-40 transition-all duration-300 ease-in-out`}>
      {/* Top Items */}
      <div className="py-2 border-b border-slate-200 dark:border-slate-800">
        <SidebarList
          icon={<IoHomeSharp className="size-6" />}
          text="Home"
          isCollapsed={isSidebarFolded}
          to="/"
        />
        <SidebarList
          icon={<IoIosTimer className="size-6" />}
          text="Recently"
          isCollapsed={isSidebarFolded}
          to="/history"
        />
      </div>

      {/* Mid Items */}
      <div className="py-2 border-b border-slate-200 dark:border-slate-800">
        <SidebarList
          icon={<CgPlayList className="size-6" />}
          text="Playlists"
          isCollapsed={isSidebarFolded}
          to="/playlists"
        />
        <SidebarList
          icon={<HiOutlineVideoCamera className="size-6" />}
          text="Videos"
          isCollapsed={isSidebarFolded}
          to="/videos"
        />
        <SidebarList
          icon={<FaRegHeart className="size-5" />}
          text="Favorites"
          isCollapsed={isSidebarFolded}
          to="/favorites"
        />
        <SidebarList
          icon={<MdOutlineSubscriptions className="size-5" />}
          text="Subscriptions"
          isCollapsed={isSidebarFolded}
          to="/subscriptions"
        />
      </div>

      {/* Upcoming Features Items */}
      <div className="py-2 border-b border-slate-200 dark:border-slate-800">
        <SidebarList
          icon={<TbBrandGoogleAnalytics className="size-5" />}
          text="Analytics"
          isCollapsed={isSidebarFolded}
          to="/analytics"
        />
        <SidebarList
          icon={<MdOutlineLeaderboard className="size-5" />}
          text="Leaderboard"
          isCollapsed={isSidebarFolded}
          to="/leaderboard"
        />
      </div>

      {/* Bottom Items */}
      <div className="py-2">
        <SidebarList
          icon={<IoIosHelpCircleOutline className="size-5" />}
          text="Help Desk"
          isCollapsed={isSidebarFolded}
          to="/help"
        />
        <SidebarList
          icon={<VscFeedback className="size-5" />}
          text="Feedback"
          isCollapsed={isSidebarFolded}
          to="/feedback"
        />
      </div>

      <div className="py-2 border-t border-slate-200 dark:border-slate-800 mt-auto">
        <SidebarList
          icon={<IoSettingsOutline className="size-5" />}
          text="Settings"
          isCollapsed={isSidebarFolded}
          to="/settings"
        />
        <SidebarList
          icon={<IoIosLogOut className="size-5" />}
          text="Log-out"
          isCollapsed={isSidebarFolded}
          to="/logout"
        />
      </div>
    </div>
  );
}

export default Sidebar;
